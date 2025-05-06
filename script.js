// Toggle nav menu
document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.getElementById("nav-links");

    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = menuIcon.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
    });

    // Scroll animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, { threshold: 0.1 });

    document.querySelectorAll("section, .project-card").forEach(el => {
        el.classList.add("aos-init");
        observer.observe(el);
    });
});
