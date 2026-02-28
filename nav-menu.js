/**
 * NAV-MENU.JS - Sistema de menú unificado para Moto Pro Manager
 * 
 * Este script maneja:
 * 1. Menú hamburguesa (abrir/cerrar)
 * 2. Dropdown de Garaje
 * 3. Menú de Pilotos SIEMPRE como sub-dropdown desplegable
 */

(function() {
    'use strict';

    let pilotosData = [];

    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        console.log('[NAV] Inicializando menú...');
        initHamburger();
        initGaraje();
        loadPilotos();
    }

    /**
     * Menú hamburguesa principal
     */
    function initHamburger() {
        const btn = document.getElementById('hamburgerBtn');
        const overlay = document.getElementById('navOverlay');
        const menu = document.getElementById('navMobileMenu');

        if (!btn || !overlay || !menu) {
            console.warn('[NAV] Elementos de hamburger no encontrados');
            return;
        }

        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            overlay.classList.toggle('active');
            menu.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            btn.classList.remove('active');
            overlay.classList.remove('active');
            menu.classList.remove('active');
        });

        console.log('[NAV] Hamburger inicializado');
    }

    /**
     * Dropdown de Garaje
     */
    function initGaraje() {
        const toggle = document.getElementById('garajeToggle');
        const dropdown = document.getElementById('garajeDropdown');

        if (!toggle || !dropdown) {
            console.warn('[NAV] Elementos de Garaje no encontrados');
            return;
        }

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
            toggle.classList.toggle('active');
            console.log('[NAV] Garaje toggled');
        });

        console.log('[NAV] Garaje inicializado');
    }

    /**
     * Carga pilotos y genera el sub-dropdown
     */
    async function loadPilotos() {
        const container = document.getElementById('pilotosMenuContainer');
        if (!container) {
            console.warn('[NAV] Contenedor pilotosMenuContainer no encontrado');
            return;
        }

        try {
            const res = await fetch('/api/pilotos');
            if (!res.ok) throw new Error('Error API');
            
            pilotosData = await res.json();
            if (!Array.isArray(pilotosData)) pilotosData = [];

            console.log('[NAV] Pilotos cargados:', pilotosData.length);

            // Generar menú
            container.innerHTML = generateMenu(pilotosData);

            // SIEMPRE inicializar el toggle (incluso con 1 piloto)
            initPilotosToggle();

        } catch (err) {
            console.error('[NAV] Error:', err);
            container.innerHTML = '<a href="/piloto" class="nav-mobile-link nav-mobile-sub">👤 Pilotos</a>';
        }
    }

    /**
     * Genera el HTML del menú de pilotos
     * SIEMPRE es un sub-dropdown desplegable
     */
    function generateMenu(pilotos) {
        if (pilotos.length === 0) {
            return '<a href="/piloto" class="nav-mobile-link nav-mobile-sub">👤 Pilotos</a>';
        }

        // SIEMPRE crear sub-dropdown
        let html = `
            <div class="pilotos-dropdown-wrapper">
                <button class="nav-mobile-sub-toggle" id="pilotosToggle" type="button">
                    <span>👤 Pilotos</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="nav-mobile-sub-dropdown" id="pilotosDropdown">
        `;

        pilotos.forEach(p => {
            const media = calcMedia(p);
            html += `
                <a href="/piloto?id=${p.id}" class="nav-mobile-link nav-mobile-sub-item">
                    <span class="piloto-avatar">${p.nombre.charAt(0).toUpperCase()}</span>
                    <span class="piloto-nombre">${p.nombre}</span>
                    <span class="piloto-media">${media}</span>
                </a>
            `;
        });

        html += '</div></div>';
        return html;
    }

    /**
     * Inicializa el toggle del sub-dropdown de pilotos
     */
    function initPilotosToggle() {
        // Usar setTimeout para asegurar que el DOM está listo
        setTimeout(() => {
            const toggle = document.getElementById('pilotosToggle');
            const dropdown = document.getElementById('pilotosDropdown');

            console.log('[NAV] initPilotosToggle:', { toggle: !!toggle, dropdown: !!dropdown });

            if (!toggle || !dropdown) {
                console.warn('[NAV] No se encontraron elementos del toggle de pilotos');
                return;
            }

            // Click handler
            toggle.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isOpen = dropdown.classList.contains('show');
                
                if (isOpen) {
                    dropdown.classList.remove('show');
                    toggle.classList.remove('active');
                } else {
                    dropdown.classList.add('show');
                    toggle.classList.add('active');
                }
                
                console.log('[NAV] Pilotos dropdown:', isOpen ? 'cerrado' : 'abierto');
            };

            console.log('[NAV] Toggle de pilotos inicializado correctamente');
        }, 50);
    }

    /**
     * Calcula la media de atributos
     */
    function calcMedia(piloto) {
        const attrs = ['ritmo', 'concentracion', 'frenada', 'aceleracion', 
                      'tecnica', 'experiencia', 'motivacion', 'recuperacion', 
                      'agresividad', 'talento'];
        const sum = attrs.reduce((acc, a) => acc + (piloto[a] || 50), 0);
        return Math.round(sum / attrs.length);
    }

    // Exponer para recarga manual
    window.recargarPilotosMenu = loadPilotos;

})();
