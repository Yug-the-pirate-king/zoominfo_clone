document.addEventListener("DOMContentLoaded", () => {
    // Read More functionality
    const readMoreBtn = document.querySelector('.read-more-btn');
    const aboutContent = document.querySelector('.about-content');

    if (readMoreBtn && aboutContent) {
        readMoreBtn.addEventListener('click', () => {
            aboutContent.classList.toggle('expanded');
            if (aboutContent.classList.contains('expanded')) {
                readMoreBtn.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
            } else {
                readMoreBtn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            }
        });
    }

    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});
