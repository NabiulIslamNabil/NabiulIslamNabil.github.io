// JavaScript code starts here
document.addEventListener("DOMContentLoaded", () => {
    // Code for scroll animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    };

    const options = { threshold: 0.1 };
    const observer = new IntersectionObserver(animateOnScroll, options);

    document.querySelectorAll("section, .project-card").forEach(el => {
        el.classList.add("aos-init");
        observer.observe(el);
    });
});
