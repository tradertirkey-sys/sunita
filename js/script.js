document.addEventListener("DOMContentLoaded", () => {
    // 1. Page Loader Fade Out
    const loader = document.getElementById("page-loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("fade-out");
        }, 800);
    }

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");
    if (hamburger && navbar) {
        hamburger.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }

    // 3. Image Slider Functionality
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    if (slides.length > 0) {
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener("click", () => {
                showSlide(currentSlide + 1);
                resetTimer();
            });
            prevBtn.addEventListener("click", () => {
                showSlide(currentSlide - 1);
                resetTimer();
            });
        }

        function startSlider() {
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 4000);
        }

        function resetTimer() {
            clearInterval(slideInterval);
            startSlider();
        }

        startSlider();
    }

    // 4. Lightbox Functionality for Gallery
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="Zoomed Image">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector("img");
    const lightboxClose = lightbox.querySelector(".lightbox-close");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = item.src;
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            lightbox.style.display = "none";
        });
    }

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // 5. Contact Form Validation
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById("name");
            const phone = document.getElementById("phone");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            if (name.value.trim() === "") {
                showError(name, "कृपया अपना नाम दर्ज करें");
                isValid = false;
            } else {
                clearError(name);
            }

            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.value.trim())) {
                showError(phone, "कृपया वैध 10-अंकों का मोबाइल नंबर दर्ज करें");
                isValid = false;
            } else {
                clearError(phone);
            }

            if (email.value.trim() !== "" && !email.value.includes("@")) {
                showError(email, "कृपया वैध ईमेल दर्ज करें");
                isValid = false;
            } else {
                clearError(email);
            }

            if (message.value.trim() === "") {
                showError(message, "कृपया अपना संदेश दर्ज करें");
                isValid = false;
            } else {
                clearError(message);
            }

            if (isValid) {
                alert("धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।");
                contactForm.reset();
            }
        });
    }

    function showError(input, msg) {
        const formGroup = input.parentElement;
        let error = formGroup.querySelector(".error-msg");
        if (!error) {
            error = document.createElement("div");
            error.className = "error-msg";
            formGroup.appendChild(error);
        }
        error.innerText = msg;
        input.style.borderColor = "#e74c3c";
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector(".error-msg");
        if (error) {
            error.remove();
        }
        input.style.borderColor = "var(--border-color)";
    }
});
