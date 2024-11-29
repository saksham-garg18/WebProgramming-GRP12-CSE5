gsap.registerPlugin(ScrollTrigger);

const horizonElement = document.querySelector('.home-horizon-con');
const horizonRef = horizonElement;

const horizonAnimation = gsap.to(horizonRef, {
    transform: "translateX(-170%)",
    scrollTrigger: {
        trigger: horizonElement,
        scroller: "body",
        start: "top 0%",
        end: "top -100%",
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true
    }
});

const cleanupScrollTrigger = () => {
    horizonAnimation.scrollTrigger.kill();
};

window.addEventListener('resize', cleanupScrollTrigger);
window.addEventListener('unload', cleanupScrollTrigger);

window.addEventListener('beforeunload', cleanupScrollTrigger);
