# Portafolio Personal - Noel

Bienvenido al repositorio de mi portafolio personal profesional. Este proyecto ha sido desarrollado desde cero utilizando estándares web modernos, sin depender de constructores visuales ni frameworks pesados, priorizando el rendimiento, la semántica y el código limpio.

**Ver Demo en Vivo:** https://itb2526-noelflorido.github.io/Portfolio/

## Características Principales

Este proyecto cumple con los requisitos técnicos de la actividad TA05, implementando las siguientes funcionalidades:

### 1. Dark Mode Persistente
- Implementado con JavaScript nativo y Variables CSS.
- Detecta la preferencia del sistema operativo del usuario automáticamente.
- Utiliza LocalStorage para guardar la preferencia del usuario (la elección se mantiene al navegar entre páginas o recargar).

### 2. Diseño Responsive y Menú Móvil
- Diseño adaptable a dispositivos móviles (Mobile First).
- Menú de navegación lateral interactivo:
  - En escritorio: Barra lateral fija.
  - En móvil: Menú oculto tipo "Off-canvas" con botón hamburguesa animado mediante manipulación del DOM.

### 3. Formulario de Contacto Funcional
- Integración con la API de Formspree.
- Validación de campos mediante HTML5 y JavaScript.
- Gestión de estados de envío y mensajes de error/éxito.

### 4. Interfaz Moderna
- Uso de CSS Grid para la maquetación del listado de proyectos.
- Fondo dinámico de partículas utilizando la librería tsParticles.
- Transiciones suaves y efectos hover en tarjetas y botones.

## Tecnologías Utilizadas

- HTML5: Estructura semántica (header, nav, section, article, footer).
- CSS3: Flexbox, Grid Layout, Custom Properties (Variables), Media Queries.
- JavaScript (ES6): Manipulación del DOM, EventListeners, LocalStorage API.
- Librerías: tsParticles.js (para el fondo animado).
- Servicios: Formspree (Backend del formulario).

## Estructura del Proyecto

/
├── index.html              # Página Principal (Landing + Formulario)
├── Listado.html            # Galería de Proyectos (Grid)
├── Proyecto1.html          # Detalle Proyecto 1
├── Proyecto2.html          # Detalle Proyecto 2
├── README.md               # Documentación
└── Documentos/
    ├── Css/
    │   ├── estilo.css      # Estilos globales y Home
    │   ├── Listado.css     # Estilos específicos del Grid y Menú
    │   └── ...
    ├── Javascript/
    │   ├── script.js       # Lógica del Dark Mode y Menú
    │   └── ...
    └── Imagenes/           # Recursos gráficos

## Instalación y Despliegue

Este es un proyecto estático, por lo que no requiere instalación de dependencias de Node.js.

1. Clonar el repositorio:
   git clone https://github.com/itb2526-noelflorido/Portfolio.git

2. Ejecutar:
   Abrir el archivo index.html en tu navegador o utilizar la extensión Live Server de VS Code para simular un servidor local.

## Autor

- Noel - Desarrollo y Diseño
