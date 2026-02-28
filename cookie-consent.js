// ==========================================
// SISTEMA DE CONSENTIMIENTO DE COOKIES
// Moto Pro Manager
// ==========================================

(function() {
    // Configuración
    const COOKIE_NAME = 'moto_pro_cookie_consent';
    const COOKIE_EXPIRY = 365; // días
    
    // Textos según idioma/región (por defecto español)
    const texts = {
        title: '🍪 Uso de Cookies',
        description: 'Utilizamos cookies propias únicamente para el funcionamiento del juego: mantener tu sesión iniciada y guardar tus preferencias. No compartimos ningún dato personal con terceros.',
        accept: 'Aceptar todas',
        reject: 'Solo necesarias',
        settings: 'Configurar',
        close: 'Cerrar'
    };
    
    // Comprobar si ya existe consentimiento
    function hasConsent() {
        return localStorage.getItem(COOKIE_NAME) !== null || 
               document.cookie.includes(COOKIE_NAME);
    }
    
    // Obtener consentimiento guardado
    function getConsent() {
        const local = localStorage.getItem(COOKIE_NAME);
        if (local) return local;
        
        const match = document.cookie.match(new RegExp(COOKIE_NAME + '=([^;]+)'));
        return match ? match[1] : null;
    }
    
    // Guardar consentimiento
    function saveConsent(value) {
        // Guardar en localStorage
        localStorage.setItem(COOKIE_NAME, value);
        
        // Guardar también como cookie para persistencia
        const expires = new Date();
        expires.setTime(expires.getTime() + (COOKIE_EXPIRY * 24 * 60 * 60 * 1000));
        document.cookie = `${COOKIE_NAME}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }
    
    // Crear el banner
    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <strong>${texts.title}</strong>
                    <p>${texts.description}</p>
                </div>
                <div class="cookie-buttons">
                    <button id="cookie-reject" class="cookie-btn cookie-btn-secondary">${texts.reject}</button>
                    <button id="cookie-accept" class="cookie-btn cookie-btn-primary">${texts.accept}</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
        
        // Event listeners
        document.getElementById('cookie-accept').addEventListener('click', () => {
            saveConsent('accepted');
            banner.classList.add('cookie-hidden');
            setTimeout(() => banner.remove(), 300);
        });
        
        document.getElementById('cookie-reject').addEventListener('click', () => {
            saveConsent('rejected');
            banner.classList.add('cookie-hidden');
            setTimeout(() => banner.remove(), 300);
        });
        
        // Animación de entrada
        setTimeout(() => banner.classList.add('cookie-visible'), 100);
    }
    
    // Inicializar
    function init() {
        if (!hasConsent()) {
            // Esperar a que el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createBanner);
            } else {
                createBanner();
            }
        }
    }
    
    // Ejecutar
    init();
    
    // API global para consultar estado
    window.cookieConsent = {
        hasConsent: hasConsent,
        getConsent: getConsent,
        isAccepted: () => getConsent() === 'accepted'
    };
})();
