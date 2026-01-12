/* =========================================
   1. MODO OSCURO (Botón Flotante)
   ========================================= */
(function () {
    const btn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const storageKey = 'site-theme';

    function applyTheme(theme) {
      if (theme === 'dark') {
          root.setAttribute('data-theme', 'dark');
          updateParticlesColor("#ffffff"); // Partículas blancas en fondo oscuro
      } else {
          root.removeAttribute('data-theme');
          updateParticlesColor("#2563eb"); // Partículas azules en fondo claro
      }
      if(btn) btn.textContent = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
    }

    function updateParticlesColor(colorHex) {
        // Solo intentamos actualizar si tsParticles está cargado
        if (typeof tsParticles !== 'undefined') {
            const container = tsParticles.domItem(0);
            if (container) {
                container.options.particles.color.value = colorHex;
                container.options.particles.links.color = colorHex;
                container.refresh();
            }
        }
    }

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }

    if (btn) {
        btn.addEventListener('click', () => {
          const isDark = root.getAttribute('data-theme') === 'dark';
          const next = isDark ? 'light' : 'dark';
          applyTheme(next);
          localStorage.setItem(storageKey, next);
        });
    }
})();

/* =========================================
   2. INICIALIZACIÓN DE PARTÍCULAS
   ========================================= */
window.addEventListener("load", () => {
    // Verificamos si la librería existe para evitar errores
    if (typeof tsParticles !== 'undefined') {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const initialColor = isDark ? "#ffffff" : "#2563eb";

        tsParticles.load("particles-bg", {
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            color: { value: initialColor },
            links: { enable: true, color: initialColor, opacity: 0.2, distance: 120 },
            move: { enable: true, speed: 0.5 },
            opacity: { value: 0.3 },
            size: { value: 2 }
          }
        });
    }
});

/* =========================================
   3. MENÚ DESPLEGABLE (Submenús de la barra lateral)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.has-children');
    menuItems.forEach(item => {
        const title = item.querySelector('.menu-title');
        // Verificamos que existan antes de añadir eventos
        if (title) {
            title.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.toggle('open');
            });
        }
    });
});

/* =========================================
   4. VALIDACIÓN FORMULARIO (Solo si existe)
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("contact-form");
    if (!form) return; // Si no hay formulario, salimos

    form.addEventListener("submit", function(event) {
        var btn = form.querySelector("button");
        if (!form.checkValidity()) {
            btn.classList.add("error-shake");
            setTimeout(function() {
                btn.classList.remove("error-shake");
            }, 500);
            return;
        }
        btn.innerHTML = "Enviando ✈️...";
        btn.style.backgroundColor = "#28a745";
        btn.style.cursor = "wait";
        btn.style.opacity = "0.9";
    });
});

/* =========================================
   5. MENÚ HAMBURGUESA (MÓVIL) - CÓDIGO CORREGIDO
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    // USAMOS LOS NOMBRES EXACTOS DE TU HTML
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Verificamos que ambos existan
    if (menuToggle && sidebar) {

        // 1. Abrir / Cerrar al tocar el botón
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita clics fantasma
            sidebar.classList.toggle('active');

            // Cambiar icono y bloquear scroll
            if (sidebar.classList.contains('active')) {
                menuToggle.innerHTML = "✕ Cerrar";
                document.body.style.overflow = "hidden"; // No deja hacer scroll al fondo
            } else {
                menuToggle.innerHTML = "☰";
                document.body.style.overflow = "auto";
            }
        });

        // 2. Cerrar menú al hacer clic en cualquier enlace dentro
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Solo si estamos en móvil cerramos
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    menuToggle.innerHTML = "☰";
                    document.body.style.overflow = "auto";
                }
            });
        });
    }
});