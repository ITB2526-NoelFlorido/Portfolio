document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema cargado correctamente");

    /* =========================================
       1. VARIABLES GLOBALES
       ========================================= */
    const hamburger = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar-nav');
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const contactForm = document.getElementById("contact-form");

    /* =========================================
       2. LÓGICA DEL MENÚ MÓVIL
       ========================================= */
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.add('active');
        });
    }

    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.remove('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    if (sidebar) {
        const links = sidebar.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        });
    }

    // Acordeón para submenús (PC)
    const menuItems = document.querySelectorAll('.has-children');
    menuItems.forEach(item => {
        const title = item.querySelector('.menu-title');
        if(title) {
            title.addEventListener('click', (e) => {
                // Solo actúa si no es un enlace directo
                if (e.target.tagName !== 'A') {
                    e.stopPropagation();
                    item.classList.toggle('open');
                }
            });
        }
    });

    /* =========================================
       3. LÓGICA DEL MODO OSCURO & PARTÍCULAS
       ========================================= */

    function updateParticles(isDark) {
        if (typeof tsParticles === 'undefined') return;

        const color = isDark ? "#ffffff" : "#2563eb"; // Blanco en oscuro, Azul en claro

        // Cargamos partículas con configuración simple
        tsParticles.load("particles-bg", {
            fullScreen: { enable: false },
            background: { color: "transparent" },
            particles: {
                number: { value: 50 },
                color: { value: color },
                links: { enable: true, color: color, distance: 150, opacity: 0.4 },
                move: { enable: true, speed: 1 },
                opacity: { value: 0.5 },
                size: { value: 3 }
            }
        });
    }

    // Aplicar tema
    function applyTheme(isDark) {
        if (isDark) {
            root.setAttribute('data-theme', 'dark');
            if (themeBtn) themeBtn.textContent = 'Modo claro';
            updateParticles(true);
        } else {
            root.removeAttribute('data-theme');
            if (themeBtn) themeBtn.textContent = 'Modo oscuro';
            updateParticles(false);
        }
    }

    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem('site-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    // Evento botón
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = root.getAttribute('data-theme') === 'dark';
            if (isDark) {
                applyTheme(false);
                localStorage.setItem('site-theme', 'light');
            } else {
                applyTheme(true);
                localStorage.setItem('site-theme', 'dark');
            }
        });
    }

    /* =========================================
       4. LÓGICA DEL FORMULARIO
       ========================================= */
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            const btn = contactForm.querySelector("button");

            // Validación visual simple
            if (!contactForm.checkValidity()) {
                if (btn) {
                    btn.classList.add("error-shake");
                    setTimeout(() => btn.classList.remove("error-shake"), 500);
                }
                return;
            }

            // Efecto enviando
            if (btn) {
                btn.innerHTML = "Enviando ✈️...";
                btn.style.opacity = "0.7";
            }
        });
    }
});