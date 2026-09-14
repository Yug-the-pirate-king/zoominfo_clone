'use strict';

/**
 * Initializes interactive components once the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeReadMore();
    initializeTabs();
});

/**
 * Initializes the Read More / Read Less toggle for the about section.
 */
function initializeReadMore() {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const aboutContent = document.querySelector('.about-content');

    if (!readMoreBtn || !aboutContent) {
        return;
    }

    readMoreBtn.addEventListener('click', () => {
        const isExpanded = aboutContent.classList.toggle('expanded');
        updateReadMoreButton(readMoreBtn, isExpanded);
    });
}

/**
 * Updates the label and icon of the read more button.
 *
 * @param {HTMLElement} button - The Read More button element.
 * @param {boolean} isExpanded - Whether the about content is expanded.
 */
function updateReadMoreButton(button, isExpanded) {
    button.textContent = isExpanded ? 'Read Less ' : 'Read More ';

    const icon = document.createElement('i');
    icon.classList.add('fas', isExpanded ? 'fa-chevron-up' : 'fa-chevron-down');
    button.appendChild(icon);
}

/**
 * Initializes tabbed interface switching.
 */
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length === 0 || tabContents.length === 0) {
        return;
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            deactivateAllTabs(tabBtns, tabContents);
            activateTab(btn);
        });
    });
}

/**
 * Removes the active state from all tab buttons and content panels.
 *
 * @param {NodeListOf<HTMLElement>} buttons - All tab button elements.
 * @param {NodeListOf<HTMLElement>} contents - All tab content elements.
 */
function deactivateAllTabs(buttons, contents) {
    buttons.forEach(button => button.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
}

/**
 * Activates a tab button and its corresponding content panel.
 *
 * @param {HTMLElement} button - The clicked tab button.
 */
function activateTab(button) {
    button.classList.add('active');

    const targetId = button.getAttribute('data-target');
    if (!targetId || typeof targetId !== 'string') {
        return;
    }

    const targetContent = document.getElementById(targetId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}