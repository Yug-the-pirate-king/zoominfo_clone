'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const readMoreBtn = document.querySelector('.read-more-btn');
  const aboutContent = document.querySelector('.about-content');

  if (readMoreBtn && aboutContent) {
    const label = document.createTextNode('Read More ');
    const icon = document.createElement('i');
    icon.className = 'fas fa-chevron-down';
    readMoreBtn.replaceChildren(label, icon);
    readMoreBtn.setAttribute('aria-expanded', 'false');

    readMoreBtn.addEventListener('click', () => {
      aboutContent.classList.toggle('expanded');
      const expanded = aboutContent.classList.contains('expanded');
      label.textContent = expanded ? 'Read Less ' : 'Read More ';
      icon.className = expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
      readMoreBtn.setAttribute('aria-expanded', String(expanded));
    });
  }

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabBtns.length && tabContents.length) {
    const contentMap = new Map();
    tabContents.forEach(content => contentMap.set(content.id, content));

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const target = targetId ? contentMap.get(targetId) : null;
        if (!target) return;

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        target.classList.add('active');
      });
    });
  }
});