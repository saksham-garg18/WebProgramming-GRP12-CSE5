// Ensure GSAP and ScrollTrigger are included in your project
gsap.registerPlugin(ScrollTrigger);

const horizonElement = document.querySelector('.home-horizon-con');
const horizonRef = horizonElement; // Assuming this is the same as your horizonRef

const horizonAnimation = gsap.to(horizonRef, {
    transform: "translateX(-170%)",
    scrollTrigger: {
        trigger: horizonElement,
        scroller: "body",
        start: "top 0%",
        end: "top -100%",
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true // to ensure it works on window resize
    }
});

// Cleanup function to kill the ScrollTrigger when necessary
const cleanupScrollTrigger = () => {
    horizonAnimation.scrollTrigger.kill();
};

// Optional: Add an event listener to clean up on window resize or unload
window.addEventListener('resize', cleanupScrollTrigger);
window.addEventListener('unload', cleanupScrollTrigger);

// Call cleanup when needed, e.g., on page unload
window.addEventListener('beforeunload', cleanupScrollTrigger);