/**
 * NAV-MENU.JS - Sistema de menú unificado para Moto Pro Manager
 * 
 * Este script maneja:
 * 1. Menú hamburguesa (abrir/cerrar)
 * 2. Dropdown de Garaje
 * 3. Enlace simple a Pilotos
 */

(function() {
    'use strict';

    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        console.log('[NAV] Inicializando menú...');
        initHamburger();
        initGaraje();
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

})();
