document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Set current year in footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // FAQ Accordion logic
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all
            faqItems.forEach(faq => {
                faq.classList.remove("active");
                faq.querySelector(".faq-answer").style.maxHeight = null;
            });

            // Open clicked if not active
            if (!isActive) {
                item.classList.add("active");
                const answer = item.querySelector(".faq-answer");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .scale-in');
    revealElements.forEach(el => observer.observe(el));

    // Social Proof Notifications (Expanded for realism)
    const socialProofData = [
        { name: "Carolina M.", city: "Bogotá", text: "acaba de descargar su eBook 📚" },
        { name: "Juan David P.", city: "Medellín", text: "se cansó de las dietas hoy" },
        { name: "Andrea R.", city: "Cali", text: "compró el método de María López" },
        { name: "Mateo S.", city: "Barranquilla", text: "acaba de asegurar su oferta del 80%" },
        { name: "Valentina G.", city: "Pereira", text: "lista para el reto de 21 días" },
        { name: "Andrés F.", city: "Bucaramanga", text: "compró el eBook hace 2 min" },
        { name: "Paola V.", city: "Cúcuta", text: "decidió transformar su salud hoy" },
        { name: "Luisa F.", city: "Madrid, ES", text: "se unió desde España 🇪🇸" },
        { name: "Carlos B.", city: "Miami, US", text: "aprovechó el precio especial" },
        { name: "Sandra T.", city: "Cartagena", text: "empezó su transformación ahora" },
        { name: "Daniela O.", city: "Manizales", text: "compró el eBook + Bonos" },
        { name: "Pedro J.", city: "Bogotá", text: "acaba de comprar el eBook" },
        { name: "Isabella K.", city: "Cali", text: "aprovechó el descuento final" },
        { name: "Manuel D.", city: "Medellín", text: "se unió al método hace 10 min" },
        { name: "Gabriela Q.", city: "Ibagué", text: "descargó el plan de 21 días" },
        { name: "Nicolas W.", city: "Bogotá", text: "acaba de asegurar su copia" }
    ];

    const toast = document.createElement('div');
    toast.className = 'social-proof-toast';
    document.body.appendChild(toast);

    function showSocialProof() {
        const random = socialProofData[Math.floor(Math.random() * socialProofData.length)];
        const initial = random.name.charAt(0);

        toast.innerHTML = `
            <div class="toast-avatar" style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #059669); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink:0; border: 2px solid rgba(255,255,255,0.2); shadow: 0 4px 10px rgba(0,0,0,0.3);">${initial}</div>
            <div class="toast-content" style="flex-grow:1; display: flex; flex-direction: column;">
                <p style="margin:0; font-size:0.85rem; color:white; line-height: 1.2;"><strong>${random.name}</strong> en ${random.city}</p>
                <p style="margin:0; font-size:0.8rem; color: #94a3b8;">${random.text}</p>
                <span style="font-size:0.7rem; color:#10b981; font-weight:600; text-transform: uppercase; letter-spacing: 0.5px;">Compra Verificada ✨</span>
            </div>
        `;

        lucide.createIcons();
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // Show first after 2 seconds, then every 2s on mobile, 18s on desktop
    const isMobile = window.innerWidth <= 768;
    const intervalTime = isMobile ? 2000 : 18000;
    const firstDelay = 3000;

    setTimeout(() => {
        showSocialProof();
        setInterval(showSocialProof, intervalTime);
    }, firstDelay);

    // Sticky CTA Logic
    const stickyBtn = document.querySelector('.sticky-buy-btn');
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        if (heroBottom < 0) {
            stickyBtn.classList.add('show');
        } else {
            stickyBtn.classList.remove('show');
        }
    });

    // Countdown Timer Logic (36 mins)
    let totalSeconds = 36 * 60;
    const countdownEl = document.getElementById('countdown');

    function updateCountdown() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const hDisp = hours < 10 ? '0' + hours : hours;
        const mDisp = minutes < 10 ? '0' + minutes : minutes;
        const sDisp = seconds < 10 ? '0' + seconds : seconds;

        countdownEl.innerHTML = `${hDisp}:${mDisp}:${sDisp}`;

        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            countdownEl.innerHTML = "OFERTA EXPIRADA";
            countdownEl.style.color = "#ffdd00";
        }
    }

    // Update every second
    setInterval(updateCountdown, 1000);
});
