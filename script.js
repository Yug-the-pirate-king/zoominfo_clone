document.addEventListener("DOMContentLoaded", () => {
    const readMoreButton = document.querySelector('.read-more-btn');
    const aboutContent = document.querySelector('.about-content');

    function updateReadMoreButton(button, isExpanded) {
        const label = isExpanded ? 'Read Less' : 'Read More';
        const iconClass = isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down';

        button.textContent = label + ' ';

        const icon = document.createElement('i');
        icon.className = iconClass;
        button.appendChild(icon);
    }

    if (readMoreButton && aboutContent) {
        readMoreButton.addEventListener('click', () => {
            aboutContent.classList.toggle('expanded');
            const isExpanded = aboutContent.classList.contains('expanded');
            updateReadMoreButton(readMoreButton, isExpanded);
        });
    }

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function deactivateAllTabs() {
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
    }

    function activateTab(button) {
        deactivateAllTabs();
        button.classList.add('active');

        const targetId = button.dataset.target || '';
        if (!/^[\w-]+$/.test(targetId)) {
            return;
        }

        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => activateTab(button));
    });
});