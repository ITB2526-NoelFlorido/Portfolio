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
      if(btn) btn.textContent = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
    }

    // Función auxiliar para cambiar color de partículas dinámicamente
    function updateParticlesColor(colorHex) {
        // Solo si tsParticles está cargado y existe la instancia 'particles-bg'
        // Comprobamos si 'tsParticles' existe para evitar errores
        if (typeof tsParticles !== 'undefined') {
            const container = tsParticles.domItem(0);
            if (container) {
                container.options.particles.color.value = colorHex;
                container.options.particles.links.color = colorHex;
                container.refresh();
            }
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
    // Verificamos que la librería esté cargada
    if (typeof tsParticles === 'undefined') return;

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
   3. MENÚ DESPLEGABLE SIDEBAR (Submenús)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll('.has-children');

    menuItems.forEach(item => {
        const title = item.querySelector('.menu-title');

        if(title) {
            title.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.toggle('open');
            });
        }
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
        if(btn) {
            btn.innerHTML = "Enviando ✈️...";
            btn.style.backgroundColor = "#28a745";
            btn.style.cursor = "wait";
            btn.style.opacity = "0.9";
        }
    });
});

/* =========================================
   3. LÓGICA DEL MENÚ MÓVIL (CORREGIDA)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    // A. Submenús desplegables
    document.querySelectorAll('.has-children .menu-title').forEach(title => {
        title.addEventListener('click', (e) => {
            e.stopPropagation();
            title.parentElement.classList.toggle('open');
        });
    });

    // B. Elementos del Menú Móvil
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar-nav');
    const backdrop = document.getElementById('menu-backdrop');

    // Función para ABRIR el menú
    function openMenu() {
        if(sidebar) sidebar.classList.add('active');
        if(backdrop) backdrop.classList.add('active');
    }

    // Función para CERRAR el menú
    function closeMenu() {
        if(sidebar) sidebar.classList.remove('active');
        if(backdrop) backdrop.classList.remove('active');
    }

    // Eventos
    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    // Cerrar al pulsar un enlace
    if (sidebar) {
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // C. Formulario
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function(event) {
            const btn = form.querySelector("button");
            if (!form.checkValidity()) {
                btn.classList.add("error-shake");
                setTimeout(() => btn.classList.remove("error-shake"), 500);
            } else {
                btn.innerHTML = "Enviando ✈️...";
                btn.style.backgroundColor = "#28a745";
                btn.style.opacity = "0.9";
            }
        });
    }
});
});