/* Main JavaScript - Modern Light Theme */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio Filtering - Removed as we now have distinct sections
    // const filterBtns = document.querySelectorAll('.filter-btn'); ...


    // Header Scroll Effect - Subtle shadow on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.padding = '1rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.padding = '1.2rem 0';
        }
    });

    // Optional: Animate Progress Bars on Scroll
    const skillSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    let animated = false;

    if (skillSection) {
        window.addEventListener('scroll', () => {
            const sectionPos = skillSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;

            if (sectionPos < screenPos && !animated) {
                progressBars.forEach(bar => {
                    // Start animation (width is already set in inline style, we just trigger transition)
                    // Actually, to animate from 0, we can reset them first or just let them load.
                    // For simplicity in this static version, they are pre-filled. 
                    // To make them grow, we would set width to 0 in CSS and then set it here.
                    // Let's leave them static for now to ensure they are visible.
                });
                animated = true;
            }
        });
    }

    // Experience Carousel Auto-Scroll
    const carousel = document.querySelector('.experience-carousel');
    if (carousel) {
        // Clone items for seamless scrolling
        const items = Array.from(carousel.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            carousel.appendChild(clone);
        });

        let scrollAmount = 0;
        const scrollSpeed = 1; // Adjust speed here
        let isHovered = false;
        let animationId;

        // Pause on hover
        carousel.addEventListener('mouseenter', () => isHovered = true);
        carousel.addEventListener('mouseleave', () => isHovered = false);

        function autoScroll() {
            if (!isHovered) {
                scrollAmount += scrollSpeed;
                // If we've scrolled past the original width (half the total scrollWidth)
                if (scrollAmount >= carousel.scrollWidth / 2) {
                    scrollAmount = 0;
                }
                carousel.scrollLeft = scrollAmount;
            }
            animationId = requestAnimationFrame(autoScroll);
        }

        autoScroll();
    }

    // Testimonial Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const testimonialCards = document.querySelectorAll('.testimonial-img-card');

    testimonialCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (img) {
                lightbox.style.display = "flex"; // Use flex to center with existing CSS if needed, or block as per CSS
                // Ensure CSS matches. My CSS used display: block for content but lightbox itself is block in CSS?
                // CSS says: .lightbox { display: none; ... }
                // Let's stick to block as per CSS or override.
                // Actually, if I want to center it easily, flex is better, but the CSS provided:
                // .lightbox-content { margin: auto; display: block; }
                // This works for block display if height is defined or with padding.
                lightbox.style.display = "block";
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = "none";
            }
        });
    }
});
