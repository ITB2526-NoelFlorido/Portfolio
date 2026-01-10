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

/* --- FUNCIONES DEL FORMULARIO (VALIDACIÓN Y EFECTOS) --- */

document.addEventListener("DOMContentLoaded", function() {

    // 1. Buscamos el formulario por su ID
    var form = document.getElementById("contact-form");

    // Si no encuentra el formulario (ej: estamos en otra página), paramos aquí.
    if (!form) return;

    // 2. Escuchamos cuando alguien intenta enviar
    form.addEventListener("submit", function(event) {

        // Buscamos el botón dentro de este formulario
        var btn = form.querySelector("button");

        // --- A. VALIDACIÓN VISUAL (Temblor) ---
        // form.checkValidity() devuelve 'false' si faltan campos required
        if (!form.checkValidity()) {
            // El navegador mostrará sus globos de error, nosotros añadimos el temblor
            btn.classList.add("error-shake");

            // Quitamos la clase a los 0.5s para que pueda volver a temblar si hace falta
            setTimeout(function() {
                btn.classList.remove("error-shake");
            }, 500);

            // No hacemos nada más, dejamos que el navegador maneje el foco
            return;
        }

        // --- B. EFECTO "ENVIANDO" (Si todo está correcto) ---
        // Si el código llega aquí, es que el formulario se va a enviar a Formspree

        btn.innerHTML = "Enviando ✈️...";       // Cambia el texto
        btn.style.backgroundColor = "#28a745"; // Color Verde Éxito
        btn.style.cursor = "wait";             // Pone el cursor de espera
        btn.style.opacity = "0.9";             // Un poco de transparencia
    });
});