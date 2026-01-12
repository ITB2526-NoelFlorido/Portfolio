document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema JS cargado correctamente");

    /* =========================================
       1. VARIABLES Y SELECTORES GLOBALES
       ========================================= */
    const hamburger = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar-nav');
    const backdrop = document.getElementById('menu-backdrop'); // El fondo oscuro
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const contactForm = document.getElementById("contact-form");

    /* =========================================
       2. LÓGICA DEL MENÚ MÓVIL (Sidebar)
       ========================================= */

    // Función para abrir
    function openMenu() {
        if (sidebar) sidebar.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
    }

    // Función para cerrar
    function closeMenu() {
        if (sidebar) sidebar.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
    }

    // Evento: Botón Hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            openMenu();
        });
    }

    // Evento: Botón X (Cerrar)
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
        });
    }

    // Evento: Clic en el fondo oscuro (Backdrop)
    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    // Evento: Cerrar al hacer clic en un enlace final (no desplegable)
    if (sidebar) {
        const links = sidebar.querySelectorAll('.menu-link'); // Seleccionamos los enlaces finales
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    /* =========================================
       3. LÓGICA DE SUBMENÚS (Acordeón)
       ========================================= */
    // Seleccionamos los títulos que abren submenús
    const menuTitles = document.querySelectorAll('.has-children .menu-title');

    menuTitles.forEach(title => {
        title.addEventListener('click', (e) => {
            // Evitamos que actúe como link si queremos que despliegue
            e.preventDefault();
            e.stopPropagation();

            // Buscamos el padre (li) para ponerle la clase 'open'
            const parentLi = title.parentElement;

            // Alternar clase (abrir/cerrar)
            parentLi.classList.toggle('open');
        });
    });

    /* =========================================
       4. LÓGICA DEL MODO OSCURO Y PARTÍCULAS
       ========================================= */

    // Función para recargar partículas con el color correcto
    function updateParticles(colorHex) {
        // Verificamos si la librería tsParticles está cargada
        if (typeof tsParticles === 'undefined') return;

        tsParticles.load("particles-bg", {
            fullScreen: { enable: false }, // Importante: false para respetar el div
            background: { color: "transparent" },
            particles: {
                number: { value: 45 },
                color: { value: colorHex },
                links: {
                    enable: true,
                    color: colorHex,
                    distance: 150,
                    opacity: 0.3
                },
                move: { enable: true, speed: 1 },
                opacity: { value: 0.5 },
                size: { value: 3 }
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                    onClick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Función principal para aplicar el tema
    function applyTheme(isDark) {
        if (isDark) {
            // Activar modo oscuro
            root.setAttribute('data-theme', 'dark');
            if (themeBtn) themeBtn.textContent = 'Modo claro';
            updateParticles("#ffffff"); // Partículas Blancas
        } else {
            // Activar modo claro
            root.removeAttribute('data-theme');
            if (themeBtn) themeBtn.textContent = 'Modo oscuro';
            updateParticles("#000000"); // Partículas Negras (para que se vean en fondo blanco)
        }
    }

    // 1. Verificar preferencia guardada o del sistema al cargar
    const savedTheme = localStorage.getItem('site-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    // 2. Evento del botón de cambio de tema
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
       5. LÓGICA DEL FORMULARIO
       ========================================= */
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            const btn = contactForm.querySelector("button");

            // Validación visual (Efecto temblor)
            if (!contactForm.checkValidity()) {
                if (btn) {
                    btn.classList.add("error-shake");
                    setTimeout(() => {
                        btn.classList.remove("error-shake");
                    }, 500);
                }
                // Dejamos que el navegador muestre sus mensajes de error nativos
                return;
            }

            // Efecto visual de "Enviando..."
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = "Enviando ✈️...";
                btn.style.opacity = "0.7";
                btn.style.cursor = "wait";
            }
        });
    }
});