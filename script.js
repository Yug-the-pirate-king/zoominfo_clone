/**
 * Initializes all interactive components after the DOM has finished loading.
 */
document.addEventListener("DOMContentLoaded", () => {
    initializeReadMore();
    initializeTabs();
});

/**
 * Toggles the expanded state of the about section and updates the button label.
 */
function initializeReadMore() {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const aboutContent = document.querySelector('.about-content');

    if (!readMoreBtn || !aboutContent) return;

    readMoreBtn.addEventListener('click', () => {
        const isExpanded = aboutContent.classList.toggle('expanded');
        readMoreBtn.innerHTML = isExpanded
            ? 'Read Less <i class="fas fa-chevron-up"></i>'
            : 'Read More <i class="fas fa-chevron-down"></i>';
    });
}

/**
 * Activates the corresponding tab content panel when a tab button is clicked.
 */
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');

            const targetContent = document.getElementById(btn.dataset.target);
            targetContent?.classList.add('active');
        });
    });
}