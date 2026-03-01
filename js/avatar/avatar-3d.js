/**
 * AvatarGenerator - Generador de Avatares 3D con Three.js
 * Crea avatares realistas basados en edad, peso y ID del piloto
 * 
 * Uso:
 *   const generator = new AvatarGenerator();
 *   const avatarUrl = generator.generateAvatar({ id: 1, edad: 25, peso: 70 });
 */
(function(global) {
    'use strict';

    if (typeof THREE === 'undefined') {
        console.error('Three.js debe estar cargado antes de AvatarGenerator');
        return;
    }

    class AvatarGenerator {
        constructor() {
            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.initialized = false;
        }

        /**
         * Inicializa el renderizador de Three.js
         */
        init() {
            if (this.initialized) return;

            // Crear escena
            this.scene = new THREE.Scene();
            this.scene.background = null;

            // Crear cámara ortográfica para vista frontal
            const aspect = 1;
            const frustumSize = 2.5;
            this.camera = new THREE.OrthographicCamera(
                -frustumSize * aspect / 2,
                frustumSize * aspect / 2,
                frustumSize / 2,
                -frustumSize / 2,
                0.1,
                100
            );
            this.camera.position.set(0, 0, 5);
            this.camera.lookAt(0, 0, 0);

            // Crear renderer con soporte alpha
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                preserveDrawingBuffer: true
            });
            this.renderer.setSize(200, 200);
            this.renderer.setPixelRatio(1);
            this.renderer.setClearColor(0x000000, 0);

            // Luces
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            this.scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(2, 2, 5);
            this.scene.add(directionalLight);

            const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
            backLight.position.set(-2, -2, -5);
            this.scene.add(backLight);

            this.initialized = true;
        }

        /**
         * Función determinista basada en seed
         */
        random(seed, offset = 0) {
            const x = Math.sin(seed + offset * 1000) * 10000;
            return x - Math.floor(x);
        }

        /**
         * Genera un avatar basado en las características del piloto
         * @param {Object} params - Parámetros del piloto
         * @param {number} params.id - ID del piloto (seed para consistencia)
         * @param {number} params.edad - Edad del piloto (16-50)
         * @param {number} params.peso - Peso del piloto (55-100)
         * @returns {string} Data URL de la imagen generada
         */
        generateAvatar(params) {
            if (!this.initialized) this.init();

            const { id, edad = 25, peso = 70 } = params;

            // Limpiar escena anterior (excepto luces)
            const toRemove = [];
            this.scene.traverse((child) => {
                if (child.isMesh || child.isGroup) {
                    toRemove.push(child);
                }
            });
            toRemove.forEach(obj => this.scene.remove(obj));

            const avatarGroup = new THREE.Group();
            const seed = id;

            // ===== CÁLCULOS BASADOS EN EDAD Y PESO =====

            // Ancho de cara basado en peso
            // Peso bajo (55kg): cara más delgada (0.8)
            // Peso medio (70kg): cara normal (1.0)
            // Peso alto (100kg): cara más redonda (1.2)
            const faceWidthScale = 0.8 + (peso - 55) / 90 * 0.4;

            // Calvicie basada en edad
            // Joven (<30): muy poca probabilidad
            // Adulto (30-40): algo de probabilidad
            // Mayor (40+): alta probabilidad
            const baldProbability = edad >= 45 ? 0.5 : edad >= 35 ? 0.25 : edad >= 30 ? 0.1 : 0.02;
            const isBald = this.random(seed, 3) < baldProbability;

            // Color de pelo basado en edad
            const hairColorValues = {
                black: 0x1a1a1a,
                brown: 0x4a3728,
                blonde: 0xd4a574,
                ginger: 0xc04a29,
                gray: 0x808080,
                white: 0xc0c0c0
            };

            let hairColors;
            if (edad >= 45) {
                hairColors = ['gray', 'gray', 'white', 'brown', 'black'];
            } else if (edad >= 35) {
                hairColors = ['black', 'brown', 'brown', 'gray'];
            } else {
                hairColors = ['black', 'brown', 'blonde', 'ginger', 'black', 'brown'];
            }
            const hairColorKey = hairColors[Math.floor(this.random(seed, 2) * hairColors.length)];
            const hairColor = new THREE.Color(hairColorValues[hairColorKey]);

            // Tono de piel (variación natural)
            const skinTones = [
                0xffdbb4, // Clara
                0xedb98a, // Media
                0xd08b5b, // Morena
                0x614335, // Oscura
                0xf1c27d  // Asiática clara
            ];
            const skinColor = new THREE.Color(skinTones[Math.floor(this.random(seed, 1) * skinTones.length)]);

            // Color de ojos
            const eyeColors = [0x4a3728, 0x1e90ff, 0x228b22, 0x808080, 0x000000];
            const eyeColor = new THREE.Color(eyeColors[Math.floor(this.random(seed, 4) * eyeColors.length)]);

            // Gafas basado en edad
            const glassesProbability = edad >= 40 ? 0.45 : edad >= 35 ? 0.25 : edad >= 25 ? 0.1 : 0.02;
            const hasGlasses = this.random(seed, 5) < glassesProbability;

            // ===== CREAR GEOMETRÍA =====

            // Cabeza (esfera modificada)
            const headGeometry = new THREE.SphereGeometry(1, 32, 32);
            const positions = headGeometry.attributes.position;

            for (let i = 0; i < positions.count; i++) {
                const x = positions.getX(i);
                const y = positions.getY(i);
                const z = positions.getZ(i);

                // Aplanar ligeramente la parte trasera
                if (z < -0.3) {
                    positions.setZ(i, z * 0.85);
                }

                // Ajustar ancho según peso
                positions.setX(i, x * faceWidthScale);

                // Añadir pequeña variación orgánica
                const noise = (this.random(seed, i * 0.1) - 0.5) * 0.03;
                positions.setX(i, positions.getX(i) + noise);
                positions.setY(i, y + noise);
            }
            headGeometry.computeVertexNormals();

            const headMaterial = new THREE.MeshStandardMaterial({
                color: skinColor,
                roughness: 0.7,
                metalness: 0.0
            });

            const head = new THREE.Mesh(headGeometry, headMaterial);
            avatarGroup.add(head);

            // Pelo (si no es calvo)
            if (!isBald) {
                const hairGeometry = new THREE.SphereGeometry(1.05, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55);
                const hairMaterial = new THREE.MeshStandardMaterial({
                    color: hairColor,
                    roughness: 0.9,
                    metalness: 0.0
                });

                const hair = new THREE.Mesh(hairGeometry, hairMaterial);
                hair.position.y = 0.15;

                // Pelo más fino en mayores
                if (edad >= 40) {
                    hair.scale.set(0.95, 0.85, 0.95);
                } else if (edad >= 30) {
                    hair.scale.set(0.98, 0.88, 0.98);
                } else {
                    hair.scale.set(1, 0.9, 1);
                }

                avatarGroup.add(hair);

                // Cejas
                const eyebrowGeometry = new THREE.BoxGeometry(0.15, 0.03, 0.02);
                const eyebrowMaterial = new THREE.MeshStandardMaterial({
                    color: hairColor,
                    roughness: 0.9
                });

                const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
                leftEyebrow.position.set(-0.25, 0.35, 0.88);
                leftEyebrow.rotation.z = 0.1;
                avatarGroup.add(leftEyebrow);

                const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
                rightEyebrow.position.set(0.25, 0.35, 0.88);
                rightEyebrow.rotation.z = -0.1;
                avatarGroup.add(rightEyebrow);
            }

            // Ojos
            const eyeGeometry = new THREE.SphereGeometry(0.12, 16, 16);
            const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.3
            });

            const leftEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
            leftEye.position.set(-0.25, 0.1, 0.88);
            avatarGroup.add(leftEye);

            const rightEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
            rightEye.position.set(0.25, 0.1, 0.88);
            avatarGroup.add(rightEye);

            // Pupilas
            const pupilGeometry = new THREE.SphereGeometry(0.06, 16, 16);
            const pupilMaterial = new THREE.MeshStandardMaterial({
                color: eyeColor,
                roughness: 0.5
            });

            const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
            leftPupil.position.set(-0.25, 0.1, 0.98);
            avatarGroup.add(leftPupil);

            const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
            rightPupil.position.set(0.25, 0.1, 0.98);
            avatarGroup.add(rightPupil);

            // Nariz
            const noseGeometry = new THREE.ConeGeometry(0.08, 0.2, 8);
            const noseMaterial = new THREE.MeshStandardMaterial({
                color: skinColor,
                roughness: 0.7
            });

            const nose = new THREE.Mesh(noseGeometry, noseMaterial);
            nose.position.set(0, -0.05, 0.98);
            nose.rotation.x = -Math.PI / 2;
            avatarGroup.add(nose);

            // Boca
            const mouthGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.02);
            const mouthMaterial = new THREE.MeshStandardMaterial({
                color: 0x8b4513,
                roughness: 0.8
            });

            const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
            mouth.position.set(0, -0.35, 0.92);
            avatarGroup.add(mouth);

            // Orejas
            const earGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const earMaterial = new THREE.MeshStandardMaterial({
                color: skinColor,
                roughness: 0.7
            });

            const leftEar = new THREE.Mesh(earGeometry, earMaterial);
            leftEar.position.set(-0.95, 0, 0);
            leftEar.scale.set(0.5, 1, 0.7);
            avatarGroup.add(leftEar);

            const rightEar = new THREE.Mesh(earGeometry, earMaterial);
            rightEar.position.set(0.95, 0, 0);
            rightEar.scale.set(0.5, 1, 0.7);
            avatarGroup.add(rightEar);

            // Gafas (si aplica)
            if (hasGlasses) {
                const frameMaterial = new THREE.MeshStandardMaterial({
                    color: 0x1a1a1a,
                    roughness: 0.3,
                    metalness: 0.5
                });

                // Marcos
                const frameGeometry = new THREE.TorusGeometry(0.18, 0.02, 8, 16);

                const leftFrame = new THREE.Mesh(frameGeometry, frameMaterial);
                leftFrame.position.set(-0.25, 0.1, 0.92);
                avatarGroup.add(leftFrame);

                const rightFrame = new THREE.Mesh(frameGeometry, frameMaterial);
                rightFrame.position.set(0.25, 0.1, 0.92);
                avatarGroup.add(rightFrame);

                // Puente
                const bridgeGeometry = new THREE.BoxGeometry(0.1, 0.02, 0.02);
                const bridge = new THREE.Mesh(bridgeGeometry, frameMaterial);
                bridge.position.set(0, 0.1, 0.92);
                avatarGroup.add(bridge);

                // Cristales tintados
                const lensGeometry = new THREE.CircleGeometry(0.15, 16);
                const lensMaterial = new THREE.MeshStandardMaterial({
                    color: 0x87ceeb,
                    transparent: true,
                    opacity: 0.2,
                    roughness: 0.1
                });

                const leftLens = new THREE.Mesh(lensGeometry, lensMaterial);
                leftLens.position.set(-0.25, 0.1, 0.93);
                avatarGroup.add(leftLens);

                const rightLens = new THREE.Mesh(lensGeometry, lensMaterial);
                rightLens.position.set(0.25, 0.1, 0.93);
                avatarGroup.add(rightLens);
            }

            // Cuello
            const neckGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.3, 16);
            const neckMaterial = new THREE.MeshStandardMaterial({
                color: skinColor,
                roughness: 0.7
            });

            const neck = new THREE.Mesh(neckGeometry, neckMaterial);
            neck.position.set(0, -1.1, 0);
            avatarGroup.add(neck);

            // Rotación sutil para dar vida
            avatarGroup.rotation.y = (this.random(seed, 6) - 0.5) * 0.15;

            this.scene.add(avatarGroup);

            // Renderizar
            this.renderer.render(this.scene, this.camera);

            // Obtener imagen como Data URL
            const dataUrl = this.renderer.domElement.toDataURL('image/png');

            return dataUrl;
        }

        /**
         * Limpia recursos
         */
        dispose() {
            if (this.renderer) {
                this.renderer.dispose();
            }
            if (this.scene) {
                this.scene.traverse((child) => {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(m => m.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                });
            }
            this.initialized = false;
        }
    }

    // Exportar globalmente
    global.AvatarGenerator = AvatarGenerator;

    console.log('AvatarGenerator (Three.js) cargado correctamente');

})(typeof window !== 'undefined' ? window : this);
