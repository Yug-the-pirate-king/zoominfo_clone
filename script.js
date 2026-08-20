/**
 * Initializes interactive components once the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
    initializeReadMoreToggle();
    initializeTabNavigation();
});

/**
 * Sets up the "Read More / Read Less" toggle for the about section.
 */
function initializeReadMoreToggle() {
    const readMoreButton = document.querySelector(".read-more-btn");
    const aboutContent = document.querySelector(".about-content");

    if (!readMoreButton || !aboutContent) {
        return;
    }

    readMoreButton.addEventListener("click", () => {
        const isExpanded = aboutContent.classList.toggle("expanded");
        updateReadMoreButton(readMoreButton, isExpanded);
    });
}

/**
 * Updates the read-more button label and chevron icon.
 *
 * @param {HTMLElement} button - The read-more button element.
 * @param {boolean} isExpanded - Whether the about content is expanded.
 */
function updateReadMoreButton(button, isExpanded) {
    const label = isExpanded ? "Read Less" : "Read More";
    const iconClass = isExpanded ? "fa-chevron-up" : "fa-chevron-down";
    button.innerHTML = `${label} <i class="fas ${iconClass}"></i>`;
}

/**
 * Sets up tab navigation using a precomputed content map and active-state tracking.
 */
function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll(".tab-btn");

    if (tabButtons.length === 0) {
        return;
    }

    const tabContentByTarget = new Map();
    tabButtons.forEach((button) => {
        const targetId = button.dataset.target;
        if (targetId) {
            tabContentByTarget.set(targetId, document.getElementById(targetId));
        }
    });

    let activeTabButton = document.querySelector(".tab-btn.active");
    let activeTabContent = document.querySelector(".tab-content.active");

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            const targetContent = targetId ? tabContentByTarget.get(targetId) : null;

            if (activeTabButton) {
                activeTabButton.classList.remove("active");
            }
            if (activeTabContent) {
                activeTabContent.classList.remove("active");
            }

            button.classList.add("active");
            if (targetContent) {
                targetContent.classList.add("active");
            }

            activeTabButton = button;
            activeTabContent = targetContent;
        });
    });
}