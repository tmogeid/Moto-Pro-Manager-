// ==========================================
// SISTEMA MULTIIDIOMA (i18n)
// Moto Pro Manager
// ==========================================

(function() {
    'use strict';

    // Idiomas disponibles
    const LANGUAGES = {
        es: { name: 'Español', flag: '🇪🇸' },
        eslat: { name: 'Español Latino', flag: '🌎' },
        en: { name: 'English', flag: '🇬🇧' },
        pt: { name: 'Português', flag: '🇧🇷' },
        ru: { name: 'Русский', flag: '🇷🇺' },
        zh: { name: '中文', flag: '🇨🇳' },
        ja: { name: '日本語', flag: '🇯🇵' },
        fr: { name: 'Français', flag: '🇫🇷' },
        it: { name: 'Italiano', flag: '🇮🇹' },
        de: { name: 'Deutsch', flag: '🇩🇪' }
    };

    // Mapeo de países a idiomas
    const COUNTRY_TO_LANG = {
        // Español España
        ES: 'es',
        // Español Latinoamérica
        MX: 'eslat', AR: 'eslat', CO: 'eslat', CL: 'eslat', PE: 'eslat', VE: 'eslat',
        EC: 'eslat', GT: 'eslat', CU: 'eslat', BO: 'eslat', DO: 'eslat', HN: 'eslat', PY: 'eslat',
        SV: 'eslat', NI: 'eslat', CR: 'eslat', PA: 'eslat', UY: 'eslat', PR: 'eslat', GQ: 'eslat',
        // Inglés
        US: 'en', GB: 'en', AU: 'en', CA: 'en', NZ: 'en', IE: 'en', ZA: 'en',
        PH: 'en', SG: 'en', IN: 'en', PK: 'en', NG: 'en', KE: 'en',
        // Portugués
        PT: 'pt', BR: 'pt', AO: 'pt', MZ: 'pt', CV: 'pt', GW: 'pt', TL: 'pt',
        // Francés
        FR: 'fr', BE: 'fr', CH: 'fr', LU: 'fr', MC: 'fr', SN: 'fr',
        CI: 'fr', ML: 'fr', BF: 'fr', NE: 'fr', CD: 'fr', MG: 'fr', CM: 'fr',
        // Alemán
        DE: 'de', AT: 'de', LI: 'de',
        // Italiano
        IT: 'it', SM: 'it', VA: 'it',
        // Ruso
        RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru', UA: 'ru', MD: 'ru',
        // Chino
        CN: 'zh', TW: 'zh', HK: 'zh',
        // Japonés
        JP: 'ja'
    };

    let currentLang = 'es';
    let translations = {};
    let detectedCountry = null;

    // Gestión de cookies
    function setCookie(name, value, days = 365) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
    }

    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }

    // Detectar país por IP
    async function detectCountryByIP() {
        try {
            // Usar ipapi.co (gratis, 1000 requests/día)
            const response = await fetch('https://ipapi.co/json/', { timeout: 3000 });
            if (response.ok) {
                const data = await response.json();
                detectedCountry = data.country_code;
                console.log('País detectado por IP:', detectedCountry);
                return detectedCountry;
            }
        } catch (error) {
            console.warn('No se pudo detectar país por IP:', error.message);
        }
        return null;
    }

    // Obtener idioma preferido del usuario logueado
    async function getUserLanguage() {
        try {
            const response = await fetch('/api/user-data', {
                credentials: 'same-origin'  // Asegurar que se envían cookies de sesión
            });
            if (response.ok) {
                const data = await response.json();
                console.log('[i18n] Idioma del perfil:', data.language);
                return data.language || null;
            } else {
                console.log('[i18n] Error obteniendo perfil:', response.status);
            }
        } catch (error) {
            console.warn('[i18n] No se pudo obtener idioma del perfil:', error.message);
        }
        return null;
    }

    // Detectar idioma inicial
    async function detectLanguage() {
        console.log('[i18n] Iniciando detección de idioma...');

        // Páginas protegidas (requieren login) - NO muestran selector de idioma
        const protectedPages = ['paddock', 'configuracion', 'piloto'];
        const currentPage = window.location.pathname.replace('/', '').replace('.html', '');
        const isProtectedPage = protectedPages.includes(currentPage);

        // 1. Si está en página protegida (logueado), PRIORIDAD: idioma de su perfil en BD
        if (isProtectedPage) {
            const userLang = await getUserLanguage();
            if (userLang && LANGUAGES[userLang]) {
                console.log('[i18n] ✓ Página protegida - Usando idioma del perfil:', userLang);
                setCookie('language', userLang);
                return userLang;
            }
        }

        // 2. Cookie guardada (fuera de sesión o fallback)
        const cookieLang = getCookie('language');
        console.log('[i18n] Cookie de idioma:', cookieLang);
        if (cookieLang && LANGUAGES[cookieLang]) {
            console.log('[i18n] ✓ Usando idioma desde cookie:', cookieLang);
            return cookieLang;
        }

        // 3. Detectar país por IP y mapear a idioma
        const country = await detectCountryByIP();
        if (country && COUNTRY_TO_LANG[country]) {
            const lang = COUNTRY_TO_LANG[country];
            if (LANGUAGES[lang]) {
                console.log('Idioma detectado por país:', country, '→', lang);
                setCookie('language', lang);
                return lang;
            }
        }

        // 4. Detectar por idioma del navegador
        const browserLang = (navigator.language || navigator.userLanguage).split('-')[0];
        if (LANGUAGES[browserLang]) {
            console.log('Idioma desde navegador:', browserLang);
            return browserLang;
        }

        // 5. Fallback: Inglés (idioma internacional)
        console.log('Idioma no detectado, usando inglés como fallback');
        return 'en';
    }

    // Cargar archivo de traducción
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`/locales/${lang}.json`);
            if (!response.ok) throw new Error(`No se pudo cargar ${lang}`);
            translations = await response.json();
            currentLang = lang;
            setCookie('language', lang);
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            return true;
        } catch (error) {
            console.error('Error cargando traducciones:', error);
            if (lang !== 'es') {
                return loadTranslations('es');
            }
            return false;
        }
    }

    // Obtener traducción por clave
    function t(key) {
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Traducción no encontrada: ${key}`);
                return key;
            }
        }

        return value;
    }

    // Aplicar traducciones al DOM
    function applyTranslations() {
        // Elementos con data-i18n (texto)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = t(key);
        });

        // Elementos con data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = t(key);
        });

        // Elementos con data-i18n-title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = t(key);
        });

        // Título de la página
        const titleKey = document.querySelector('title')?.getAttribute('data-i18n');
        if (titleKey) {
            document.title = t(titleKey);
        }
    }

    // Crear selector de idioma (solo en páginas públicas: login y registro)
    function createLanguageSelector() {
        // Solo mostrar en páginas públicas específicas
        const publicPages = ['index', 'registro_form', ''];  // '' es para index.html sin nombre
        const currentPage = window.location.pathname.replace('/', '').replace('.html', '');
        if (!publicPages.includes(currentPage)) {
            return;
        }

        const existing = document.getElementById('lang-selector');
        if (existing) return;

        const selector = document.createElement('div');
        selector.id = 'lang-selector';
        selector.className = 'lang-selector';

        const currentLangData = LANGUAGES[currentLang];

        selector.innerHTML = `
            <button type="button" class="lang-toggle" id="lang-toggle">
                <span class="lang-icon">🌐</span>
                <span class="lang-text" data-i18n="language.selector">${t('language.selector')}</span>
                <span class="lang-arrow">▼</span>
            </button>
            <div class="lang-dropdown" id="lang-dropdown">
                ${Object.entries(LANGUAGES).map(([code, data]) => `
                    <button type="button" class="lang-option ${code === currentLang ? 'active' : ''}" data-lang="${code}">
                        <span class="lang-flag">${data.flag}</span>
                        <span class="lang-name">${data.name}</span>
                    </button>
                `).join('')}
            </div>
        `;

        document.body.appendChild(selector);

        // Event listeners
        const toggle = document.getElementById('lang-toggle');
        const dropdown = document.getElementById('lang-dropdown');

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('show');
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!selector.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        // Seleccionar idioma
        dropdown.querySelectorAll('.lang-option').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                if (lang !== currentLang) {
                    await setLanguage(lang);
                }
                dropdown.classList.remove('show');
            });
        });
    }

    // Cambiar idioma y guardar
    async function setLanguage(lang) {
        if (!LANGUAGES[lang]) return false;

        await loadTranslations(lang);
        applyTranslations();
        updateSelectorText();

        // Guardar en cookie (siempre)
        setCookie('language', lang);

        // Si está logueado, guardar también en el perfil
        try {
            await fetch('/api/update-language', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language: lang })
            });
            console.log('Idioma guardado en perfil:', lang);
        } catch (error) {
            console.log('No se pudo guardar en perfil (usuario no logueado)');
        }

        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

        return true;
    }

    // Actualizar texto del selector
    function updateSelectorText() {
        const textEl = document.querySelector('.lang-text');
        if (textEl) {
            textEl.textContent = t('language.selector');
        }

        // Actualizar estado activo
        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
        });
    }

    // Inicializar
    async function init() {
        const lang = await detectLanguage();
        await loadTranslations(lang);

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                applyTranslations();
                createLanguageSelector();
            });
        } else {
            applyTranslations();
            createLanguageSelector();
        }
    }

    // Exponer funciones globalmente
    window.i18n = {
        t,
        getCurrentLang: () => currentLang,
        getLanguages: () => LANGUAGES,
        getCountry: () => detectedCountry,
        loadTranslations,
        applyTranslations,
        setLanguage,
        init
    };

    // Función global para compatibilidad
    window.setLanguage = setLanguage;

    // Auto-inicializar
    init();

})();
