// ==========================================
// CAMBIO DE FONDOS AUTOMÁTICO
// Moto Pro Manager
// ==========================================

(function() {
    // Lista de fondos disponibles (excluyendo bandera.gif)
    const fondos = [
        '/fondos/1771800718885.png',
        '/fondos/1771800265138.png',
        '/fondos/1771796951422.jpeg',
        '/fondos/1771800462851.png',
        '/fondos/1771799565365.png',
        '/fondos/1771800534805.png',
        '/fondos/1771800349724.png',
        '/fondos/1771797409622.png',
        '/fondos/1771798325187.png',
        '/fondos/1771799380960.png',
        '/fondos/1771801216968.png',
        '/fondos/1771799131878.png',
        '/fondos/1771800758746.png',
        '/fondos/1771799159683.png',
        '/fondos/1771801030727.png',
        '/fondos/1771799361061.png',
        '/fondos/1771799209798.png',
        '/fondos/1771796588458.jpeg',
        '/fondos/1771798150065.png',
        '/fondos/1771800851712.png',
        '/fondos/1771797570139.png',
        '/fondos/1771798896801.png',
        '/fondos/1771801150445.png',
        '/fondos/1771799325951.png',
        '/fondos/1771798404491.png',
        '/fondos/1771800740477.png',
        '/fondos/1771800634126.png',
        '/fondos/1771800948336.png'
    ];
    
    // Configuración
    const CAMBIO_INTERVALO = 15000; // 15 segundos
    const FADE_DURACION = 2000; // 2 segundos
    
    let indiceActual = 0;
    let fondo1, fondo2;
    let mostrandoFondo1 = true;
    
    // Crear contenedor de fondos
    function crearContenedor() {
        const container = document.createElement('div');
        container.id = 'background-container';
        container.innerHTML = `
            <div id="bg-layer-1" class="bg-layer"></div>
            <div id="bg-layer-2" class="bg-layer"></div>
        `;
        document.body.insertBefore(container, document.body.firstChild);
        
        fondo1 = document.getElementById('bg-layer-1');
        fondo2 = document.getElementById('bg-layer-2');
        
        // Establecer primer fondo
        fondo1.style.backgroundImage = `url(${fondos[0]})`;
        fondo1.style.opacity = '1';
        fondo2.style.opacity = '0';
    }
    
    // Añadir estilos dinámicamente
    function añadirEstilos() {
        const style = document.createElement('style');
        style.textContent = `
            #background-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                overflow: hidden;
            }
            .bg-layer {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                transition: opacity ${FADE_DURACION}ms ease-in-out;
            }
            #bg-layer-1 {
                background-image: url('/fondos/1771800718885.png');
            }
        `;
        document.head.appendChild(style);
    }
    
    // Obtener siguiente fondo en orden secuencial
    function siguienteFondo() {
        indiceActual = (indiceActual + 1) % fondos.length;
        return fondos[indiceActual];
    }
    
    // Cambiar fondo con fade
    function cambiarFondo() {
        const nuevoFondo = siguienteFondo();
        
        if (mostrandoFondo1) {
            // Preparar fondo2
            fondo2.style.backgroundImage = `url(${nuevoFondo})`;
            // Fade a fondo2
            fondo1.style.opacity = '0';
            fondo2.style.opacity = '1';
        } else {
            // Preparar fondo1
            fondo1.style.backgroundImage = `url(${nuevoFondo})`;
            // Fade a fondo1
            fondo2.style.opacity = '0';
            fondo1.style.opacity = '1';
        }
        
        mostrandoFondo1 = !mostrandoFondo1;
    }
    
    // Inicializar
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // Verificar que no estamos en una página sin fondo
        if (document.body.classList.contains('paddock-page') || 
            document.body.classList.contains('ad-page') ||
            document.body.classList.contains('simple-page')) {
            // Estas páginas pueden tener su propio fondo
        }
        
        añadirEstilos();
        crearContenedor();
        
        // Iniciar cambios cada 15 segundos
        setInterval(cambiarFondo, CAMBIO_INTERVALO);
    }
    
    init();
})();
