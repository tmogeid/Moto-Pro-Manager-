# CONTEXTO MOTO PRO MANAGER - Para continuar en nueva sesión

## Estado actual del proyecto

### Última actualización: Febrero 2025

---

## 🎯 DECISIONES DE DISEÑO TOMADAS

### Monetización (Modelo Ético Anti-Pay-to-Win)

| Aspecto | Decisión |
|---------|----------|
| **Contenido base** | GRATIS para todos (ligas, modo carrera, setup, etc.) |
| **Anuncios** | 30s cada 24h para no-VIP |
| **VIP** | $4.99/mes o $39.99/año |
| **Slots entrenamiento** | Asignado a pilotos contratados (no slots fijos) |
| **Chat en carrera** | Completo para todos |
| **Skins exclusivas** | VIP: 1-2 gratis. No-VIP: comprar por separado |
| **Animaciones podio** | Básicas gratis, premium VIP |
| **Insignias perfil** | Básicas gratis, exclusivas VIP |

### Precios Cosméticos

| Producto | Precio |
|----------|--------|
| Skins históricas | $0.99-2.99 |
| Animaciones victoria | $0.49-1.49 |
| Nombre equipo premium | $0.99/cambio |

### LO QUE NO EXISTE

- ❌ Acelerar reparaciones
- ❌ Mejorar piloto instantáneamente
- ❌ Motos más rápidas por dinero
- ❌ Boosts de rendimiento
- ❌ Pilotos exclusivos de pago

---

## 🏍️ SISTEMA DE PILOTOS

### Atributos (1-100)

| Atributo | Qué hace | Degradación |
|----------|----------|-------------|
| Ritmo | Mantener tiempos consistentes durante carrera | **-5/temp** tras 28 |
| Concentración | Evitar errores. `(100-C)/10 ±1` = errores/carrera | **-3/temp** tras 30 |
| Frenada | Frenar tarde, adelantar en frenada | **-4/temp** tras 29 |
| Aceleración | Salida de curvas, tracción | **-6/temp** tras 27 |
| Técnica | Feedback setup + gestión neumáticos | **No baja** |
| Experiencia | Circuitos + evitar accidentes + gestión neumáticos | **-1/temp** siempre (**-3/temp** si no corre) |
| Motivación | `Mot/10` = puntos extra a todos los atributos (excepto Téc y Exp) | **-10/temp** |
| Recuperación | Volver de lesiones antes | **-10/temp** tras 29 |
| Agresividad | Arriesgar + autonomía decisiones en carrera | **-3/temp** tras 28 |
| Talento | Primera curva, adelantamiento, bloqueo, lluvia | **-5/temp** tras 31 |

> **Nota**: Degradación por temporada (cada temporada = 1 año).
> 
> **Cambios en atributos (Febrero 2025)**:
> - ~~Velocidad pura~~ → **Ritmo** (pace de carrera, no qualy)
> - ~~Consistencia~~ → **Concentración** (fórmula: `(100-C)/10 ±1` = errores)
> - ~~Gestión neumáticos~~ → Fusionado con **Técnica** y **Experiencia**
> - ~~Mental~~ → **Motivación** (bonifica todos los atributos excepto Téc y Exp)
> - ~~Valentía~~ → **Agresividad** (incluye autonomía en decisiones)
> - **Talento** → Nuevo atributo (primera curva, adelantamiento, bloqueo, lluvia)

### Sistema de Motivación

La motivación afecta a **todos los atributos excepto Técnica y Experiencia**:
```
Bonificación = Motivación / 10 (redondeo)
Atributo efectivo = Atributo base + Bonificación
```

| Motivación | Bonificación |
|------------|--------------|
| 100 | +10 puntos |
| 80 | +8 puntos |
| 60 | +6 puntos |
| 40 | +4 puntos |
| 20 | +2 puntos |

### Sistema de Concentración

```
Porcentaje de error = 100 - Concentración
Número de errores = (Porcentaje / 10) ± 1 (redondeo)
```

| Concentración | Errores por carrera |
|---------------|---------------------|
| 90-99 | 0-2 |
| 70-89 | 1-4 |
| 50-69 | 3-6 |
| 30-49 | 5-8 |

### Curva de Vida

```
Edad 16-20: Mejora rápida (+2-5 pts)
Edad 21-26: Mejora normal (+1-3 pts)
Edad 27-30: Mejora lenta, degradación empieza
Edad 31-34: Degradación notable
Edad 35+: Degradación severa
```

### Aplicación de Degradación

- **Momento**: Solo en el cumpleaños del piloto
- **Si cumple años durante temporada**: Se pospone hasta terminar la temporada
- Se aplica una sola vez por año

### Coste Creciente de Mejora

- Mejorar de 60→61 es más barato que de 80→81
- Mejorar de 90→91 es extremadamente caro
- Aplica a todos los atributos entrenables

### Coste de Mejora por Edad

| Edad | Coste por Punto |
|------|-----------------|
| 16-20 años | 5,000 |
| 21-26 años | 10,000 |
| 27-30 años | 25,000 |
| 31-34 años | 60,000 |
| 35+ años | 150,000 (imposible mantener nivel) |

---

## 🏥 SISTEMA DE LESIONES

### Probabilidad Base de Lesión

- **Base**: 2% por carrera

### Modificadores de Probabilidad

| Factor | Modificador |
|--------|-------------|
| Valentía > 80 | +2% |
| Valentía 60-80 | +1% |
| Lluvia | +5% |
| Riesgo piloto alto | +3% |

### Gravedad de Lesiones

| Gravedad | Probabilidad | Duración | Efecto durante | Efecto permanente |
|----------|-------------|----------|----------------|-------------------|
| **Leve** | 50% | 1-2 carreras | Ninguno | No |
| **Media** | 25% | 3-6 carreras | -10% atributos | Posible -5% recuperación |
| **Grave** | 12% | 7-10 carreras | -25% atributos | Probable -15% recuperación |
| **Muy grave** | 7% | 11-15 carreras | -40% atributos | Seguro -25% recuperación |
| **Irremediable** | 3% | Retiro | - | Retiro definitivo |

### Lesión Irremediable

Cuando ocurre una lesión irremediable:
- **25% probabilidad**: Muerte por accidente
- **75% probabilidad**: Retiro por lesión permanente

```javascript
if (lesionIrremediable) {
  if (Math.random() < 0.25) {
    piloto.estado = 'fallecido';
  } else {
    piloto.estado = 'retirado_por_lesion';
  }
  piloto.activo = false;
}
```

### Sistema de Recuperación

El atributo **Recuperación (0-99)** afecta la duración de la lesión:

| Rango Recuperación | Efecto | Probabilidad Base |
|-------------------|--------|-------------------|
| **0-24** | AUMENTAR +2 semanas | 0=100%, 24=4% |
| **25-49** | AUMENTAR +1 semana | 25=100%, 49=4% |
| **50-74** | REDUCIR -1 semana | 50=4%, 74=100% |
| **75-99** | REDUCIR -2 semanas | 75=4%, 99=100% |

**Fórmula**: `Probabilidad = 100% - (puntos_en_rango × 4%)` para rangos negativos
**Fórmula**: `Probabilidad = 4% + (puntos_en_rango × 4%)` para rangos positivos

**Tabla detallada:**

| Recuperación | Probabilidad | Efecto |
|--------------|--------------|--------|
| 0 | 100% | +2 semanas |
| 12 | 52% | +2 semanas |
| 24 | 4% | +2 semanas |
| 25 | 100% | +1 semana |
| 37 | 52% | +1 semana |
| 49 | 4% | +1 semana |
| 50 | 4% | -1 semana |
| 62 | 52% | -1 semana |
| 74 | 100% | -1 semana |
| 75 | 4% | -2 semanas |
| 87 | 52% | -2 semanas |
| 99 | 100% | -2 semanas |

**Regla especial**: Las lesiones siempre duran mínimo 1 semana. Si la reducción resultaría en 0 semanas, se queda en 1.

---

## 👨‍⚕️ SISTEMA DE MÉDICOS

### Función del Médico

- Reduce efectos durante la lesión
- Reduce efectos permanentes
- Acelera recuperación

### Contratación de Médicos

| Categoría del equipo | Máximo médicos |
|---------------------|----------------|
| Amateur, Rookies, Moto3 | 1 |
| Moto2 | 1 |
| MotoGP, MotoGP Elite | 2 |

### Habilidades Especiales de Médicos

> *Las habilidades específicas se definirán en una fase posterior*

**Habilidades previstas:**
- Reducción de gravedad de lesiones
- Mejora en recuperación de atributos permanentes
- Tratamientos especiales para lesiones graves

---

## 🏋️ SISTEMA DE ENTRENAMIENTO

### Asignación por Piloto

- El entrenamiento se asigna a **pilotos contratados**
- Cada piloto puede tener **1 entrenador personal**
- Si no tiene entrenador, el entrenamiento tarda el **doble**

### Reglas de Entrenamiento

| Condición | Efecto |
|-----------|--------|
| Con entrenador | 1 carrera para completar |
| Sin entrenador | 2 carreras para completar |
| Piloto lesionado | No puede entrenar (aparece en rojo) |
| Entrenamiento en curso | No se puede modificar ni reasignar entrenador |

### Interfaz de Entrenamiento

```
┌─────────────────────────────────────────┐
│  ENTRENAMIENTO DE PILOTOS               │
├─────────────────────────────────────────┤
│  Piloto 1: Marc López                   │
│  Estado: ✅ Disponible                  │
│  Entrenador: Carlos Ruiz (Nivel 72)     │
│  Entrenamiento: [Velocidad] - 1 carrera │
├─────────────────────────────────────────┤
│  Piloto 2: Ana García                   │
│  Estado: 🔴 Lesionado (3 semanas)       │
│  Entrenador: Sin asignar                │
│  Entrenamiento: No disponible           │
└─────────────────────────────────────────┘
```

---

## 👥 SISTEMA DE PILOTOS SUPLENTES

### Modelo: Principal/Suplente con Matiz

- Cada equipo tiene **1 piloto principal** + **1-2 suplentes**
- El suplente solo corre si el principal se lesiona
- **Matiz**: El suplente puede correr en:
  - **Carreras de test** (fuera del campeonato)
  - **Wildcards** (participaciones puntuales)
  - Esto permite que no esté completamente "aparcado"

### Gestión de Suplentes

- Contratar suplentes con diferentes perfiles
- Suplente joven → ganar experiencia en tests
- Suplente veterano → seguro para lesiones

---

## 👔 MERCADO DE PERSONAL

### Tipos de Personal Disponibles

| Tipo | Función | Salario base |
|------|---------|--------------|
| **Entrenador personal** | Acelera entrenamiento de atributos | Según nivel |
| **Médico** | Reduce efectos de lesiones | Según nivel |
| **Jefe de equipo** | Bonus moral, negociación sponsors | Según nivel |
| **Ingeniero de pista** | Mejora setup base | Según nivel |
| **Preparador físico** | Reduce degradación física | Según nivel |
| **Mecánico jefe** | Fiabilidad moto, velocidad pits | Según nivel |
| **Data engineer** | Mejora feedback setup | Según nivel |
| **Fisioterapeuta** | Acelera recuperación lesiones | Según nivel |

### Salarios de Entrenadores

- **Base**: Según nivel (1-100)
- **Habilidades especiales**: Aumentan el salario
- *Las habilidades específicas se definirán más adelante*

---

## 🔧 SETUP DE MOTO

### Parámetros (Escala 1-99)

1. **Alerón delantero** - Agarre curvas lentas vs velocidad punta
2. **Altura carenado** - Estabilidad vs agilidad
3. **Motor (mapa)** - Potencia vs gestión neumáticos
4. **Frenos (reparto)** - Delantera vs trasera
5. **Transmisión** - Velocidad punta vs aceleración
6. **Suspensión** - Rígida vs blanda

### Margen de Aceptación (MA)

`MA = 45 - 0.15*Técnica - 0.05*Experiencia` (adaptada a escala 1-99)

- Piloto joven con poca técnica → MA amplio
- Piloto veterano con técnica alta → MA estrecho

---

## 🏁 SISTEMA DE CARRERAS

### Orden del Fin de Semana

```
FP1 → FP2 → FP3 → Test Invierno* → FP4 → Sprint → Q1 → Q2 → Warm Up → Carrera
```
*Test Invierno solo en carreras 1-3

### Estructura Fin de Semana

| Sesión | Laps | Coste/vuelta |
|--------|------|--------------|
| FP1-FP3 | 8 c/u | 25,000 |
| FP4 | 4 | 25,000 |
| Sprint | 5 | 40,000 |
| Q1-Q2 | 2 c/u | 50,000 |
| Warm Up | 3 | 30,000 |
| Test Invierno | 6 | 20,000 |

### Carreras Especiales

- **Sprint Race**: Antes de clasificación, 30% distancia carrera, puntos top 9 (12-9-7-6-5-4-3-2-1)
- **Test de Invierno**: 6 vueltas antes de clasificación en las 3 primeras carreras, setup se guarda

### Visualización (Toggle tiempo real)

- 3D Cámara TV
- 3D Onboard
- 2D Pájaro
- 2D Sector
- Texto/Live Timing

---

## 🏆 SISTEMA DE LIGAS

### Pirámide de Niveles

| Nivel | Grupos | Managers/grupo |
|-------|--------|----------------|
| MotoGP Elite | 1 | 24 |
| MotoGP | 5 | 24 |
| Moto2 | 25 | 20 |
| Moto3 | 75 | 16 |
| Rookies | 150 | 12 |
| Amateur | Ilimitados | 10 |

### Temporada

- 20 carreras
- 2 carreras/semana (Martes y Sábado 20:00 CET)

### Restricciones por Categoría

- Cada categoría tiene **media de atributos mínima y máxima** para contratar pilotos
- Esto evita que equipos de categorías bajas fichen pilotos estrellas
- *Rangos específicos por definir*

---

## 💻 ESTADO TÉCNICO ACTUAL

### Lo Implementado ✅

- [x] Sistema de autenticación completo
- [x] Sistema de sesiones persistentes (TiDB)
- [x] Internacionalización (10 idiomas)
- [x] Página Paddock responsive
- [x] Página Configuración
- [x] Página Pilotos completa (UI con todos los atributos)
- [x] API /api/piloto (devuelve todos los campos)
- [x] API /api/update-piloto-numero (restricción 24h)
- [x] Menú hamburguesa unificado
- [x] Menú hamburguesa con estilo (círculo rojo + icono negro, invierte al abrir)
- [x] Navegación: "Garaje" (antes "Sede") con Pilotos y Moto
- [x] Sistema de colores de atributos (6 niveles)
- [x] Cálculo de bonificaciones físicas en frontend
- [x] Interfaz de entrenamiento (UI preparada)
- [x] Submenú de selección de pilotos (si hay más de 1)

### Pendiente Inmediato ❌

- [ ] Ejecutar ALTER TABLE en TiDB para expandir pilotos
- [ ] API para crear pilotos nuevos
- [ ] Sistema de entrenamiento funcional (backend)
- [ ] Sistema de lesiones completo
- [ ] Sistema de médicos
- [ ] Mercado de personal
- [ ] Página moto.html
- [ ] Sistema de carreras
- [ ] Setup de moto (6 parámetros)

---

## 📂 ARCHIVOS PRINCIPALES

```
moto-pro-manager/
├── server.js              # Backend Express
├── paddock.html           # Panel principal
├── piloto.html            # Página pilotos
├── configuracion.html     # Config usuario
├── style.css              # Estilos globales
├── js/i18n.js             # Sistema idiomas
└── locales/*.json         # Traducciones (10 idiomas)
```

---

## 🔑 APIs DISPONIBLES

| API | Método | Descripción |
|-----|--------|-------------|
| `/api/user-data` | GET | Datos usuario logueado |
| `/api/piloto` | GET | Piloto del usuario |
| `/api/update-piloto-numero` | POST | Actualiza número (24h restricción) |
| `/api/update-account` | POST | Actualiza cuenta |
| `/api/update-language` | POST | Cambia idioma |

---

## 🎨 PERSONALIZACIÓN VISUAL

### Gratis para Todos

| Elemento | Opciones |
|----------|----------|
| Moto - Color primario | RGB completo |
| Moto - Color secundario | RGB completo |
| Moto - Número | 2-99 (si libre) |
| Uniforme piloto - 2 colores | RGB completo |
| Casco - Color base | RGB |
| Nombre piloto | Libre |

### De Pago

| Tipo | Precio |
|------|--------|
| Skins históricas MotoGP | $0.99-2.99 |
| Skins equipos oficiales | $1.99-2.99 |
| Skins especiales | $0.99-1.99 |
| Cascos especiales | $0.49-0.99 |

**VIP**: Reciben 1-2 skins de equipos oficiales gratis al suscribirse.

---

## 🎨 ESCALA DE COLORES DE ATRIBUTOS

| Rango | Color | Clase CSS | Descripción |
|-------|-------|-----------|-------------|
| 90-99 | 🟣 Morado | `legendary` | Legendario |
| 80-89 | 🔵 Azul | `excellent` | Excelente |
| 60-79 | 🟢 Verde | `good` | Bueno |
| 40-59 | 🟡 Amarillo | `average` | Medio |
| 20-39 | 🔴 Rojo | `poor` | Bajo |
| 1-19 | ⚫ Gris | `bad` | Muy bajo |

---

## 🏁 MODO CARRERA: CREACIÓN DE PILOTO

### Edad del Piloto

- **Modo Carrera**: El usuario define la edad al crear (16-18 años recomendado)
- **Modo Manager**: Se crean pilotos de varias edades inicialmente. Cada temporada entran nuevos pilotos de 16-18 años.

### Valores Iniciales de Atributos

**Modo Carrera:**
- Media según creación del piloto
- Variación aleatoria de ±10%
- Puntos extra para asignar (cantidad por definir)

**Modo Manager:**
- Valores aleatorios al crear pilotos nuevos
- Suma total dentro de un rango (por definir)
- Restricciones por categoría (media mín/máx)

### Medidas Físicas (afectan TODOS los modos)

> **⚠️ IMPORTANTE**: Las medidas físicas del piloto (estatura, peso, envergadura) afectan en **TODOS los modos de juego** (Manager y Carrera). Los cálculos son **lineales por unidad**, no por rangos.

| Medida | Rango | Impacto |
|--------|-------|---------|
| Estatura | **155-210cm** | Aerodinámica, velocidad punta, estabilidad, riesgo caída |
| Peso | **55-100kg** | Aceleración, frenada, control, fatiga |
| Envergadura | **Estatura + (-10 a +15cm)** | Control curvas, fatiga brazos |

### Fórmulas Lineales de Impacto

**ESTATURA (Base: 175cm)**
```
Velocidad punta = (175 - estatura) × 0.2 km/h
Estabilidad = (estatura - 175) × 0.08%
Riesgo caída curvas = (175 - estatura) × 0.15%
```

| Estatura | Vel. Punta | Estabilidad | Riesgo Caída |
|----------|------------|-------------|--------------|
| 155cm | +4.0 km/h | -1.6% | +3.0% |
| 165cm | +2.0 km/h | -0.8% | +1.5% |
| 175cm | 0 (base) | 0 (base) | 0% |
| 185cm | -2.0 km/h | +0.8% | -1.5% |
| 195cm | -4.0 km/h | +1.6% | -3.0% |
| 210cm | -7.0 km/h | +2.8% | -5.25% |

**PESO (Base: 70kg)**
```
Aceleración = (70 - peso) × 0.5%
Frenada = (70 - peso) × 0.3%
Control = (peso - 70) × 0.2%
Fatiga = Si <65kg: +2%/kg bajo 65 | Si >80kg: -1%/kg sobre 80
```

| Peso | Aceleración | Frenada | Control | Fatiga |
|------|-------------|---------|---------|--------|
| 55kg | +7.5% | +4.5% | -3.0% | +20% |
| 65kg | +2.5% | +1.5% | -1.0% | 0% |
| 70kg | 0 (base) | 0 (base) | 0 (base) | 0% |
| 80kg | -5.0% | -3.0% | +2.0% | -5% |
| 100kg | -15.0% | -9.0% | +6.0% | -25% |

**ENVERGADURA (Generación automática)**
```
Envergadura = Estatura + variación aleatoria (-10 a +15cm)
Base de cálculo: 170cm
Control curvas = (Envergadura - 170) × 0.15%
Fatiga brazos = (Envergadura - 170) × 0.4%
```

| Envergadura | Control Curvas | Fatiga Brazos |
|-------------|----------------|---------------|
| 155cm | -2.25% | -6% |
| 170cm | 0 (base) | 0 (base) |
| 185cm | +2.25% | +6% |
| 200cm | +4.5% | +12% |

### Balance Anti-Abuse

| Build | Ventajas | Desventajas |
|-------|----------|-------------|
| **Bajo y ligero** (155cm, 55kg) | +Vel. punta, +Aceleración, +Frenada | -Estabilidad, +Fatiga, +Caídas |
| **Alto y pesado** (210cm, 100kg) | +Estabilidad, +Control, -Fatiga | -Vel. punta, -Aceleración |
| **Balanceado** (175cm, 70kg) | Sin extremos | Sin bonuses |

---

## ⛽ SISTEMA DE COMBUSTIBLE

### Límites por Categoría

| Categoría | Máximo |
|-----------|--------|
| MotoGP | 24L |
| Moto2 | 13L |
| Moto3 | 11L |

### Estrategias

| Estrategia | Litros | Riesgo |
|------------|--------|--------|
| Mínimo | 18L | Alto (sin gas) |
| Estándar | 22L | Bajo |
| Seguro | 24L | Mínimo (peso extra) |

### Masa Total de la Moto

```
Masa = 157kg (moto) + Peso piloto + (Litros × 0.75kg) + Setup
```

---

## 📊 BASE DE DATOS (Tablas Actuales)

### `users`

| Campo | Tipo |
|-------|------|
| id | BIGINT UNSIGNED |
| username | VARCHAR |
| escuderia | VARCHAR |
| email | VARCHAR |
| password | VARCHAR (bcrypt) |
| is_verified | BOOLEAN |
| budget | INT |
| language | VARCHAR(5) |

### `pilotos` (Expandida - SQL preparado)

| Campo | Tipo | Default |
|-------|------|---------|
| id | BIGINT | AUTO |
| nombre | VARCHAR(100) | - |
| numero | INT | - |
| numero_updated_at | DATETIME | - |
| user_id | BIGINT UNSIGNED | - |
| velocidad_pura | INT | 50 |
| consistencia | INT | 50 |
| frenada | INT | 50 |
| aceleracion | INT | 50 |
| gestion_neumaticos | INT | 50 |
| tecnica | INT | 50 |
| experiencia | INT | 50 |
| mental | INT | 50 |
| recuperacion | INT | 50 |
| valentia | INT | 50 |
| estatura | INT | 170 |
| peso | INT | 68 |
| envergadura | INT | 175 |
| edad | INT | 20 |
| fecha_nacimiento | DATE | NULL |
| lesion_tipo | VARCHAR(20) | NULL |
| lesion_inicio | DATE | NULL |
| lesion_duracion | INT | 0 |
| entrenador_id | BIGINT UNSIGNED | NULL |
| entrenamiento_atributo | VARCHAR(30) | NULL |
| entrenamiento_carreras_restantes | INT | 0 |
| rol | ENUM | 'principal' |
| estado | ENUM | 'activo' |
| created_at | TIMESTAMP | - |
| updated_at | TIMESTAMP | CURRENT |

### Tablas Pendientes

- `motos`
- `races`
- `standings`
- `staff`
- `injuries`
- `entrenadores`
- `entrenamientos`
- `medicos`

---

## 🚀 PRÓXIMOS PASOS

1. **Expandir tabla pilotos** con atributos completos
2. **Crear tablas** de entrenadores, médicos, lesiones
3. **Implementar sistema de edad** y degradación
4. **Implementar sistema de lesiones**
5. **Crear mercado de personal básico**
6. **Crear página moto.html**
7. **Desarrollar sistema de setup** (6 parámetros 1-99)
8. **Implementar sistema de carreras**

---

## 📝 NOTAS IMPORTANTES

1. TiDB usa BIGINT UNSIGNED para IDs
2. Los IDs saltan de 30000 en 30000 (normal en TiDB)
3. SSL obligatorio para conexión TiDB
4. Logo actual: favicon.png
5. Menú hamburguesa visible en TODOS los dispositivos
6. Usuario pruebas: tmogeid@gmail.com (trusted para reCAPTCHA)

---

## 🗄️ SQL PARA TIDB

### Recomendación IMPORTANTE

> **TiDB requiere usar paréntesis cuando se añaden múltiples columnas en un solo ALTER TABLE.**

### SQL para expandir tabla pilotos

```sql
-- 1. Borrar pilotos existentes (opcional)
DELETE FROM pilotos;

-- 2. Añadir todas las columnas nuevas (un solo ALTER con paréntesis)
ALTER TABLE pilotos
ADD COLUMN (
    velocidad_pura INT DEFAULT 50,
    consistencia INT DEFAULT 50,
    frenada INT DEFAULT 50,
    aceleracion INT DEFAULT 50,
    gestion_neumaticos INT DEFAULT 50,
    tecnica INT DEFAULT 50,
    experiencia INT DEFAULT 50,
    mental INT DEFAULT 50,
    recuperacion INT DEFAULT 50,
    valentia INT DEFAULT 50,
    estatura INT DEFAULT 170,
    peso INT DEFAULT 68,
    envergadura INT DEFAULT 175,
    edad INT DEFAULT 20,
    fecha_nacimiento DATE,
    lesion_tipo VARCHAR(20),
    lesion_inicio DATE,
    lesion_duracion INT DEFAULT 0,
    entrenador_id BIGINT UNSIGNED DEFAULT NULL,
    entrenamiento_atributo VARCHAR(30),
    entrenamiento_carreras_restantes INT DEFAULT 0,
    rol ENUM('principal', 'suplente', 'test') DEFAULT 'principal',
    estado ENUM('activo', 'lesionado', 'fallecido', 'retirado') DEFAULT 'activo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Formato INCORRECTO (no usar en TiDB)
```sql
-- ❌ Esto NO funciona en TiDB
ALTER TABLE pilotos
ADD COLUMN velocidad_pura INT DEFAULT 50,
ADD COLUMN consistencia INT DEFAULT 50,
ADD COLUMN frenada INT DEFAULT 50;
```

### Formato CORRECTO (usar en TiDB)
```sql
-- ✅ Esto SÍ funciona en TiDB
ALTER TABLE pilotos
ADD COLUMN (
    velocidad_pura INT DEFAULT 50,
    consistencia INT DEFAULT 50,
    frenada INT DEFAULT 50
);
```

---

## 📚 DOCUMENTACIÓN

- **README.md**: Visión general del proyecto
- **GAMES_REFERENCE.md**: Referencia completa de sistemas (actualizado)
- **CONTEXT.md**: Este archivo (estado actual)

---

## 🎮 ARQUITECTURA HÍBRIDA: WEB + GODOT 4

### Decisión de Arquitectura (Febrero 2025)

Se ha decidido implementar una **arquitectura híbrida** que combina:
- **Web actual (HTML/CSS/JS)**: Para gestión, menús, configuración
- **Godot 4 (WebAssembly)**: Solo para carreras 3D y animaciones

### Ventajas del Enfoque Híbrido

| Aspecto | Beneficio |
|---------|-----------|
| No reescribir todo | Se mantiene la web actual funcionando |
| Carga más rápida | Godot solo se carga en páginas de carrera |
| Desarrollo gradual | Migración progresiva sin parar el proyecto |
| Render compatible | Godot Web son archivos estáticos |
| Flexibilidad futura | Fácil migrar a Steam/Play Store si se desea |

### Estructura de Páginas

```
NAVEGADOR
│
├── /inicio          → HTML normal (web actual)
├── /pilotos         → HTML normal
├── /mercado         → HTML normal
├── /configuracion   → HTML normal
│
└── /carrera         → HTML que incrusta Godot WASM
                         │
                         └── Godot carga solo para la carrera
```

### Arquitectura Técnica

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   WEB ACTUAL (HTML/CSS/JS)          GODOT 4 (Solo 3D)          │
│   ┌─────────────────────┐          ┌─────────────────┐         │
│   │ • Login/Registro    │          │ • Carreras 3D   │         │
│   │ • Gestión pilotos   │    ←→    │ • Animaciones   │         │
│   │ • Menús y configur  │   API    │ • Visualizaciones│        │
│   │ • Estadísticas      │          │                 │         │
│   │ • Mercado           │          │                 │         │
│   └─────────────────────┘          └─────────────────┘         │
│                                                                │
│   PÁGINAS NORMALES                 PÁGINAS CON 3D              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Implementación en Render

Estructura de archivos en producción:

```
/public
├── index.html              (web actual)
├── pilotos.html            (web actual)
├── carrera.html            (página que carga Godot)
├── godot/                  (archivos Godot exportados)
│   ├── juego.wasm          (~10-30MB)
│   ├── juego.pck
│   └── juego.js
└── assets/                 (CSS, imágenes, etc)
```

### Conexión Godot ↔ Backend

**Desde carrera.html:**
```html
<script src="/godot/juego.js"></script>
<script>
    const engine = new Engine({
        canvas: document.getElementById("godot-canvas"),
        executable: "/godot/juego",
        args: ['--user-token', getUserToken()]
    });
    engine.startGame();
</script>
```

**En Godot (GDScript):**
```gdscript
func _ready():
    # Obtener token del usuario desde la web
    var token = JavaScriptBridge.eval("getUserData()")
    
    # Cargar datos del piloto desde la API
    var http = HTTPRequest.new()
    http.request("https://tu-api.com/api/piloto",
                 ["Authorization: Bearer " + token])
```

### Características 3D Planeadas

| Característica | Fase | Descripción |
|----------------|------|-------------|
| Circuito básico | 1 | Rectángulo con curvas, vista cenital |
| Modelo moto | 1 | Moto 3D simple con animación |
| Múltiples motos | 2 | Todos los pilotos en pista |
| Cámaras múltiples | 2 | TV, helicóptero, onboard |
| Efectos clima | 3 | Lluvia, sol, niebla |
| Sonido | 3 | Motores, ambiente |
| Circuitos reales | 4 | Jerez, Mugello, etc. modelados |

### Plan de Migración Gradual

```
FASE 1: Infraestructura Godot (1-2 semanas)
├── Crear carpeta /public/godot/
├── Godot vacío que solo muestre "Hola"
├── Verificar que carga en /carrera.html
└── Configurar conexión con API

FASE 2: Godot básico para carreras (2-3 semanas)
├── Modelo 3D simple de moto
├── Circuito básico (rectángulo con curvas)
├── Sistema de cámaras
└── Conectar con datos de pilotos

FASE 3: Mejoras visuales (3-4 semanas)
├── Múltiples motos en pista
├── Efectos de partículas (polvo, humo)
├── Sonidos de motor
└── UI de carrera en Godot

FASE 4: Expansión (opcional)
├── Menú principal con fondo 3D
├── Visualización de pilotos en 3D
├── Animaciones de victoria/derrota
└── Más circuitos detallados
```

### Comparativa: Web vs Godot Web vs Nativo

| Aspecto | Web Actual | Godot Web | Godot Nativo |
|---------|------------|-----------|--------------|
| Gráficos 3D | ❌ No | ✅ Bueno | ✅ Excelente |
| Rendimiento | N/A | ~70-80% | 100% |
| Carga inicial | Instantánea | 10-50MB | Instantánea |
| Instalación | No | No | Sí |
| Actualizaciones | Inmediatas | Inmediatas | Review stores |
| Migrar a Steam | Difícil | Fácil | Ya nativo |

### Ventajas de Godot 4

- **Gratis 100%**: Sin límites de ingresos, sin royalties
- **Exporta a todas plataformas**: Web, Steam, Play Store, App Store
- **GDScript**: Fácil de aprender (similar a Python)
- **Ligero**: Editor ~100MB
- **Open Source**: Licencia MIT

---

## 📸 SISTEMA DE AVATARES DE PILOTOS

### Tipos de Avatares

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TIPOS DE AVATARES                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. PILOTOS DE JUGADOR (Creados por usuario)                       │
│     └── Godot captura la cara del modelo 3D                        │
│     └── Se guarda como imagen PNG                                  │
│                                                                     │
│  2. PILOTOS DEL MERCADO - Alto Nivel (Media > 70)                  │
│     └── Godot genera avatar único automáticamente                  │
│     └── Cada piloto es diferente                                   │
│                                                                     │
│  3. PILOTOS DEL MERCADO - Medio/Bajo Nivel (Media < 70)            │
│     └── Avatares pre-generados (pool de 500+)                      │
│     └── Asignación aleatoria, más rápido                           │
│                                                                     │
│  4. PILOTOS HISTÓRICOS (Licenciados - Futuro)                      │
│     └── Fotos reales oficiales                                     │
│     └── Si hay licencia MotoGP                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Flujo de Generación de Avatar

```
1. EDITAR PILOTO (Godot)
   ┌─────────────────┐
   │  🧑 Piloto 3D    │
   │  • Pelo: Rubio  │
   │  • Ojos: Verdes │
   │  • Piel: Media  │
   └────────┬────────┘
            │
            ▼
2. CAPTURA (Godot - Viewport)
   ┌─────────────────┐
   │  Render cara    │ → get_viewport().get_texture()
   │  256x256 px     │ → Convertir a Image
   └────────┬────────┘
            │
            ▼
3. EXPORTAR (Base64)
   ┌─────────────────┐
   │  data:image/png │ → Enviar a API
   │  ,base64,iVBOR..│
   └────────┬────────┘
            │
            ▼
4. GUARDAR (Backend)
   ┌─────────────────┐
   │  /uploads/      │ → piloto_123_avatar.png
   │  avatars/       │ → Guardar URL en DB
   └────────┬────────┘
            │
            ▼
5. MOSTRAR (Web HTML)
   ┌─────────────────┐
   │  <img src="...">│ → pilotos.html (sin Godot)
   └─────────────────┘
```

### Código Godot para Captura de Avatar

```gdscript
# avatar_generator.gd
extends Node3D

@onready var pilot_model = $PilotModel
@onready var camera = $AvatarCamera
@onready var viewport = $AvatarViewport

func capture_avatar() -> String:
    # Posicionar cámara frente a la cara
    camera.position = pilot_model.head_position + Vector3(0, 0, 0.5)
    camera.look_at(pilot_model.head_position)
    
    # Renderizar viewport
    viewport.render_target_update_mode = SubViewport.UPDATE_ONCE
    await RenderingServer.frame_post_draw
    
    # Obtener imagen
    var image = viewport.get_texture().get_image()
    image.resize(256, 256, Image.INTERPOLATE_LANCZOS)
    
    # Convertir a PNG base64
    var png_data = image.save_png_to_buffer()
    var base64_string = Marshalls.raw_to_base64(png_data)
    
    return "data:image/png;base64," + base64_string
```

### Personalizaciones que Afectan el Avatar

| Personalización | Efecto en Avatar |
|-----------------|------------------|
| Color de pelo | Se actualiza la foto |
| Estilo de pelo | Se actualiza la foto |
| Color de ojos | Se actualiza la foto |
| Tono de piel | Se actualiza la foto |
| Cicatrices | Se añaden a la foto |
| Barba | Se actualiza la foto |
| Edad (+5 años) | Arrugas sutiles |

### Momentos de Actualización de Avatar

| Momento | Automático/Manual |
|---------|-------------------|
| Crear piloto nuevo | Automático |
| Cambiar apariencia | Automático |
| Envejecer (+5 años) | Automático |
| Botón "Actualizar foto" | Manual |

---

## 🏪 SISTEMA DE MERCADO DE PILOTOS

### Generación Procedural de Pilotos

```
┌─────────────────────────────────────────────────────────────────────┐
│         PROCESO DE GENERACIÓN DE PILOTO                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. DETERMINAR CATEGORÍA                                           │
│     └── ¿Moto3, Moto2 o MotoGP?                                    │
│                                                                     │
│  2. GENERAR DATOS BÁSICOS                                          │
│     ├── Nacionalidad (según probabilidades por categoría)          │
│     ├── Nombre + Apellido (según nacionalidad)                     │
│     ├── Edad (16-35, distribución normal centrada en 22)           │
│     └── Género (95% masculino, 5% femenino)                        │
│                                                                     │
│  3. GENERAR ATRIBUTOS                                              │
│     ├── Rangos según categoría                                     │
│     │   ├── Moto3: 40-70                                           │
│     │   ├── Moto2: 50-80                                           │
│     │   └── MotoGP: 60-90                                          │
│     └── Distribución aleatoria dentro de rangos                    │
│                                                                     │
│  4. GENERAR MEDIDAS FÍSICAS                                        │
│     ├── Estatura: normal(175, 7) → 160-195cm                       │
│     ├── Peso: según estatura                                       │
│     └── Envergadura: estatura × 1.02                               │
│                                                                     │
│  5. GENERAR APARIENCIA                                             │
│     ├── Tono de piel (según región/nacionalidad)                   │
│     ├── Color de pelo                                              │
│     ├── Color de ojos                                              │
│     └── Rasgos especiales (20% probabilidad)                       │
│                                                                     │
│  6. ASIGNAR AVATAR                                                 │
│     ├── Media atributos > 70 → Avatar único (Godot)                │
│     └── Media atributos < 70 → Avatar pre-generado                 │
│                                                                     │
│  7. CALCULAR PRECIO                                                │
│     └── Según atributos, edad y potencial                          │
│                                                                     │
│  8. GUARDAR EN BASE DE DATOS                                       │
│     └── INSERT INTO pilotos (en_mercado = TRUE)                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Nombres por Nacionalidad

```javascript
const NAMES_BY_NATIONALITY = {
    spain: {
        nombres: ['Marc', 'Jorge', 'Dani', 'Álex', 'Maverick', 'Pol', 'Joan', 'Pedro'],
        apellidos: ['Márquez', 'Lorenzo', 'Pedrosa', 'Espargaró', 'Viñales', 'Mir']
    },
    italy: {
        nombres: ['Valentino', 'Francesco', 'Andrea', 'Marco', 'Danilo', 'Enea'],
        apellidos: ['Rossi', 'Bagnaia', 'Dovizioso', 'Simoncelli', 'Bastianini']
    },
    japan: {
        nombres: ['Takaaki', 'Yuki', 'Ai', 'Hiroshi', 'Tetsuta'],
        apellidos: ['Nakagami', 'Takahashi', 'Ogura', 'Aoyama']
    },
    // ... más países
};
```

### Distribución de Nacionalidades por Categoría

| Nacionalidad | MotoGP | Moto2 | Moto3 |
|--------------|--------|-------|-------|
| España | 25% | 20% | 18% |
| Italia | 20% | 18% | 15% |
| Japón | 10% | 12% | 15% |
| Francia | 8% | 8% | 7% |
| Australia | 5% | 4% | 3% |
| Alemania | 5% | 6% | 6% |
| Reino Unido | 5% | 5% | 5% |
| Brasil | 3% | 4% | 5% |
| Argentina | 2% | 3% | 4% |
| Otros | 17% | 20% | 22% |

### Avatares Pre-generados (Pool)

```
/public/assets/avatars/
├── male/
│   ├── european/
│   │   ├── face_001.png (50 variantes)
│   │   ├── face_002.png
│   │   └── ...
│   ├── latino/
│   │   └── (30 variantes)
│   ├── asian/
│   │   └── (30 variantes)
│   └── african/
│       └── (20 variantes)
├── female/
│   └── (misma estructura)
└── default.png
```

### Cálculo de Precio de Fichaje

```javascript
function calculatePrice(pilot) {
    const basePrice = 100000;
    
    // Media de atributos
    const avgAttr = (pilot.velocidad_pura + pilot.consistencia + 
                     pilot.frenada + pilot.aceleracion + 
                     pilot.gestion_neumaticos + pilot.tecnica + 
                     pilot.experiencia + pilot.mental + 
                     pilot.recuperacion + pilot.valentia) / 10;
    
    // Factor por edad (óptimo: 22-26)
    let ageFactor = 1;
    if (pilot.edad >= 22 && pilot.edad <= 26) ageFactor = 1.3;
    else if (pilot.edad < 20) ageFactor = 0.8;
    else if (pilot.edad > 32) ageFactor = 0.6;
    
    // Factor por potencial (si tiene margen de mejora)
    const potentialFactor = pilot.edad < 25 ? 1.2 : 1.0;
    
    // Precio final
    return Math.round(basePrice * (avgAttr / 50) * ageFactor * potentialFactor);
}
```

---

## 📊 BASE DE DATOS - AVATARES Y MERCADO

### Campos Adicionales para Tabla `pilotos`

```sql
ALTER TABLE pilotos
ADD COLUMN (
    -- Mercado
    en_mercado BOOLEAN DEFAULT FALSE,
    precio_fichaje INT DEFAULT 0,
    categoria ENUM('amateur', 'rookies', 'moto3', 'moto2', 'motogp') DEFAULT 'amateur',
    
    -- Nacionalidad y género
    nacionalidad VARCHAR(3) DEFAULT 'ESP',
    genero ENUM('masculino', 'femenino') DEFAULT 'masculino',
    
    -- Avatar
    avatar_url VARCHAR(255) DEFAULT '/img/default_avatar.png',
    
    -- Apariencia (para generación Godot)
    pelo_color VARCHAR(20) DEFAULT 'moreno',
    pelo_estilo VARCHAR(20) DEFAULT 'corto',
    ojos_color VARCHAR(20) DEFAULT 'marron',
    piel_tono INT DEFAULT 3,
    rasgos_especiales VARCHAR(50) DEFAULT NULL
);
```

### Tabla de Nacionalidades

```sql
CREATE TABLE nacionalidades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    codigo VARCHAR(3) NOT NULL UNIQUE,
    region VARCHAR(20) NOT NULL,  -- european, latino, asian, etc.
    probabilidad_moto3 DECIMAL(5,2),
    probabilidad_moto2 DECIMAL(5,2),
    probabilidad_motogp DECIMAL(5,2)
);

INSERT INTO nacionalidades (nombre, codigo, region, probabilidad_motogp) VALUES
('España', 'ESP', 'european', 25.0),
('Italia', 'ITA', 'european', 20.0),
('Japón', 'JPN', 'asian', 10.0),
('Francia', 'FRA', 'european', 8.0),
('Australia', 'AUS', 'oceanian', 5.0),
('Alemania', 'GER', 'european', 5.0),
('Reino Unido', 'GBR', 'european', 5.0),
('Brasil', 'BRA', 'latino', 3.0),
('Argentina', 'ARG', 'latino', 2.0),
('Estados Unidos', 'USA', 'north_american', 2.0),
('Portugal', 'POR', 'european', 3.0),
('Otros', 'OTH', 'various', 12.0);
```

---

## 🔌 APIs DEL MERCADO

### Listar Pilotos del Mercado

```javascript
// GET /api/mercado/pilotos?categoria=motogp&ordenar=media
app.get('/api/mercado/pilotos', isAuthenticated, async (req, res) => {
    const { categoria, edad_min, edad_max, ordenar } = req.query;
    
    let query = `
        SELECT id, nombre, numero, edad, nacionalidad,
               velocidad_pura, consistencia, frenada, aceleracion,
               gestion_neumaticos, tecnica, experiencia, mental,
               recuperacion, valentia,
               (velocidad_pura + consistencia + frenada + aceleracion +
                gestion_neumaticos + tecnica + experiencia + mental +
                recuperacion + valentia) / 10 as media,
               avatar_url, precio_fichaje
        FROM pilotos
        WHERE en_mercado = TRUE
    `;
    
    if (categoria) query += ` AND categoria = ?`;
    if (edad_min) query += ` AND edad >= ?`;
    if (edad_max) query += ` AND edad <= ?`;
    query += ` ORDER BY ${ordenar || 'media'} DESC`;
    
    const [pilots] = await pool.query(query, [categoria, edad_min, edad_max].filter(Boolean));
    res.json(pilots);
});
```

### Fichar Piloto

```javascript
// POST /api/mercado/fichar
app.post('/api/mercado/fichar', isAuthenticated, async (req, res) => {
    const { piloto_id } = req.body;
    const userId = req.session.user.id;
    
    // Verificar presupuesto
    const [pilot] = await pool.query('SELECT * FROM pilotos WHERE id = ?', [piloto_id]);
    const [user] = await pool.query('SELECT budget FROM users WHERE id = ?', [userId]);
    
    if (user[0].budget < pilot[0].precio_fichaje) {
        return res.status(400).json({ error: 'Presupuesto insuficiente' });
    }
    
    // Realizar fichaje
    await pool.query('UPDATE users SET budget = budget - ? WHERE id = ?',
                     [pilot[0].precio_fichaje, userId]);
    await pool.query('UPDATE pilotos SET user_id = ?, en_mercado = FALSE WHERE id = ?',
                     [userId, piloto_id]);
    
    res.json({ success: true, nuevo_budget: user[0].budget - pilot[0].precio_fichaje });
});
```

### Guardar Avatar

```javascript
// POST /api/piloto/avatar
app.post('/api/piloto/avatar', isAuthenticated, async (req, res) => {
    const { avatar } = req.body; // base64 image
    const userId = req.session.user.id;
    
    // Decodificar base64
    const base64Data = avatar.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Guardar archivo
    const filename = `avatar_${userId}_${Date.now()}.png`;
    const filepath = path.join(__dirname, 'public', 'uploads', 'avatars', filename);
    fs.writeFileSync(filepath, buffer);
    
    // Actualizar DB
    await pool.query('UPDATE pilotos SET avatar_url = ? WHERE user_id = ?',
                     [`/uploads/avatars/${filename}`, userId]);
    
    res.json({ success: true, avatar_url: `/uploads/avatars/${filename}` });
});
```

---

*Última actualización: Febrero 2025*
