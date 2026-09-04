document.addEventListener("DOMContentLoaded", () => {
    const readMoreButton = document.querySelector('.read-more-btn');
    const aboutContent = document.querySelector('.about-content');

    if (readMoreButton && aboutContent) {
        readMoreButton.addEventListener('click', () => {
            const isExpanded = aboutContent.classList.toggle('expanded');
            const buttonText = isExpanded ? 'Read Less' : 'Read More';
            const chevronIcon = isExpanded ? 'chevron-up' : 'chevron-down';
            readMoreButton.innerHTML = `${buttonText} <i class="fas fa-${chevronIcon}"></i>`;
        });
    }

    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length === 0) return;

    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeButton = document.querySelector('.tab-btn.active');
            const activeContent = document.querySelector('.tab-content.active');

            if (activeButton) activeButton.classList.remove('active');
            if (activeContent) activeContent.classList.remove('active');

            button.classList.add('active');

            const targetContent = document.getElementById(button.dataset.target);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});