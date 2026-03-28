document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lenis (スムーススクロール) の初期化
    // ページごとの設定が必要な場合も多いので、共通化せず個別に初期化
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

    // 2. GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // ヘッダータイトルのアニメーション（ページ読み込み時）
        const headerTl = gsap.timeline();
        headerTl.to(".page-subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
                .to(".page-title", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
                .to(".page-description", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

        // 会長カードのアニメーション（スクロール連動）
        const cards = document.querySelectorAll('.president-card');

        cards.forEach((card, index) => {
            const imgReveal = card.querySelector('.img-reveal img');
            const content = card.querySelector('.president-content');
            const frame = card.querySelector('.deco-frame');

            // 1. 画像の出現（マスクのような効果でズームアウト）
            gsap.to(imgReveal, {
                scale: 1.0, // 拡大状態から通常サイズへ
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%", // 画面の80%に来たら開始
                }
            });

            // 2. パララックス効果（スクロールに合わせて枠と画像をずらす）
            // スマホ以外でのみ適用する簡単な判定
            if (window.innerWidth > 768) {
                gsap.to(frame, {
                    y: -30, // 枠を少し上に移動
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true // スクロール量に同期
                    }
                });
            }

            // 3. テキストの出現
            gsap.to(content, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.2, // 画像より少し遅らせる
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 75%",
                }
            });
        });
    } else {
        console.warn('GSAP is not loaded.');
        // フォールバック: 即座に表示
        document.querySelectorAll('.page-title, .page-subtitle, .page-description, .president-content').forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'none';
        });
    }
});