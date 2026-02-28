# 🏁 MOTO PRO MANAGER

Juego de gestión de motocicletas profesional con modelo de monetización ético (anti pay-to-win).

---

## 📌 INFORMACIÓN GENERAL

- **Nombre**: Moto Pro Manager
- **Tipo**: Juego de gestión de motocicletas profesional (MotoGP style)
- **Repositorio**: https://github.com/tmogeid/Moto-Pro-Manager-
- **URL producción**: https://moto-pro-manager.onrender.com

---

## 🎯 FILOSOFÍA DEL PROYECTO

### Modelo Anti Pay-to-Win

| Gratuito | VIP ($4.99/mes) |
|----------|-----------------|
| Ligas ilimitadas | Sin anuncios |
| Modo carrera completo | Estadísticas avanzadas |
| Setup y estrategia completos | 1-2 skins gratis |
| Visualización 3D/2D | Insignias exclusivas |
| Chat en carreras | Acceso beta features |

### Lo que NUNCA existirá

- ❌ Acelerar reparaciones/entrenamientos
- ❌ Mejorar pilotos instantáneamente
- ❌ Motos más rápidas por dinero
- ❌ Boosts de rendimiento
- ❌ Pilotos exclusivos de pago

---

## 🏗️ ARQUITECTURA ACTUAL

### Hosting

- **Frontend + Backend**: Render (Node.js)
- **Base de datos**: TiDB (MySQL en la nube con SSL)
- **Emails**: Brevo SMTP
- **Detección IP**: ipapi.co

### Stack Tecnológico

| Componente | Tecnología | Uso |
|------------|------------|-----|
| Backend | Node.js + Express | API REST |
| Base de datos | MySQL (TiDB) con conexión SSL | Datos persistentes |
| Sesiones | express-session + express-mysql-session (TiDB) | Autenticación |
| Autenticación | bcrypt + verificación por email | Seguridad |
| Emails | Nodemailer + Brevo | Comunicación |
| Seguridad | Google reCAPTCHA v3 | Anti-bot |
| Frontend Web | HTML + CSS + JavaScript vanilla | Gestión, menús, UI |
| Internacionalización | i18n.js (sistema propio) | 10 idiomas |
| **Frontend 3D** | **Godot 4 (WebAssembly)** | **Carreras 3D, animaciones** |

### Arquitectura Híbrida

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   WEB ACTUAL (HTML/CSS/JS)          GODOT 4 (Solo 3D)          │
│   ┌─────────────────────┐          ┌─────────────────┐         │
│   │ • Login/Registro    │          │ • Carreras 3D   │         │
│   │ • Gestión pilotos   │    ←→    │ • Animaciones   │         │
│   │ • Menús y configur  │   API    │ • Visualizaciones│        │
│   │ • Estadísticas      │          │                 │         │
│   └─────────────────────┘          └─────────────────┘         │
│                                                                │
│   Godot solo se carga en páginas de carrera                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Ventajas:**
- No reescribir todo el código existente
- Godot solo se carga donde se necesita (carreras)
- Fácil migración futura a Steam/Play Store
- Render compatible (archivos estáticos)

---

## 📂 ESTRUCTURA DE ARCHIVOS

```
moto-pro-manager/
├── server.js              # Backend principal (Express)
├── package.json           # Dependencias Node.js
├── style.css              # Estilos globales
├── logo.png               # Logo del juego
├── favicon.png            # Favicon
├── cookie-consent.js      # Sistema de consentimiento cookies (GDPR)
├── background-changer.js  # Cambio de fondos dinámico (15s, 28 imágenes)
├── js/
│   └── i18n.js            # Sistema multiidioma con detección por IP
├── locales/               # Archivos de traducción (10 idiomas)
│   ├── es.json            # Español (España)
│   ├── eslat.json         # Español Latinoamérica
│   ├── en.json            # English
│   ├── pt.json            # Português
│   ├── fr.json            # Français
│   ├── de.json            # Deutsch
│   ├── it.json            # Italiano
│   ├── ru.json            # Русский
│   ├── zh.json            # 中文
│   └── ja.json            # 日本語
├── index.html             # Página de login
├── registro_form.html     # Formulario de registro
├── paddock.html           # Panel principal del juego (responsive)
├── configuracion.html     # Página de configuración de usuario
├── piloto.html            # Página del piloto
├── forgot_password.html   # Solicitud recuperación contraseña
├── reset_password.html    # Formulario nueva contraseña
├── verificar.html         # Página de verificación
├── mensaje.html           # Página de mensajes
├── ver_anuncio.html       # Página de patrocinio
└── fondos/                # Carpeta de imágenes y fondos
```

---

## 🏍️ SISTEMAS DEL JUEGO

### Pilotos (10 Atributos)

| Atributo | Degradación por Edad |
|----------|---------------------|
| Velocidad pura | -0.5/año tras 28 |
| Consistencia | -0.3/año tras 30 |
| Frenada | -0.4/año tras 29 |
| Aceleración | -0.6/año tras 27 |
| Gestión neumáticos | -0.2/año tras 32 |
| Técnica | No baja |
| Experiencia | No baja |
| Mental | -0.5/año tras 31 |
| Recuperación | -1.0/año tras 29 |
| Valentía | -0.3/año tras 28 |

### Setup de Moto (6 Parámetros, Escala 1-99)

1. Alerón delantero
2. Altura carenado
3. Motor (mapa)
4. Frenos (reparto)
5. Transmisión
6. Suspensión

### Neumáticos Michelin (12 Compuestos)

- Extra Soft (XS)
- Soft (S)
- Medium (M)
- Hard (H)
- Wet (W)
- Extreme Wet (EW)

### Pirámide de Ligas

| Nivel | Grupos | Managers/grupo |
|-------|--------|----------------|
| MotoGP Elite | 1 | 24 |
| MotoGP | 5 | 24 |
| Moto2 | 25 | 20 |
| Moto3 | 75 | 16 |
| Rookies | 150 | 12 |
| Amateur | Ilimitados | 10 |

### Circuitos (18 actuales + 12 históricos)

**Circuitos Actuales**: Losail, Portimão, COTA, Jerez, Le Mans, Mugello, Barcelona, Sachsenring, Assen, Red Bull Ring, Silverstone, Misano, Aragón, Motegi, Phillip Island, Buriram, Sepang, Valencia.

**Circuitos Históricos**: Estoril, Istanbul Park, Laguna Seca, Indianapolis, Donington Park, Brno, Argentina, Rio, Kyalami, Nürburgring, Welkom, Shanghai.

Cada circuito tiene 5 factores únicos:
- **Abrasividad** - Desgaste de neumáticos
- **Grip natural** - Adherencia del asfalto
- **Baches** - Impacto en suspensión
- **Adelantamiento** - Zonas de slipstream
- **Factor sorpresa** - Imprevisibilidad climática

> **Calendario dinámico**: Cada temporada tiene circuitos diferentes. Nunca repites el mismo calendario.

### Clima Dinámico

- 6 estados: ☀️ Soleado, ☁️ Nublado, 🌫️ Niebla, 🌦️ Llovizna, 🌧️ Lluvia, ⛈️ Tormenta
- Evoluciona durante cada sesión
- Pronóstico con margen de error (mejora conforme se acerca la sesión)
- Impacta: grip, temperatura, visibilidad, fatiga del piloto

---

## 🎨 PERSONALIZACIÓN VISUAL

### Gratis para Todos

- ✅ Colores moto (2) - RGB completo
- ✅ Colores uniforme (2) - RGB completo
- ✅ Número moto (2-99)
- ✅ Nombre piloto

### De Pago

| Tipo | Precio |
|------|--------|
| Skins históricas MotoGP | $0.99-2.99 |
| Skins equipos oficiales | $1.99-2.99 |
| Cascos especiales | $0.49-0.99 |

**VIP**: Reciben 1-2 skins de regalo.

---

## 🏁 MODO CARRERA

### Creación de Piloto

- **Medidas físicas**: Estatura, peso, envergadura (afectan rendimiento)
- **50 puntos iniciales** para distribuir en atributos
- **Origen de carrera**: 5 opciones con bonuses únicos

### Impacto Físico

| Build | Ventajas | Desventajas |
|-------|----------|-------------|
| Piloto ligero | +Velocidad, +Aceleración | -Estabilidad, +Fatiga |
| Piloto atlético | +Estabilidad, +Control | -Velocidad punta |
| Piloto compacto | Balanceado | - |

---

## ⛽ SISTEMA DE COMBUSTIBLE

### Límites por Categoría

| Categoría | Máximo |
|-----------|--------|
| MotoGP | 24 litros |
| Moto2 | 13 litros |
| Moto3 | 11 litros |

### Masa Total

```
Masa = 157kg (moto) + Peso piloto + (Litros × 0.75kg)
```

### Estrategia

| Estrategia | Litros | Riesgo |
|------------|--------|--------|
| Mínimo | 18L | Alto |
| Estándar | 22L | Bajo |
| Seguro | 24L | Peso extra |

---

## ✅ FUNCIONALIDADES IMPLEMENTADAS

### Autenticación

- [x] Registro de usuarios con verificación por email
- [x] Login con validación de credenciales (email O username)
- [x] Recuperación de contraseña por email
- [x] Validación de contraseña robusta
- [x] Protección con reCAPTCHA v3

### Sistema de Sesiones

- [x] Sesiones guardadas en TiDB (persistentes)
- [x] Login redirige al Paddock
- [x] Logout funcional
- [x] Middleware de autenticación
- [x] API `/api/user-data`
- [x] Opción "Mantener sesión iniciada" (30 días vs 24 horas)

### Internacionalización (i18n)

- [x] **10 idiomas disponibles**
- [x] Detección automática de idioma por IP
- [x] Selector de idioma con banderas
- [x] Persistencia en cookies y perfil de usuario

### Paddock (Panel Principal)

- [x] Menú hamburguesa para TODOS los dispositivos
- [x] Menú hamburguesa con estilo (círculo rojo + icono negro, invierte al abrir)
- [x] Navegación: Paddock, Garaje, Configuración, Cerrar Sesión
- [x] Garaje con submenú: Pilotos, Moto
- [x] Información de usuario: nombre, escudería, presupuesto
- [x] Fondos dinámicos (28 imágenes, cambio cada 15s)

### Página de Pilotos

- [x] Ruta `/piloto` protegida
- [x] API `/api/piloto`
- [x] Submenú de selección de pilotos (aparece si hay más de 1)
- [x] Muestra nombre y media de atributos en el submenú
- [x] Edición de número inline (restricción 24h)
- [x] Traducciones completas en 10 idiomas

---

## 🟡 PENDIENTE - FUNCIONALIDADES DEL JUEGO

### 🔴 Prioridad ALTA - Núcleo del juego

| Funcionalidad | Estado |
|---------------|--------|
| Expandir tabla pilotos con 10 atributos | ❌ Pendiente |
| Sistema de edad y degradación | ❌ Pendiente |
| Sistema de lesiones | ❌ Pendiente |
| Página moto.html | ❌ Pendiente |
| Sistema de carreras | ❌ Pendiente |

### 🟡 Prioridad MEDIA - Expansión del juego

| Funcionalidad | Estado |
|---------------|--------|
| Clasificaciones | ❌ Pendiente |
| Mercado de fichajes | ❌ Pendiente |
| Sistema de staff | ❌ Pendiente |
| Sistema de sponsors | ❌ Pendiente |

### 🟢 Prioridad BAJA - Funcionalidades avanzadas

| Funcionalidad | Estado |
|---------------|--------|
| Godot: Circuito básico | ❌ Pendiente |
| Godot: Modelo moto 3D | ❌ Pendiente |
| Godot: Cámaras múltiples | ❌ Pendiente |
| Godot: Sonido y efectos | ❌ Pendiente |
| Sprint races | ❌ Pendiente |
| Apps móviles nativas | ❌ Pendiente |

### Plan Godot (Carreras 3D)

```
FASE 1: Infraestructura (1-2 semanas)
├── Crear carpeta /public/godot/
├── Godot vacío que muestre "Hola"
└── Verificar carga en /carrera.html

FASE 2: Godot básico (2-3 semanas)
├── Modelo 3D simple de moto
├── Circuito básico
└── Sistema de cámaras

FASE 3: Mejoras visuales (3-4 semanas)
├── Múltiples motos en pista
├── Efectos de partículas
└── Sonidos de motor

FASE 4: Expansión (opcional)
├── Circuitos reales modelados
├── Menú principal con fondo 3D
└── Animaciones de victoria
```

---

## 📊 BASE DE DATOS (Tablas)

### `users`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT UNSIGNED | ID único |
| username | VARCHAR | Nombre de usuario |
| escuderia | VARCHAR | Nombre del equipo |
| email | VARCHAR | Email del usuario |
| password | VARCHAR | Hash bcrypt |
| verification_code | VARCHAR | Token de verificación |
| is_verified | BOOLEAN | Cuenta verificada |
| reset_token | VARCHAR | Token recuperación |
| reset_expires | DATETIME | Expiración token |
| budget | INT | Presupuesto del juego |
| language | VARCHAR(5) | Preferencia de idioma |

### `pilotos` (Necesita expansión)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT | ID único |
| nombre | VARCHAR(100) | Nombre del piloto |
| numero | INT | Número de dorsal |
| numero_updated_at | DATETIME | Control edición (24h) |
| user_id | BIGINT UNSIGNED | ID del usuario propietario |
| created_at | TIMESTAMP | Fecha de creación |

### Tablas pendientes por crear

- `motos` - Motos de cada equipo
- `races` - Calendario y resultados
- `standings` - Clasificaciones
- `staff` - Personal del equipo
- `injuries` - Registro de lesiones

---

## 🔐 VARIABLES DE ENTORNO REQUERIDAS

```env
# Base de datos TiDB
DB_HOST=xxxxx.tidbcloud.com
DB_USER=xxxxxxxx
DB_PASSWORD=xxxxxxxx
DB_NAME=xxxxxxxx
DB_PORT=4000

# Email (Brevo)
EMAIL_USER=tmogeid@gmail.com
EMAIL_PASS=xxxxxxxx

# reCAPTCHA
RECAPTCHA_SECRET_KEY=xxxxxxxx

# Sesiones
SESSION_SECRET=tu-clave-secreta-muy-larga-y-segura

# Render
RENDER_EXTERNAL_HOSTNAME=moto-pro-manager.onrender.com
PORT=3000
NODE_ENV=production
```

---

## 🚀 INSTALACIÓN Y EJECUCIÓN LOCAL

```bash
# Clonar repositorio
git clone https://github.com/tmogeid/Moto-Pro-Manager-.git

# Entrar al directorio
cd Moto-Pro-Manager-

# Instalar dependencias
npm install

# Crear archivo .env con las variables de entorno

# Ejecutar servidor
npm start
```

---

## 📌 ROADMAP DE DESARROLLO

### Fase 1: Infraestructura básica ✅ COMPLETADO

- [x] Sistema de sesiones en TiDB
- [x] Redirección tras login
- [x] Logout funcional
- [x] API user-data
- [x] Middleware de autenticación
- [x] Consentimiento de cookies
- [x] Fondo dinámico

### Fase 2: UI y Paddock ✅ COMPLETADO

- [x] Paddock responsive
- [x] Página de configuración
- [x] Sistema multiidioma (10 idiomas)
- [x] Detección automática de idioma por IP

### Fase 3: Núcleo del juego ⬅️ ACTUAL

- [x] Tabla pilotos básica
- [x] Página pilotos.html
- [ ] Expandir pilotos con 10 atributos
- [ ] Sistema de edad y degradación
- [ ] Sistema de lesiones
- [ ] Página moto.html
- [ ] Sistema de setup (6 parámetros)
- [ ] Sistema de carreras

### Fase 4: Godot 3D (Carreras)

- [ ] Configurar Godot Web en Render
- [ ] Modelo 3D básico de moto
- [ ] Circuito básico (rectángulo con curvas)
- [ ] Sistema de cámaras
- [ ] Conexión con API backend
- [ ] Múltiples motos en pista
- [ ] Efectos de sonido

### Fase 5: Expansión

- [ ] Clasificaciones
- [ ] Mercado
- [ ] Staff y sponsors

### Fase 6: Avanzado

- [ ] Circuitos reales modelados
- [ ] Apps móviles (reexportar Godot)
- [ ] Sprint races

---

## 📚 DOCUMENTACIÓN DE REFERENCIA

- **CONTEXT.md**: Estado actual del proyecto
- **GAMES_REFERENCE.md**: Referencia completa de sistemas (GPRO, IGP, especificación Moto Pro Manager)

---

## 🌍 IDIOMAS SOPORTADOS

| Código | Idioma | Bandera |
|--------|--------|---------|
| `es` | Español | 🇪🇸 |
| `eslat` | Español Latino | 🌎 |
| `en` | English | 🇬🇧 |
| `pt` | Português | 🇧🇷 |
| `fr` | Français | 🇫🇷 |
| `de` | Deutsch | 🇩🇪 |
| `it` | Italiano | 🇮🇹 |
| `ru` | Русский | 🇷🇺 |
| `zh` | 中文 | 🇨🇳 |
| `ja` | 日本語 | 🇯🇵 |

---

## 📝 NOTAS IMPORTANTES

1. **reCAPTCHA Site Key** (pública): `6LcmYx0fAAAAAPV_0T0nefqy2LRMq1myiGQ7P10V`
2. **URL producción**: https://moto-pro-manager.onrender.com
3. **Keep-alive**: Ping cada 10 minutos para evitar sleep
4. **SSL obligatorio**: TiDB requiere TLSv1.2+
5. **TiDB IDs**: Saltan de 30000 en 30000 (normal en bases distribuidas)
6. **Login flexible**: Acepta email O username
7. **Setup**: Escala 1-99 (no 1-999 como GPRO)

---

*Última actualización: Febrero 2025*
