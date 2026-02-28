// Precargar fondos en segundo plano para navegación instantánea
// Verifica cuáles ya están en caché y solo descarga las faltantes
(function() {
    const fondosAPrecargar = [
        '/fondos/1771796588458.jpeg',
        '/fondos/1771796951422.jpeg',
        '/fondos/1771797409622.png',
        '/fondos/1771797570139.png',
        '/fondos/1771798150065.png',
        '/fondos/1771798325187.png',
        '/fondos/1771798404491.png',
        '/fondos/1771798896801.png',
        '/fondos/1771799131878.png',
        '/fondos/1771799159683.png',
        '/fondos/1771799209798.png',
        '/fondos/1771799325951.png',
        '/fondos/1771799361061.png',
        '/fondos/1771799380960.png',
        '/fondos/1771799565365.png',
        '/fondos/1771800265138.png',
        '/fondos/1771800349724.png',
        '/fondos/1771800462851.png',
        '/fondos/1771800534805.png',
        '/fondos/1771800634126.png',
        '/fondos/1771800718885.png',
        '/fondos/1771800740477.png',
        '/fondos/1771800758746.png',
        '/fondos/1771800851712.png',
        '/fondos/1771800948336.png',
        '/fondos/1771801030727.png',
        '/fondos/1771801150445.png',
        '/fondos/1771801216968.png',
        '/fondos/bandera.gif'
    ];
    
    // Función para verificar si una imagen ya está en caché
    function imagenEnCache(src) {
        return new Promise(function(resolve) {
            const img = new Image();
            img.src = src;
            
            if (img.complete && img.naturalHeight !== 0) {
                resolve(true);
            } else {
                const startTime = Date.now();
                img.onload = function() {
                    const loadTime = Date.now() - startTime;
                    resolve(loadTime < 50);
                };
                img.onerror = function() {
                    resolve(false);
                };
                setTimeout(function() {
                    resolve(img.complete && img.naturalHeight !== 0);
                }, 100);
            }
        });
    }
    
    // Función para precargar una imagen
    function precargarImagen(src) {
        return new Promise(function(resolve) {
            const img = new Image();
            img.onload = function() { resolve(true); };
            img.onerror = function() { resolve(false); };
            img.src = src;
        });
    }
    
    // Función principal
    async function verificarYPrecargar() {
        let enCache = 0;
        let descargadas = 0;
        let fallidas = 0;
        
        for (const src of fondosAPrecargar) {
            const yaEnCache = await imagenEnCache(src);
            
            if (yaEnCache) {
                enCache++;
            } else {
                const exito = await precargarImagen(src);
                if (exito) {
                    descargadas++;
                } else {
                    fallidas++;
                }
            }
        }
        
        console.log('📊 Fondos: ' + enCache + ' en caché, ' + descargadas + ' descargadas, ' + fallidas + ' fallidas');
    }
    
    window.addEventListener('load', function() {
        setTimeout(verificarYPrecargar, 2000);
    });
})();
