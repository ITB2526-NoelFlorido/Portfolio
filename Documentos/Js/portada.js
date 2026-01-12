/* =========================================
   1. LÓGICA DEL MODO OSCURO (Botón Flotante)
   ========================================= */
(function () {
    const btn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const storageKey = 'site-theme';

    function applyTheme(theme) {
      if (theme === 'dark') {
          root.setAttribute('data-theme', 'dark');
          // Actualizamos configuración de partículas para modo oscuro
          updateParticlesColor("#ffffff");
      } else {
          root.removeAttribute('data-theme');
          // Actualizamos configuración de partículas para modo claro (Azul)
          updateParticlesColor("#2563eb");
      }
      btn.textContent = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
    }

    // Función auxiliar para cambiar color de partículas dinámicamente
    function updateParticlesColor(colorHex) {
        // Solo si tsParticles está cargado y existe la instancia 'particles-bg'
        const container = tsParticles.domItem(0);
        if (container) {
            container.options.particles.color.value = colorHex;
            container.options.particles.links.color = colorHex;
            container.refresh();
        }
    }

    // Inicializar desde localStorage o preferencia del sistema
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Toggle al hacer click
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
    // Detectar color inicial basado en el tema actual
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const initialColor = isDark ? "#ffffff" : "#2563eb"; // Blanco en dark, Azul en light

    tsParticles.load("particles-bg", {
      fullScreen: { enable: false }, // Importante: false porque usamos div container
      background: {
        color: "transparent"
      },
      particles: {
        number: { value: 60 },
        color: { value: initialColor },
        links: {
          enable: true,
          color: initialColor,
          opacity: 0.2,
          distance: 120
        },
        move: {
          enable: true,
          speed: 0.5
        },
        opacity: { value: 0.3 },
        size: { value: 2 }
      }
    });
});

/* =========================================
   3. MENÚ DESPLEGABLE SIDEBAR
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll('.has-children');

    menuItems.forEach(item => {
        const title = item.querySelector('.menu-title');

        title.addEventListener('click', (e) => {
            e.stopPropagation();
            item.classList.toggle('open');
        });
    });
});

/* =========================================
   4. FUNCIONES DEL FORMULARIO
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {

    // 1. Buscamos el formulario por su ID
    var form = document.getElementById("contact-form");

    // Si no encuentra el formulario, paramos aquí.
    if (!form) return;

    // 2. Escuchamos cuando alguien intenta enviar
    form.addEventListener("submit", function(event) {

        // Buscamos el botón dentro de este formulario
        var btn = form.querySelector("button");

        // --- A. VALIDACIÓN VISUAL (Temblor) ---
        if (!form.checkValidity()) {
            btn.classList.add("error-shake");
            setTimeout(function() {
                btn.classList.remove("error-shake");
            }, 500);
            return;
        }

        // --- B. EFECTO "ENVIANDO" ---
        btn.innerHTML = "Enviando ✈️...";
        btn.style.backgroundColor = "#28a745";
        btn.style.cursor = "wait";
        btn.style.opacity = "0.9";
    });
});

/* =========================================
   5. MENÚ HAMBURGUESA (MÓVIL)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Solo ejecutamos esto si el botón existe (es decir, en el HTML)
    if (menuToggle && sidebar) {

        // 1. Abrir / Cerrar el menú al tocar el botón
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');

            // Cambiar el icono (☰ a ✕) y el texto
            if (sidebar.classList.contains('active')) {
                menuToggle.innerHTML = "✕ Cerrar";
                // Opcional: Bloquear el scroll del body mientras el menú está abierto
                document.body.style.overflow = "hidden";
            } else {
                menuToggle.innerHTML = "☰";
                document.body.style.overflow = "auto";
            }
        });

        // 2. (Mejora UX) Cerrar el menú automáticamente al hacer clic en un enlace
        // Esto evita que el menú se quede abierto tapando el contenido al navegar
        const sidebarLinks = sidebar.querySelectorAll('a');

        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Solo cerramos si estamos en vista móvil
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    menuToggle.innerHTML = "☰";
                    document.body.style.overflow = "auto";
                }
            });
        });
    }
});