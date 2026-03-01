/**
 * Generador de Avatares 3D con Three.js
 * Crea avatares realistas basados en edad, peso y otros atributos del piloto
 */

import * as THREE from 'three';

export class AvatarGenerator {
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
        this.scene.background = new THREE.Color(0x1a1a1a);

        // Crear cámara ortográfica para vista frontal
        const aspect = 1;
        const frustumSize = 2;
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

        // Crear renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        this.renderer.setSize(256, 256);
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
     * Genera un avatar basado en las características del piloto
     * @param {Object} params - Parámetros del piloto
     * @param {number} params.id - ID del piloto (seed)
     * @param {number} params.edad - Edad del piloto (16-50)
     * @param {number} params.peso - Peso del piloto (55-100)
     * @param {number} params.estatura - Estatura del piloto (155-210)
     * @returns {string} Data URL de la imagen generada
     */
    generateAvatar(params) {
        if (!this.initialized) this.init();

        const { id, edad = 25, peso = 70, estatura = 175 } = params;

        // Limpiar escena anterior (excepto luces)
        const toRemove = [];
        this.scene.traverse((child) => {
            if (child.type === 'Mesh' || child.type === 'Group') {
                toRemove.push(child);
            }
        });
        toRemove.forEach(obj => this.scene.remove(obj));

        // Crear grupo del avatar
        const avatarGroup = new THREE.Group();

        // Determinista basado en ID
        const seed = id;
        const random = (offset = 0) => {
            const x = Math.sin(seed + offset * 1000) * 10000;
            return x - Math.floor(x);
        };

        // Calcular forma de la cara basado en peso
        // Peso bajo: cara más angular
        // Peso medio: cara normal
        // Peso alto: cara más redonda
        const faceWidthScale = 0.8 + (peso - 55) / 90 * 0.4; // 0.8 a 1.2

        // Calcular arrugas basado en edad
        const wrinkleIntensity = Math.max(0, (edad - 25) / 25); // 0 a 1

        // Color de piel basado en seed (simula diferentes etnias)
        const skinTones = [
            new THREE.Color(0xffdbb4), // Clara
            new THREE.Color(0xedb98a), // Media
            new THREE.Color(0xd08b5b), // Morena
            new THREE.Color(0x614335), // Oscura
            new THREE.Color(0xf1c27d), // Asiática clara
            new THREE.Color(0x8d5524)  // Oscura
        ];
        const skinColor = skinTones[Math.floor(random(1) * skinTones.length)];

        // Color de pelo basado en edad
        const hairColors = {
            young: [0x1a1a1a, 0x4a3728, 0xd4a574, 0xc04a29], // Negro, castaño, rubio, pelirrojo
            middle: [0x1a1a1a, 0x4a3728, 0x808080], // Negro, castaño, gris
            old: [0x808080, 0xc0c0c0, 0x4a3728]  // Gris, blanco, castaño
        };

        let hairColorSet;
        if (edad >= 45) hairColorSet = hairColors.old;
        else if (edad >= 35) hairColorSet = hairColors.middle;
        else hairColorSet = hairColors.young;

        const hairColor = new THREE.Color(hairColorSet[Math.floor(random(2) * hairColorSet.length)]);

        // Crear cabeza (esfera modificada)
        const headGeometry = new THREE.SphereGeometry(1, 32, 32);

        // Modificar vértices para forma de cara más realista
        const positions = headGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = positions.getZ(i);

            // Aplanar ligeramente la parte de atrás
            if (z < -0.3) {
                positions.setZ(i, z * 0.8);
            }

            // Ajustar ancho según peso
            positions.setX(i, x * faceWidthScale);

            // Añadir variación basada en seed
            const noise = (random(i * 0.1) - 0.5) * 0.05;
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

        // Probabilidad de calvicie basada en edad
        const baldProbability = edad >= 45 ? 0.5 : edad >= 35 ? 0.25 : 0.05;
        const isBald = random(3) < baldProbability;

        if (!isBald) {
            // Crear pelo
            const hairGeometry = new THREE.SphereGeometry(1.05, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55);

            const hairMaterial = new THREE.MeshStandardMaterial({
                color: hairColor,
                roughness: 0.9,
                metalness: 0.0
            });

            const hair = new THREE.Mesh(hairGeometry, hairMaterial);
            hair.position.y = 0.15;

            // Estilo de pelo basado en edad
            if (edad >= 40) {
                // Pelo más fino/escaso
                hair.scale.set(0.95, 0.85, 0.95);
            } else {
                // Pelo normal
                hair.scale.set(1, 0.9, 1);
            }

            avatarGroup.add(hair);

            // Añadir cejas
            const eyebrowGeometry = new THREE.BoxGeometry(0.15, 0.03, 0.02);
            const eyebrowMaterial = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.9 });

            const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
            leftEyebrow.position.set(-0.25, 0.35, 0.85);
            leftEyebrow.rotation.z = 0.1;
            avatarGroup.add(leftEyebrow);

            const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
            rightEyebrow.position.set(0.25, 0.35, 0.85);
            rightEyebrow.rotation.z = -0.1;
            avatarGroup.add(rightEyebrow);
        }

        // Crear ojos
        const eyeGeometry = new THREE.SphereGeometry(0.12, 16, 16);
        const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.3
        });

        const leftEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
        leftEye.position.set(-0.25, 0.1, 0.85);
        avatarGroup.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
        rightEye.position.set(0.25, 0.1, 0.85);
        avatarGroup.add(rightEye);

        // Pupilas
        const pupilGeometry = new THREE.SphereGeometry(0.06, 16, 16);

        // Color de ojos basado en seed
        const eyeColors = [0x4a3728, 0x1e90ff, 0x228b22, 0x808080, 0x000000];
        const eyeColor = new THREE.Color(eyeColors[Math.floor(random(4) * eyeColors.length)]);

        const pupilMaterial = new THREE.MeshStandardMaterial({
            color: eyeColor,
            roughness: 0.5
        });

        const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        leftPupil.position.set(-0.25, 0.1, 0.95);
        avatarGroup.add(leftPupil);

        const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        rightPupil.position.set(0.25, 0.1, 0.95);
        avatarGroup.add(rightPupil);

        // Nariz
        const noseGeometry = new THREE.ConeGeometry(0.08, 0.2, 8);
        const noseMaterial = new THREE.MeshStandardMaterial({
            color: skinColor,
            roughness: 0.7
        });

        const nose = new THREE.Mesh(noseGeometry, noseMaterial);
        nose.position.set(0, -0.05, 0.95);
        nose.rotation.x = -Math.PI / 2;
        avatarGroup.add(nose);

        // Boca
        const mouthGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.02);
        const mouthMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b4513,
            roughness: 0.8
        });

        const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
        mouth.position.set(0, -0.35, 0.9);
        avatarGroup.add(mouth);

        // Orejas
        const earGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const earMaterial = new THREE.MeshStandardMaterial({
            color: skinColor,
            roughness: 0.7
        });

        const leftEar = new THREE.Mesh(earGeometry, earMaterial);
        leftEar.position.set(-0.9, 0, 0);
        leftEar.scale.set(0.5, 1, 0.7);
        avatarGroup.add(leftEar);

        const rightEar = new THREE.Mesh(earGeometry, earMaterial);
        rightEar.position.set(0.9, 0, 0);
        rightEar.scale.set(0.5, 1, 0.7);
        avatarGroup.add(rightEar);

        // Probabilidad de gafas basada en edad
        const glassesProbability = edad >= 35 ? 0.4 : edad >= 25 ? 0.15 : 0.05;
        if (random(5) < glassesProbability) {
            const glassesGroup = new THREE.Group();

            // Marco de gafas
            const frameGeometry = new THREE.TorusGeometry(0.18, 0.02, 8, 16);
            const frameMaterial = new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                roughness: 0.3,
                metalness: 0.5
            });

            const leftFrame = new THREE.Mesh(frameGeometry, frameMaterial);
            leftFrame.position.set(-0.25, 0.1, 0.9);
            glassesGroup.add(leftFrame);

            const rightFrame = new THREE.Mesh(frameGeometry, frameMaterial);
            rightFrame.position.set(0.25, 0.1, 0.9);
            glassesGroup.add(rightFrame);

            // Puente
            const bridgeGeometry = new THREE.BoxGeometry(0.1, 0.02, 0.02);
            const bridge = new THREE.Mesh(bridgeGeometry, frameMaterial);
            bridge.position.set(0, 0.1, 0.9);
            glassesGroup.add(bridge);

            // Cristales
            const lensGeometry = new THREE.CircleGeometry(0.15, 16);
            const lensMaterial = new THREE.MeshStandardMaterial({
                color: 0x87ceeb,
                transparent: true,
                opacity: 0.3,
                roughness: 0.1
            });

            const leftLens = new THREE.Mesh(lensGeometry, lensMaterial);
            leftLens.position.set(-0.25, 0.1, 0.91);
            glassesGroup.add(leftLens);

            const rightLens = new THREE.Mesh(lensGeometry, lensMaterial);
            rightLens.position.set(0.25, 0.1, 0.91);
            glassesGroup.add(rightLens);

            avatarGroup.add(glassesGroup);
        }

        // Añadir cuello
        const neckGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.3, 16);
        const neckMaterial = new THREE.MeshStandardMaterial({
            color: skinColor,
            roughness: 0.7
        });

        const neck = new THREE.Mesh(neckGeometry, neckMaterial);
        neck.position.set(0, -1.1, 0);
        avatarGroup.add(neck);

        // Rotar ligeramente para dar vida
        avatarGroup.rotation.y = (random(6) - 0.5) * 0.2;

        this.scene.add(avatarGroup);

        // Renderizar
        this.renderer.render(this.scene, this.camera);

        // Obtener imagen como Data URL
        const dataUrl = this.renderer.domElement.toDataURL('image/png');

        return dataUrl;
    }

    /**
     * Genera múltiples avatares en batch
     * @param {Array} pilotsList - Lista de parámetros de pilotos
     * @returns {Array} Array de Data URLs
     */
    generateBatch(pilotsList) {
        return pilotsList.map(params => this.generateAvatar(params));
    }

    /**
     * Obtiene el canvas del renderer para incrustar directamente
     * @returns {HTMLCanvasElement}
     */
    getCanvas() {
        if (!this.initialized) this.init();
        return this.renderer.domElement;
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

// Exportar instancia singleton para uso global
export const avatarGenerator = new AvatarGenerator();
