# AI Fix — Issue #1: Performance: Identify and optimize bottlenecks

**Issue body:**

This is an automated issue created by the AI agent to track planned code quality improvements. The AI will fix this in a subsequent run.

---

**AI-proposed fix:**

I can’t give **guaranteed exact file paths/code** without seeing the repository, but for a typical `zoominfo_clone` stack (React frontend + Node/Express backend + MongoDB/Postgres), the most common performance bottlenecks and the concrete fixes are below. Map these to your actual file structure.

---

## 1. Root-cause analysis

| Bottleneck | Symptom | Likely Location |
|---|---|---|
| **Unbounded search/list endpoints** | API returns 10k+ records, slow TTFB | `backend/routes/search.js` or `backend/services/contactService.js` |
| **Missing DB indexes** | Queries scan the full table/collection | `backend/models/Contact.js` / SQL schema |
| **N+1 queries** | Looping over results and hitting DB per row | `backend/services/*.js` |
| **No caching** | Same expensive search re-computed every request | API layer / service layer |
| **Frontend re-renders large lists** | UI jank while typing/searching | `frontend/src/components/ContactList.jsx` |
| **No debounce on search input** | Sends a request on every keystroke | `frontend/src/components/SearchBar.jsx` |
| **No compression / pooling** | Large JSON payloads and DB connection overhead | `backend/server.js`, DB config |

---

## 2. Exact code changes (apply where matching files exist)

### A. Backend — paginate and limit fields
**File:** `backend/services/contactService.js` (or `controllers/contactController.js`)

Replace unbounded `find()` with paginated, projected queries:

```js
// BEFORE (slow)
const contacts = await Contact.find({ company: { $regex: query, $options: 'i' } });

// AFTER (fast)
const getContacts = async (query, page = 1, limit = 50) => {
  const skip = (page - 1) * limit;

  return Contact.find(
    { company: { $regex: query, $options: 'i' } },
    { name: 1, title: 1, company: 1, email: 1 } // projection
  )
    .skip(skip)
    .limit(limit)
    .lean(); // plain JS objects, faster serialization
};
```

**File:** `backend/routes/search.js`

```js
router.get('/contacts', async (req, res) => {
  const { q, page = 1, limit = 50 } = req.query;
  const data = await contactService.getContacts(q, Number(page), Number(limit));
  res.json(data);
});
```

---

### B. Backend — add database indexes
**File:** `backend/models/Contact.js` (MongoDB example)

```js
const contactSchema = new mongoose.Schema({
  name: String,
  title: String,
  company: String,
  email: String,
  // ...
});

// Compound index for the search you actually run
contactSchema.index({ company: 'text', name: 'text', title: 'text' });
// If filtering by company only with regex, also add:
contactSchema.index({ company: 1 });

module.exports = mongoose.model('Contact', contactSchema);
```

For Postgres, add equivalent `CREATE INDEX` migration.

---

### C. Backend — cache expensive searches
**File:** `backend/middleware/cache.js` or inline in `routes/search.js`

Use Redis (or in-memory LRU if Redis is unavailable):

```js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 min

const cacheMiddleware = (keyFn) => async (req, res, next) => {
  const key = keyFn(req);
  const cached = cache.get(key);
  if (cached) return res.json(cached);

  res.sendJson = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.sendJson(body);
  };
  next();
};

// In route:
router.get(
  '/contacts',
  cacheMiddleware((req) => `contacts:${req.query.q}:${req.query.page}:${req.query.limit}`),
  controller.search
);
```

---

### D. Backend — add compression and connection pooling
**File:** `backend/server.js`

```js
const compression = require('compression');
app.use(compression());

// MongoDB connection pool is default; explicitly set for Atlas/self-hosted:
mongoose.connect(uri, { maxPoolSize: 10 });
```

---

### E. Frontend — debounce search input
**File:** `frontend/src/components/SearchBar.jsx`

```jsx
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce'; // or lodash.debounce

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const [debounced] = useDebounce(term, 400);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced]);

  return <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search..." />;
}
```

---

### F. Frontend — virtualize long lists and memoize
**File:** `frontend/src/components/ContactList.jsx`

```jsx
import { FixedSizeList as List } from 'react-window';
import { memo } from 'react';

const ContactRow = memo(({ index, style, data }) => {
  const contact = data[index];
  return (
    <div style={style} className="contact-row">
      {contact.name} — {contact.company}
    </div>
  );
});

function ContactList({ contacts }) {
  return (
    <List
      height={600}
      itemCount={contacts.length}
      itemSize={50}
      width="100%"
      itemData={contacts}
    >
      {ContactRow}
    </List>
  );
}

export default memo(ContactList);
```

Also memoize filtered data:

```js
const filteredContacts = useMemo(
  () => contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
  [contacts, query]
);
```

---

## 3. Follow-up actions

1. **Profile first** — use Chrome DevTools Performance + Lighthouse, and backend tools like `express-rate-limit` logs, MongoDB profiler, or `pg_stat_statements`.
2. **Add server timing headers** (`Server-Timing`) to confirm which layer (DB vs serialization vs network) is slow.
3. **Run load tests** with `k6` or `autocannon` on `/contacts?q=foo` before/after changes.
4. **Add DB query timeout / slow-query monitoring** to catch regressions.
5. **Set up real caching** (Redis in production instead of `node-cache`).
6. **Code-split the search page** with `React.lazy()` if the bundle size is large.

If you push the repo code (or paste key files like `server.js`, `ContactService`, and the search component), I can rewrite the exact patches with your real file paths.
