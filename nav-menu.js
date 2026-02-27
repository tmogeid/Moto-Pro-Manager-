/**
 * NAV-MENU.JS - Sistema de menú unificado para Moto Pro Manager
 * 
 * Este script maneja:
 * 1. Menú hamburguesa (abrir/cerrar)
 * 2. Dropdown de Garaje
 * 3. Menú dinámico de Pilotos:
 *    - 1 piloto: link directo a /piloto
 *    - 2+ pilotos: sub-dropdown con cada piloto
 */

(function() {
    'use strict';

    // Estado global
    let pilotosData = [];

    /**
     * Inicializa el menú de navegación
     */
    function initNavMenu() {
        initHamburgerMenu();
        initGarajeDropdown();
        loadPilotosMenu();
    }

    /**
     * Menú hamburguesa
     */
    function initHamburgerMenu() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const navOverlay = document.getElementById('navOverlay');
        const navMobileMenu = document.getElementById('navMobileMenu');

        if (!hamburgerBtn || !navOverlay || !navMobileMenu) return;

        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navOverlay.classList.toggle('active');
            navMobileMenu.classList.toggle('active');
        });

        navOverlay.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navOverlay.classList.remove('active');
            navMobileMenu.classList.remove('active');
        });
    }

    /**
     * Dropdown de Garaje
     */
    function initGarajeDropdown() {
        const garajeToggle = document.getElementById('garajeToggle');
        const garajeDropdown = document.getElementById('garajeDropdown');

        if (!garajeToggle || !garajeDropdown) return;

        garajeToggle.addEventListener('click', () => {
            garajeDropdown.classList.toggle('show');
            garajeToggle.classList.toggle('active');
        });
    }

    /**
     * Carga los pilotos y genera el menú dinámico
     */
    async function loadPilotosMenu() {
        const container = document.getElementById('pilotosMenuContainer');
        if (!container) {
            console.warn('[NAV-MENU] No se encontró el contenedor pilotosMenuContainer');
            return;
        }

        try {
            const response = await fetch('/api/pilotos');
            if (!response.ok) {
                console.warn('[NAV-MENU] Error al cargar pilotos');
                // Mostrar link simple como fallback
                container.innerHTML = '<a href="/piloto" class="nav-mobile-link nav-mobile-sub">👤 Pilotos</a>';
                return;
            }

            pilotosData = await response.json();

            if (!Array.isArray(pilotosData)) {
                pilotosData = [];
            }

            console.log('[NAV-MENU] Pilotos cargados:', pilotosData.length);

            // Generar HTML del menú
            container.innerHTML = generatePilotosMenuHTML(pilotosData);

            // Inicializar el sub-dropdown si hay múltiples pilotos
            if (pilotosData.length > 1) {
                initPilotosSubDropdown();
            }

        } catch (error) {
            console.error('[NAV-MENU] Error:', error);
            container.innerHTML = '<a href="/piloto" class="nav-mobile-link nav-mobile-sub">👤 Pilotos</a>';
        }
    }

    /**
     * Genera el HTML del menú de pilotos
     * @param {Array} pilotos - Lista de pilotos
     * @returns {string} HTML del menú
     */
    function generatePilotosMenuHTML(pilotos) {
        if (pilotos.length === 0) {
            // Sin pilotos: link simple
            return '<a href="/piloto" class="nav-mobile-link nav-mobile-sub">👤 Pilotos</a>';
        }

        if (pilotos.length === 1) {
            // 1 piloto: link directo a la página de pilotos
            const piloto = pilotos[0];
            const media = calcularMedia(piloto);
            return `
                <a href="/piloto" class="nav-mobile-link nav-mobile-sub piloto-single-link">
                    <span class="piloto-menu-avatar">${piloto.nombre.charAt(0).toUpperCase()}</span>
                    <span class="piloto-menu-nombre">👤 ${piloto.nombre}</span>
                    <span class="piloto-menu-media">${media}</span>
                </a>
            `;
        }

        // 2+ pilotos: sub-dropdown
        let html = `
            <button class="nav-mobile-sub-toggle" id="pilotosToggle">
                👤 Pilotos
                <span class="dropdown-arrow">▼</span>
            </button>
            <div class="nav-mobile-sub-dropdown" id="pilotosSubDropdown">
        `;

        pilotos.forEach(piloto => {
            const media = calcularMedia(piloto);
            
            html += `
                <a href="/piloto?id=${piloto.id}" class="nav-mobile-link nav-mobile-sub-item">
                    <span class="piloto-menu-avatar">${piloto.nombre.charAt(0).toUpperCase()}</span>
                    <span class="piloto-menu-nombre">${piloto.nombre}</span>
                    <span class="piloto-menu-media">${media}</span>
                </a>
            `;
        });

        html += '</div>';
        return html;
    }

    /**
     * Inicializa el sub-dropdown de pilotos (para 2+ pilotos)
     */
    function initPilotosSubDropdown() {
        const pilotosToggle = document.getElementById('pilotosToggle');
        const pilotosSubDropdown = document.getElementById('pilotosSubDropdown');

        if (!pilotosToggle || !pilotosSubDropdown) return;

        pilotosToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            pilotosSubDropdown.classList.toggle('show');
            pilotosToggle.classList.toggle('active');
        });
    }

    /**
     * Calcula la media de atributos de un piloto
     * @param {Object} piloto 
     * @returns {number} Media redondeada
     */
    function calcularMedia(piloto) {
        const attrs = ['ritmo', 'concentracion', 'frenada', 'aceleracion', 
                      'tecnica', 'experiencia', 'motivacion', 'recuperacion', 
                      'agresividad', 'talento'];
        const suma = attrs.reduce((acc, attr) => acc + (piloto[attr] || 50), 0);
        return Math.round(suma / attrs.length);
    }

    // Auto-inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavMenu);
    } else {
        initNavMenu();
    }

    // Exponer función para recargar el menú si es necesario
    window.recargarMenuPilotos = loadPilotosMenu;

})();
