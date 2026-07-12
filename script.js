document.addEventListener("DOMContentLoaded", () => {
    const setButtonContent = (button, text, iconClass) => {
        button.textContent = text;
        const icon = document.createElement('i');
        icon.className = iconClass;
        button.appendChild(document.createTextNode(' '));
        button.appendChild(icon);
    };

    const removeClassFromAll = (elements, className) => {
        elements.forEach(element => element.classList.remove(className));
    };

    const activateTab = (btn, targetId) => {
        btn.classList.add('active');

        if (!targetId || /\s/.test(targetId)) {
            return;
        }

        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    };

    const readMoreBtn = document.querySelector('.read-more-btn');
    const aboutContent = document.querySelector('.about-content');

    if (readMoreBtn && aboutContent) {
        readMoreBtn.addEventListener('click', () => {
            const isExpanded = aboutContent.classList.toggle('expanded');
            const label = isExpanded ? 'Read Less' : 'Read More';
            const iconClass = isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
            setButtonContent(readMoreBtn, label, iconClass);
        });
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            removeClassFromAll(tabBtns, 'active');
            removeClassFromAll(tabContents, 'active');

            const targetId = String(btn.getAttribute('data-target') || '').trim();
            activateTab(btn, targetId);
        });
    });
});