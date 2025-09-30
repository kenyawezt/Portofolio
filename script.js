document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Bar Logic ---
    const header = document.getElementById('main-header');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Toggle mobile menu
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-white', 'shadow-md');
            header.classList.remove('bg-white/70', 'backdrop-blur-sm');
        } else {
            header.classList.remove('bg-white', 'shadow-md');
            header.classList.add('bg-white/70', 'backdrop-blur-sm');
        }
    });

    // --- Looping Typing Animation for Logo ---
    function loopingTypeEffect(element, text, typeSpeed, deleteSpeed, pauseEnd, pauseStart) {
        let i = 0;
        let isDeleting = false;
        const cursor = '<span class="blinking-cursor">|</span>';

        function loop() {
            const currentText = isDeleting ? text.substring(0, i - 1) : text.substring(0, i + 1);
            element.innerHTML = currentText + cursor;

            if (!isDeleting && i < text.length) {
                i++;
                setTimeout(loop, typeSpeed);
            } else if (isDeleting && i > 0) {
                i--;
                setTimeout(loop, deleteSpeed);
            } else if (!isDeleting && i === text.length) {
                isDeleting = true;
                setTimeout(loop, pauseEnd);
            } else if (isDeleting && i === 0) {
                isDeleting = false;
                setTimeout(loop, pauseStart);
            }
        }
        loop();
    }
    const logoElement = document.getElementById('animated-logo');
    loopingTypeEffect(logoElement, "Wahyu Alpha", 150, 100, 2000, 500);

    // --- Typing Animation for Full Name ---
    function typeEffect(element, text, speed) {
        let i = 0;
        element.innerHTML = "";
        const cursor = '<span class="blinking-cursor">|</span>';
        
        function type() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + cursor;
                i++;
                setTimeout(type, speed);
            } else {
                element.innerHTML = text; // Hapus kursor setelah selesai
            }
        }
        type();
    }
    const fullNameElement = document.getElementById('animated-fullname');
    
    // Intersection Observer for Typing Animation
    const typingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    typeEffect(fullNameElement, "Kadek Wahyu Alpha Kusuma Putra", 75);
                }, 300); // Small delay
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });
    typingObserver.observe(fullNameElement);


    // --- Swiper for Experience Section ---
    const experienceSwiper = new Swiper('.experience-slider', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // --- Swiper for Projects Section ---
    const projectSwiper = new Swiper('.project-slider', {
        loop: true,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });
    
    // --- Filter Portofolio Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.getElementById('portfolio-grid');

    // Set default filter to 'desain'
    const defaultFilter = 'desain'; 
    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (category !== defaultFilter) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    });
    // Apply initial grid for default filter
    portfolioGrid.classList.add('lg:grid-cols-4');


    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');

            // Change grid columns based on filter
            portfolioGrid.classList.remove('lg:grid-cols-3', 'lg:grid-cols-4');
            if (filter === 'desain') {
                portfolioGrid.classList.add('lg:grid-cols-4');
            } else {
                // For fotografi and videografi, use 3 columns
                portfolioGrid.classList.add('lg:grid-cols-3');
            }

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- Modal Sertifikat Logic ---
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const closeModalBtn = document.getElementById('closeModal');
    const modalContent = modal.querySelector('div');

    function openModal(imgSrc) {
        modalImage.src = imgSrc;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modalContent.classList.remove('translate-y-full');
        }, 10); // Animate in
    }

    function closeModal() {
        modalContent.classList.add('translate-y-full');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 500); // Match transition duration
    }

    // Event listener for all modal triggers
    const modalTriggers = document.querySelectorAll('.achievement-card, .certificate-item, .hero-image-link');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const imgSrc = trigger.getAttribute('data-src');
            if(imgSrc) openModal(imgSrc);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Page Load Animation ---
    const elementsToAnimate = document.querySelectorAll('.initial-hidden');
    elementsToAnimate.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('is-visible');
        }, 200 * (index + 1)); // Start animation after header
    });
    // Animate header separately without delay
    document.getElementById('main-header').classList.add('is-visible');

    // --- Profile Flip Card Logic ---
    const profileFlipCard = document.getElementById('profile-flip-card');
    if (profileFlipCard) {
        profileFlipCard.addEventListener('click', () => {
            profileFlipCard.classList.toggle('is-flipped');
        });
    }
});

