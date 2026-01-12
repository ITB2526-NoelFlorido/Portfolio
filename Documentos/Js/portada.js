document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema JS cargado correctamente");

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
    // Abrir menú
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.add('active');
        });
    }

    // Cerrar menú con botón X
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.remove('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace (para navegar)
    if (sidebar) {
        const links = sidebar.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        });
    }

    // Lógica de acordeón (Submenús)
    const menuItems = document.querySelectorAll('.has-children');
    menuItems.forEach(item => {
        const title = item.querySelector('.menu-title');
        if(title) {
            title.addEventListener('click', (e) => {
                // Si es móvil, no hacemos nada (ya están abiertos)
                if(window.innerWidth > 768) {
                    if (e.target.tagName !== 'A') {
                        e.stopPropagation();
                        item.classList.toggle('open');
                    }
                }
            });
        }
    });

    /* =========================================
       3. MODO OSCURO & PARTÍCULAS
       ========================================= */

    function loadParticles(colorHex) {
        if (typeof tsParticles === 'undefined') return;

        tsParticles.load("particles-bg", {
            fullScreen: { enable: false },
            background: { color: "transparent" },
            particles: {
                number: { value: 40 },
                color: { value: colorHex },
                links: { enable: true, color: colorHex, distance: 150, opacity: 0.4 },
                move: { enable: true, speed: 1 },
                opacity: { value: 0.5 },
                size: { value: 3 }
            }
        });
    }

    function applyTheme(isDark) {
        if (isDark) {
            root.setAttribute('data-theme', 'dark');
            if (themeBtn) themeBtn.textContent = 'Modo claro';
            loadParticles("#ffffff"); // Partículas blancas
        } else {
            root.removeAttribute('data-theme');
            if (themeBtn) themeBtn.textContent = 'Modo oscuro';
            loadParticles("#2563eb"); // Partículas azules
        }
    }

    // Cargar preferencia guardada o del sistema
    const savedTheme = localStorage.getItem('site-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    // Evento Click Botón Tema
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDarkNow = root.getAttribute('data-theme') === 'dark';
            if (isDarkNow) {
                applyTheme(false);
                localStorage.setItem('site-theme', 'light');
            } else {
                applyTheme(true);
                localStorage.setItem('site-theme', 'dark');
            }
        });
    }

    /* =========================================
       4. FORMULARIO
       ========================================= */
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            const btn = contactForm.querySelector("button");

            // Validación visual
            if (!contactForm.checkValidity()) {
                if (btn) {
                    btn.classList.add("error-shake");
                    setTimeout(() => btn.classList.remove("error-shake"), 500);
                }
                // Deja que el navegador maneje los mensajes nativos
                return;
            }

            // Efecto de envío
            if (btn) {
                btn.innerHTML = "Enviando ✈️...";
                btn.style.opacity = "0.7";
            }
        });
    }
});