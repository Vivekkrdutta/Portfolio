document.addEventListener("DOMContentLoaded", function () {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- CONFIGURATION ---
    const EMAILJS_PUBLIC_KEY = "TZHv1_n-uOxtBR0bu";
    const EMAILJS_TEMPLATE_ID = "template_e28n19p";
    const EMAILJS_SERVICE_ID = "service_fjhuds4";
    const TYPED_TEXTS = ["Game Developer", "Programmer", "Creative Coder"];

    // --- INITIALIZE ALL MODULES ---
    initMobileMenu();
    initHeaderScrollEffect();
    initTypingEffect(TYPED_TEXTS);
    initScrollReveal();
    initFooterYear();
    initEmailJS(EMAILJS_PUBLIC_KEY);
    initContactForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID);
    initCarousel();

});

// --- MODULES ---

function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
}

function initHeaderScrollEffect() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-slate-900/80', 'backdrop-blur-sm', 'shadow-lg');
        } else {
            header.classList.remove('bg-slate-900/80', 'backdrop-blur-sm', 'shadow-lg');
        }
    });
}

function initTypingEffect(textArray) {
    const typedTextSpan = document.getElementById("typed-text");
    if (!typedTextSpan || !textArray.length) return;

    const typingDelay = 100, erasingDelay = 50, newTextDelay = 2000;
    let textArrayIndex = 0, charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, typingDelay + 1100);
        }
    }

    setTimeout(type, newTextDelay + 250);
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

function initFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function initEmailJS(publicKey) {
    emailjs.init({ publicKey: publicKey });
}

function initContactForm(serviceId, templateId) {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");
    if (!form || !feedback) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const params = {
            name: document.getElementById("user_name").value,
            message: document.getElementById("message").value,
            email: document.getElementById("user_email").value,
        };

        feedback.textContent = "Sending...";
        feedback.className = "mt-6 text-lg text-yellow-400";

        emailjs.send(serviceId, templateId, params)
            .then(() => {
                feedback.textContent = "✅ Message sent successfully!";
                feedback.classList.replace("text-yellow-400", "text-green-400");
                form.reset();
            })
            .catch((error) => {
                feedback.textContent = "❌ Failed to send. Please try again later.";
                feedback.classList.replace("text-yellow-400", "text-red-400");
                console.error("EmailJS error:", error);
            });
    });
}

function initCarousel() {
    const track = document.getElementById('carousel-track');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    if (!track || !nextButton || !prevButton) return;
    
    const slides = Array.from(track.children);
    let currentIndex = 0;

    const updateCarousel = () => {
        const slideWidth = slides[0].offsetWidth;
        // The transform is now calculated correctly using only the slide's full width.
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        slides.forEach((slide, index) => {
            let scale = '0.85';
            let opacity = '0.6';
            if (index === currentIndex) {
                scale = '1';
                opacity = '1';
            }
            slide.style.transform = `scale(${scale})`;
            slide.style.opacity = opacity;
        });

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === slides.length - 1;
    };

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);
    
    // Use a small timeout to ensure all images are loaded and widths are correct
    setTimeout(updateCarousel, 100);
}


// --- Global Modal Functions ---
function openModal(imgSrc) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("modalImg");
    if (modal && modalImg) {
        modalImg.src = imgSrc;
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }
}

function closeModal() {
    const modal = document.getElementById("certModal");
    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
}
