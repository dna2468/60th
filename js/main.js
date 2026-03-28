/*
 * メインプログラム (main.js)
 * - ローディング制御
 * - スムーススクロール (Lenis)
 * - アニメーション (GSAP)
 * - 3Dカルーセル
 * - その他UI動作
 */

// 即時実行関数で安全装置をセット（DOM読み込み前でも待機）
(function() {
    // 5秒経ってもローディングが消えていなければ強制的に消すタイマー
    const safetyTimer = setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader && !loader.classList.contains('loaded') && !loader.classList.contains('hidden-immediately')) {
            console.warn('Safety Trigger: ローディングを強制解除しました');
            loader.classList.add('loaded');
        }
    }, 5000); // 5000ms = 5秒

    // 正常に処理が進んだらタイマーを解除するための関数をwindowに紐付け
    window.clearSafetyTimer = () => clearTimeout(safetyTimer);
})();

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');

    // セッションストレージの安全な取得
    let hasVisited = false;
    try {
        hasVisited = sessionStorage.getItem('visited');
    } catch (e) {
        console.warn('sessionStorage is not available:', e);
    }

    /* --- 1. メイン処理開始 --- */
    try {
        // ライブラリの読み込み状況チェック
        const isLenisLoaded = typeof Lenis !== 'undefined';
        const isGsapLoaded = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

        // --- GSAP Plugin Registration (スクロールアニメーションより前に実行) ---
        if (isGsapLoaded) {
            gsap.registerPlugin(ScrollTrigger);
        }

        // --- Lenis (スムーススクロール) 初期化 ---
        if (isLenisLoaded) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
            
            // "トップへ戻る"ボタンの動作をLenis連携させる
            const backToTopBtn = document.querySelector('.back-to-top');
            if (backToTopBtn) {
                backToTopBtn.addEventListener('click', () => {
                    lenis.scrollTo(0);
                });
            }
        } else {
            console.warn('Lenis not loaded. Fallback to native scroll.');
            const backToTopBtn = document.querySelector('.back-to-top');
            if (backToTopBtn) {
                backToTopBtn.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        }

        // --- アニメーション関数定義 ---
        function startHeroAnimations() {
            // 安全装置タイマーを解除（正常に開始できたため）
            if (window.clearSafetyTimer) window.clearSafetyTimer();

            // GSAPがなければCSSで単純表示
            if (!isGsapLoaded) {
                document.querySelectorAll('.hero-subtitle, .hero-description').forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
                return;
            }

            const tl = gsap.timeline();

            // ヒーローセクションの文字アニメーション
            tl.to('.hero-text-anim', {
                y: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.1
            })
            .to('.hero-subtitle', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.5")
            .to('.hero-description', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");
        }

        // --- ローディング制御の実装 ---
        // ページのリソース(画像等)が全て読み込まれたら実行
        const onPageLoad = () => {
            setTimeout(() => {
                if (loader) loader.classList.add('loaded');
                startHeroAnimations();
                try {
                    sessionStorage.setItem('visited', 'true');
                } catch (e) {}
            }, 1200); // 1.2秒待ってから幕を上げる（ロゴアニメーションを見せるため）
        };

        if (hasVisited) {
            // 2回目以降の訪問なら即表示
            if (loader) loader.classList.add('hidden-immediately');
            startHeroAnimations();
        } else {
            // 初回訪問
            if (document.readyState === 'complete') {
                // 既に読み込み終わっている場合
                onPageLoad();
            } else {
                // 読み込み待ち
                window.addEventListener('load', onPageLoad);
            }
        }

        // --- スクロールアニメーション (GSAP ScrollTrigger) ---
        if (isGsapLoaded) {
            // 1. 汎用フェードイン (.fade-in-up)
            const fadeElements = document.querySelectorAll('.fade-in-up');
            fadeElements.forEach(el => {
                gsap.fromTo(el, 
                    { opacity: 0, y: 30, filter: 'blur(5px)' },
                    {
                        opacity: 1, y: 0, filter: 'blur(0px)',
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // 2. ミッションカード (.gsap-mission-card)
            gsap.from('.gsap-mission-card', {
                opacity: 0, y: 40, duration: 0.8, stagger: 0.2, ease: "power2.out",
                scrollTrigger: { trigger: '.mission-grid', start: "top 80%" }
            });

            // 3. 年表の線 (.timeline-line)
            gsap.to('.timeline-line', {
                height: '100%', ease: 'none',
                scrollTrigger: { trigger: '.timeline', start: 'top center', end: 'bottom center', scrub: 1 }
            });

            // 4. 年表のアイテム (.gsap-timeline-item)
            const timelineItems = document.querySelectorAll('.gsap-timeline-item');
            timelineItems.forEach((item, index) => {
                const xOffset = index % 2 === 0 ? -50 : 50;
                gsap.fromTo(item,
                    { opacity: 0, x: window.innerWidth < 768 ? 20 : xOffset },
                    {
                        opacity: 1, x: 0, duration: 1, ease: "power3.out",
                        scrollTrigger: { trigger: item, start: "top 80%" }
                    }
                );
            });

            // 5. 合計金額カウンター (#total-amount)
            const totalAmountEl = document.getElementById('total-amount');
            if (totalAmountEl && typeof SITE_CONFIG !== 'undefined') {
                const targetAmount = SITE_CONFIG.totalAmount || 0;
                const formatCurrency = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                gsap.fromTo(totalAmountEl, 
                    { innerText: 0 },
                    {
                        innerText: targetAmount,
                        duration: 2.5,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: totalAmountEl,
                            start: "top 85%",
                            once: true
                        },
                        onUpdate: function() {
                            totalAmountEl.innerText = formatCurrency(Math.ceil(this.targets()[0].innerText));
                        }
                    }
                );
            }
        } else {
            // GSAPがない場合のフォールバック（透明のままにならないように）
            const hiddenElements = document.querySelectorAll('.fade-in-up, .gsap-mission-card, .gsap-timeline-item');
            hiddenElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
                el.style.filter = 'none';
            });
        }

        // --- 3Dカルーセル ---
        const carousel = document.getElementById('carousel');
        
        // config.js がない場合の安全策
        const safeConfig = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : {
            autoSpeed: { pc: 0.1, sp: 0.08 },
            radius: { pc: 1150, sp: 500 },
            carouselImages: []
        };

        const cardCount = 10;
        const isMobile = window.innerWidth < 768;
        const autoSpeed = isMobile ? safeConfig.autoSpeed.sp : safeConfig.autoSpeed.pc;
        const radius = isMobile ? safeConfig.radius.sp : safeConfig.radius.pc;
        // 画像がない場合はダミー画像を表示
        const images = safeConfig.carouselImages.length > 0 ? safeConfig.carouselImages : ["https://via.placeholder.com/600x400?text=No+Image"];

        const cards = [];
        let baseRotation = 0; 
        let rotationOffset = 0; 
        let isDragging = false;
        let startX = 0;
        let currentX = 0;

        if (carousel) {
            const angleStep = 360 / cardCount;

            for (let i = 0; i < cardCount; i++) {
                const card = document.createElement('div');
                card.className = 'card';
                
                const imgUrl = images[i % images.length];
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = `Gallery ${i + 1}`;
                
                img.onerror = function() {
                    this.style.display = 'none';
                    card.style.background = '#eee';
                    card.innerHTML = '<span style="color:#999;font-size:0.8rem;">Image<br>Not Found</span>';
                    card.style.display = 'flex';
                    card.style.flexDirection = 'column';
                    card.style.justifyContent = 'center';
                    card.style.alignItems = 'center';
                };

                card.appendChild(img);

                const theta = angleStep * i;
                card.dataset.theta = theta; 
                card.style.transform = `rotateY(${theta}deg) translateZ(${radius}px)`;

                card.addEventListener('click', (e) => {
                    if(Math.abs(startX - currentX) > 5 && isDragging) return;
                    openLightbox(imgUrl);
                });

                carousel.appendChild(card);
                cards.push({ element: card, baseAngle: theta });
            }

            const container = document.querySelector('.scene-container');
            if (container) {
                // Touch events
                container.addEventListener('touchstart', (e) => { isDragging = true; startX = e.touches[0].clientX; currentX = startX; });
                container.addEventListener('touchmove', (e) => { if (!isDragging) return; currentX = e.touches[0].clientX; const deltaX = currentX - startX; rotationOffset += deltaX * 0.1; startX = currentX; });
                container.addEventListener('touchend', () => { isDragging = false; });
                // Mouse events
                container.addEventListener('mousedown', (e) => { isDragging = true; startX = e.clientX; currentX = startX; carousel.style.cursor = 'grabbing'; });
                window.addEventListener('mousemove', (e) => { if (!isDragging) return; currentX = e.clientX; const deltaX = currentX - startX; rotationOffset += deltaX * 0.1; startX = currentX; });
                window.addEventListener('mouseup', () => { isDragging = false; carousel.style.cursor = 'grab'; });
            }

            function animateCarousel() {
                if (!isDragging) {
                    baseRotation += autoSpeed;
                }
                
                const totalRotation = baseRotation + rotationOffset;
                const translateZ = isMobile ? -500 : -900;
                const translateY = isMobile ? 50 : 200;
                
                carousel.style.transform = `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(-10deg) rotateZ(-5deg) rotateY(${totalRotation}deg)`;

                cards.forEach(card => {
                    const currentAngleDeg = (totalRotation + card.baseAngle) % 360;
                    const currentAngleRad = currentAngleDeg * (Math.PI / 180);
                    const zIndex = Math.cos(currentAngleRad); 
                    const normalizedZ = (zIndex + 1) / 2; 
                    const opacityAmount = 0.15 + (0.85 * normalizedZ);

                    if (isMobile) {
                        card.element.style.filter = 'none';
                    } else {
                        const depthFactor = (1 - zIndex) / 2; 
                        const blurAmount = depthFactor * 8;
                        card.element.style.filter = `blur(${blurAmount}px)`;
                    }
                    card.element.style.opacity = opacityAmount; 
                });

                requestAnimationFrame(animateCarousel);
            }
            animateCarousel();
        }

        // --- Lightbox ---
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');

        function openLightbox(src) {
            if(lightbox && lightboxImg) {
                lightboxImg.src = src;
                lightbox.classList.add('active');
            }
        }
        function closeLightbox() {
            if(lightbox) {
                lightbox.classList.remove('active');
                setTimeout(() => { if(lightboxImg) lightboxImg.src = ''; }, 300);
            }
        }
        if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if(lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

        // --- Back to Top Button ---
        const backToTopBtn = document.querySelector('.back-to-top');
        window.addEventListener('scroll', () => {
            if (backToTopBtn) {
                if (window.scrollY > 300) backToTopBtn.classList.add('visible');
                else backToTopBtn.classList.remove('visible');
            }
        });

        // --- Header Scroll Effect ---
        const header = document.querySelector('.site-header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (!header) return;
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            if (currentScrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.9)';
                header.style.boxShadow = 'none';
            }
            lastScrollY = currentScrollY;
        });

        // --- Mobile Nav Toggle ---
        const navToggle = document.querySelector('.nav-toggle');
        const mainNav = document.querySelector('.main-nav');
        const navLinks = document.querySelectorAll('.nav-link');

        if(navToggle && mainNav) {
            navToggle.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mainNav.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }

    } catch (error) {
        console.error('重大なエラーが発生しました:', error);
        // エラー発生時もローディングを解除して画面を見せる
        if(loader) loader.classList.add('loaded');
    }
});