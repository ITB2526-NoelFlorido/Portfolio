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
        const container = tsParticles.domItem(0);
        if (container) {
            container.options.particles.color.value = colorHex;
            container.options.particles.links.color = colorHex;
            container.refresh();
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
});

/* =========================================
   3. MENÚ DESPLEGABLE
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
   4. VALIDACIÓN FORMULARIO (Si existe en la pág)
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("contact-form");
    if (!form) return;

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
    document.addEventListener('DOMContentLoaded', () => {
    console.log("JS Cargado correctamente");

    // 1. Elementos del Menú
    const hamburger = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar-nav');

    // 2. Función Abrir
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.add('active');
        });
    }

    // 3. Función Cerrar (Botón X)
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.remove('active');
        });
    }

    // 4. Cerrar al hacer clic en un enlace
    if (sidebar) {
        const links = sidebar.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        });
    }

    // 5. Tema Oscuro / Claro
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                themeBtn.textContent = "Modo oscuro";
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeBtn.textContent = "Modo claro";
            }
        });
    }

    // 6. Carga de Partículas
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-bg", {
            background: { color: "transparent" },
            particles: {
                number: { value: 50 },
                color: { value: "#888888" },
                links: { enable: true, color: "#888888", distance: 150 },
                move: { enable: true, speed: 1 }
            }
        });
    }
});
});