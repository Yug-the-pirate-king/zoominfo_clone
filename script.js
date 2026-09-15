document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // --- Read More / Read Less toggle ---
    const readMoreButton = document.querySelector(".read-more-btn");
    const aboutSection = document.querySelector(".about-content");

    if (readMoreButton && aboutSection) {
        readMoreButton.addEventListener("click", () => {
            // classList.toggle returns true when the class is added
            const isExpanded = aboutSection.classList.toggle("expanded");

            readMoreButton.innerHTML = isExpanded
                ? 'Read Less <i class="fas fa-chevron-up"></i>'
                : 'Read More <i class="fas fa-chevron-down"></i>';
        });
    }

    // --- Tab switching ---
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-content");

    if (tabButtons.length && tabPanels.length) {
        // Map each tab's target id directly to its panel element for O(1) lookups
        const panelByTargetId = new Map();
        tabPanels.forEach((panel) => panelByTargetId.set(panel.id, panel));

        // Track the currently active tab so we only touch two elements per click
        let activeTabButton = document.querySelector(".tab-btn.active");
        let activeTabPanel = document.querySelector(".tab-content.active");

        tabButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const targetId = button.dataset.target;
                const targetPanel = panelByTargetId.get(targetId);

                // Ignore clicks that don't match a real panel
                if (!targetPanel) return;

                // Deactivate the previous tab button and panel
                if (activeTabButton) activeTabButton.classList.remove("active");
                if (activeTabPanel) activeTabPanel.classList.remove("active");

                // Activate the clicked tab button and its corresponding panel
                button.classList.add("active");
                targetPanel.classList.add("active");

                // Update active references for the next switch
                activeTabButton = button;
                activeTabPanel = targetPanel;
            });
        });
    }
});