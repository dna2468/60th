document.addEventListener('DOMContentLoaded', () => {
    
    // Lenis Init (個別)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Init
    if (typeof gsap !== 'undefined') {
        // Page Header Anim
        const tl = gsap.timeline();
        tl.to(".page-subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
          .to(".page-title", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
          .to(".page-description", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");
    } else {
        document.querySelectorAll('.page-header *').forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'none';
        });
    }

    // GSAP Plugin Registration
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Generate Sponsor Lists
    if (typeof SITE_CONFIG !== 'undefined') {
        const goldList = document.getElementById('gold-sponsor-list');
        const silverList = document.getElementById('silver-sponsor-list');

        // Gold Sponsors
        if (goldList && SITE_CONFIG.goldSponsors) {
            SITE_CONFIG.goldSponsors.forEach(name => {
                const li = document.createElement('li');
                li.textContent = name;
                goldList.appendChild(li);
            });
        }

        // Silver Sponsors
        if (silverList && SITE_CONFIG.silverSponsors) {
            SITE_CONFIG.silverSponsors.forEach(name => {
                const li = document.createElement('li');
                li.textContent = name;
                silverList.appendChild(li);
            });
        }

        // List Animation
        if (typeof gsap !== 'undefined') {
            gsap.to(".gold-sponsors li", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".gold-sponsors",
                    start: "top 80%"
                }
            });

            gsap.to(".silver-sponsors li", {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.05, // 少し早めに
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".silver-sponsors",
                    start: "top 80%"
                }
            });
        } else {
            // No GSAP fallback
            document.querySelectorAll('.sponsor-list li').forEach(li => {
                li.style.opacity = 1;
                li.style.transform = 'none';
            });
        }
    }
});