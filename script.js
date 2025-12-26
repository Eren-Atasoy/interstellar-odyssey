// ============================================
// INTERSTELLAR ODYSSEY - MAIN JAVASCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    // Initialize all modules
    initMobileMenu()
    initSmoothScroll()
    initWeightCalculator()
    initBookingForm()
    initBookingModal() // New module
    initScrollAnimations()
    initNavbarScroll()
})

// ... (existing code) ...

// ============================================
// BOOKING MODAL
// ============================================
function initBookingModal() {
    const modal = document.getElementById("bookingModal")
    const closeBtn = document.getElementById("bookingModalClose")
    const openBtns = document.querySelectorAll(".open-booking-modal")
    const modalForm = document.getElementById("modalBookingForm")
    const successModal = document.getElementById("successModal")

    if (modal && openBtns.length > 0) {
        // Open Modal
        openBtns.forEach((btn) => {
            btn.addEventListener("click", function () {
                const card = this.closest(".destination-card")
                const planet = this.getAttribute("data-planet") || (card ? card.getAttribute("data-planet") : "")

                // Pre-select destination
                const select = document.getElementById("modalDestination")
                if (select) {
                    select.value = planet || ""
                }

                modal.classList.add("active")
            })
        })

        // Close Modal
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.classList.remove("active")
            })
        }

        // Close on click outside
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active")
            }
        })

        // Form Submission
        if (modalForm) {
            modalForm.addEventListener("submit", (e) => {
                e.preventDefault()

                // Clear previous errors
                document.querySelectorAll("#modalBookingForm .error-message").forEach((el) => (el.textContent = ""))
                document
                    .querySelectorAll("#modalBookingForm input, #modalBookingForm select")
                    .forEach((el) => (el.style.borderColor = ""))

                // Validation
                const fullName = document.getElementById("modalFullName").value.trim()
                const email = document.getElementById("modalEmail").value.trim()
                const destination = document.getElementById("modalDestination").value
                const terms = document.getElementById("modalTerms").checked

                let isValid = true

                if (!fullName || fullName.length < 3) {
                    document.getElementById("modalFullNameError").textContent = "Ad Soyad en az 3 karakter olmalıdır."
                    document.getElementById("modalFullName").style.borderColor = "var(--color-error)"
                    isValid = false
                }
                if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    document.getElementById("modalEmailError").textContent = "Geçerli bir e-posta giriniz."
                    document.getElementById("modalEmail").style.borderColor = "var(--color-error)"
                    isValid = false
                }
                if (!destination) {
                    document.getElementById("modalDestinationError").textContent = "Lütfen bir destinasyon seçin."
                    document.getElementById("modalDestination").style.borderColor = "var(--color-error)"
                    isValid = false
                }
                if (!terms) {
                    document.getElementById("modalTermsError").textContent = "Kullanım koşullarını kabul etmelisiniz."
                    isValid = false
                }

                if (isValid) {
                    const submitBtn = modalForm.querySelector('button[type="submit"]')
                    submitBtn.innerHTML = "<span>Gönderiliyor...</span>"
                    submitBtn.disabled = true

                    setTimeout(() => {
                        modal.classList.remove("active")
                        modalForm.reset()
                        submitBtn.innerHTML = `<span>Rezervasyon Talebi Gönder</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>`
                        submitBtn.disabled = false
                        successModal.classList.add("active")
                    }, 1500)
                }
            })
        }
    }
}



// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn")
    const navLinks = document.getElementById("navLinks")

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", function () {
            this.classList.toggle("active")
            navLinks.classList.toggle("active")
        })

        // Close menu when clicking a link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenuBtn.classList.remove("active")
                navLinks.classList.remove("active")
            })
        })

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuBtn.classList.remove("active")
                navLinks.classList.remove("active")
            }
        })
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()
            const targetId = this.getAttribute("href")
            const targetElement = document.querySelector(targetId)

            if (targetElement) {
                const navHeight = document.querySelector(".navbar").offsetHeight
                const targetPosition = targetElement.offsetTop - navHeight

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                })
            }
        })
    })
}

// ============================================
// WEIGHT CALCULATOR
// ============================================
function initWeightCalculator() {
    const calculateBtn = document.getElementById("calculateBtn")
    const earthWeightInput = document.getElementById("earthWeight")
    const planetSelect = document.getElementById("planetSelect")
    const resultDiv = document.getElementById("calculatorResult")

    const planetNames = {
        0.38: "Mars",
        2.53: "Jüpiter",
        0.16: "Ay",
        0.91: "Venüs",
        1.07: "Satürn",
        0.93: "Uranüs",
        1.14: "Neptün",
        0.06: "Plüton",
    }

    if (calculateBtn) {
        calculateBtn.addEventListener("click", () => {
            const earthWeight = Number.parseFloat(earthWeightInput.value)
            const gravityFactor = Number.parseFloat(planetSelect.value)

            // Validation
            if (!earthWeight || earthWeight <= 0) {
                showResult("error", "Lütfen geçerli bir kilo girin!")
                shakeElement(earthWeightInput)
                return
            }

            if (!gravityFactor) {
                showResult("error", "Lütfen bir gezegen seçin!")
                shakeElement(planetSelect)
                return
            }

            // Calculate weight
            const planetWeight = (earthWeight * gravityFactor).toFixed(2)
            const planetName = planetNames[planetSelect.value]

            // Show result with animation
            showResult("success", `${planetName}'da ağırlığınız: <strong>${planetWeight} kg</strong>`)
        })
    }

    function showResult(type, message) {
        const resultText = resultDiv.querySelector(".result-text")

        // Add animation
        resultDiv.style.transform = "scale(0.95)"
        resultDiv.style.opacity = "0"

        setTimeout(() => {
            if (type === "success") {
                resultDiv.style.borderColor = "rgba(0, 255, 136, 0.3)"
                resultDiv.style.background = "rgba(0, 255, 136, 0.05)"
                resultText.innerHTML = message
                resultText.classList.add("active")
            } else {
                resultDiv.style.borderColor = "rgba(255, 71, 87, 0.3)"
                resultDiv.style.background = "rgba(255, 71, 87, 0.05)"
                resultText.innerHTML = message
                resultText.classList.remove("active")
                resultText.style.color = "#ff4757"
            }

            resultDiv.style.transform = "scale(1)"
            resultDiv.style.opacity = "1"
        }, 150)

        // Reset error style after 3 seconds
        if (type === "error") {
            setTimeout(() => {
                resultDiv.style.borderColor = "rgba(0, 242, 255, 0.2)"
                resultDiv.style.background = "rgba(0, 242, 255, 0.05)"
                resultText.style.color = ""
            }, 3000)
        }
    }

    function shakeElement(element) {
        element.style.animation = "shake 0.5s ease"
        setTimeout(() => {
            element.style.animation = ""
        }, 500)
    }

    // Add shake animation CSS
    const style = document.createElement("style")
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
    `
    document.head.appendChild(style)
}

// ============================================
// BOOKING FORM VALIDATION
// ============================================
function initBookingForm() {
    const bookingForm = document.getElementById("bookingForm")
    const successModal = document.getElementById("successModal")
    const modalClose = document.getElementById("modalClose")
    const modalBtn = document.getElementById("modalBtn")

    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // Clear previous errors
            clearErrors()

            // Get form values
            const fullName = document.getElementById("fullName").value.trim()
            const email = document.getElementById("email").value.trim()
            const destination = document.getElementById("destination").value
            const terms = document.getElementById("terms").checked

            let isValid = true

            // Validate Full Name
            if (!fullName) {
                showError("fullName", "Ad Soyad alanı zorunludur.")
                isValid = false
            } else if (fullName.length < 3) {
                showError("fullName", "Ad Soyad en az 3 karakter olmalıdır.")
                isValid = false
            }

            // Validate Email
            if (!email) {
                showError("email", "E-posta alanı zorunludur.")
                isValid = false
            } else if (!isValidEmail(email)) {
                showError("email", "Geçerli bir e-posta adresi girin.")
                isValid = false
            }

            // Validate Destination
            if (!destination) {
                showError("destination", "Lütfen bir destinasyon seçin.")
                isValid = false
            }

            // Validate Terms
            if (!terms) {
                showError("terms", "Kullanım koşullarını kabul etmelisiniz.")
                isValid = false
            }

            // If valid, show success modal
            if (isValid) {
                // Simulate form submission
                const submitBtn = bookingForm.querySelector('button[type="submit"]')
                submitBtn.innerHTML = "<span>Gönderiliyor...</span>"
                submitBtn.disabled = true

                setTimeout(() => {
                    successModal.classList.add("active")
                    bookingForm.reset()
                    submitBtn.innerHTML = `
                        <span>Rezervasyon Talebi Gönder</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                    `
                    submitBtn.disabled = false
                }, 1500)
            }
        })

        // Real-time validation
        const inputs = bookingForm.querySelectorAll("input, select")
        inputs.forEach((input) => {
            input.addEventListener("blur", function () {
                validateField(this)
            })

            input.addEventListener("input", function () {
                const errorElement = document.getElementById(this.id + "Error")
                if (errorElement && errorElement.textContent) {
                    validateField(this)
                }
            })
        })
    }

    // Modal close handlers
    if (modalClose) {
        modalClose.addEventListener("click", closeModal)
    }

    if (modalBtn) {
        modalBtn.addEventListener("click", closeModal)
    }

    if (successModal) {
        successModal.addEventListener("click", (e) => {
            if (e.target === successModal) {
                closeModal()
            }
        })
    }

    function closeModal() {
        successModal.classList.remove("active")
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + "Error")
        const inputElement = document.getElementById(fieldId)

        if (errorElement) {
            errorElement.textContent = message
        }

        if (inputElement) {
            inputElement.style.borderColor = "var(--color-error)"
        }
    }

    function clearErrors() {
        document.querySelectorAll(".error-message").forEach((el) => {
            el.textContent = ""
        })

        document.querySelectorAll("input, select").forEach((el) => {
            el.style.borderColor = ""
        })
    }

    function validateField(field) {
        const value = field.value.trim()
        const fieldId = field.id
        const errorElement = document.getElementById(fieldId + "Error")

        if (!errorElement) return

        // Clear previous error
        errorElement.textContent = ""
        field.style.borderColor = ""

        switch (fieldId) {
            case "fullName":
                if (!value) {
                    showError(fieldId, "Ad Soyad alanı zorunludur.")
                } else if (value.length < 3) {
                    showError(fieldId, "Ad Soyad en az 3 karakter olmalıdır.")
                }
                break
            case "email":
                if (!value) {
                    showError(fieldId, "E-posta alanı zorunludur.")
                } else if (!isValidEmail(value)) {
                    showError(fieldId, "Geçerli bir e-posta adresi girin.")
                }
                break
            case "destination":
                if (!value) {
                    showError(fieldId, "Lütfen bir destinasyon seçin.")
                }
                break
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in")
            }
        })
    }, observerOptions)

    // Observe elements
    const animateElements = document.querySelectorAll(
        ".destination-card, .section-header, .calculator-card, .booking-form, .info-card",
    )
    animateElements.forEach((el) => {
        el.style.opacity = "0"
        el.style.transform = "translateY(30px)"
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        observer.observe(el)
    })

    // Add animation class styles
    const style = document.createElement("style")
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `
    document.head.appendChild(style)
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector(".navbar")
    let lastScroll = 0

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset

        if (currentScroll <= 0) {
            navbar.classList.remove("hidden")
            navbar.style.background = "rgba(10, 10, 15, 0.8)"
            navbar.style.boxShadow = "none"
            return
        }

        if (currentScroll > lastScroll && !navbar.classList.contains("hidden")) {
            // Scrolling down & navbar is visible -> hide it
            navbar.classList.add("hidden")
        } else if (currentScroll < lastScroll && navbar.classList.contains("hidden")) {
            // Scrolling up & navbar is hidden -> show it
            navbar.classList.remove("hidden")
        }

        // Background styling when scrolled
        if (currentScroll > 50) {
            navbar.style.background = "rgba(10, 10, 15, 0.95)"
            navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)"
        } else {
            navbar.style.background = "rgba(10, 10, 15, 0.8)"
            navbar.style.boxShadow = "none"
        }

        lastScroll = currentScroll
    })
}

// ============================================
// DESTINATION CARD HOVER EFFECTS
// ============================================
document.querySelectorAll(".destination-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.querySelector(".card-image img").style.transform = "scale(1.1)"
    })

    card.addEventListener("mouseleave", function () {
        this.querySelector(".card-image img").style.transform = "scale(1)"
    })
})
