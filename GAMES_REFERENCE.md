# 📚 REFERENCIA COMPLETA: GPRO, IGP Manager y Especificación Moto Pro Manager

Documentación detallada de sistemas de juegos de gestión de carreras para el desarrollo de Moto Pro Manager.

---

## 📊 ÍNDICE

1. [Información General](#información-general)
2. [Sistema de Pilotos y Degradación por Edad](#sistema-de-pilotos-y-degradación-por-edad)
3. [Impacto Completo de Atributos del Piloto](#-impacto-completo-de-atributos-del-piloto) ⭐ NUEVO
4. [Sistema de Lesiones](#sistema-de-lesiones-completo)
5. [Sistema de Médicos](#sistema-de-médicos)
6. [Sistema de Entrenamiento](#sistema-de-entrenamiento)
7. [Sistema de Pilotos Suplentes](#sistema-de-pilotos-suplentes)
8. [Sistema de Avatares y Apariencia](#sistema-de-avatares-y-apariencia)
9. [Mercado de Pilotos](#mercado-de-pilotos)
10. [Mercado de Personal](#mercado-de-personal)
11. [Setup de la Moto](#setup-de-la-moto)
12. [Sistema de Neumáticos](#sistema-de-neumáticos)
13. [Sistema de Combustible](#sistema-de-combustible)
14. [Masa Total de la Moto](#masa-total-de-la-moto)
15. [Medidas Físicas del Piloto (Todos los Modos)](#medidas-físicas-del-piloto-todos-los-modos)
16. [Factores de Circuito (Cada uno único)](#-factores-de-circuito-cada-uno-único)
17. [Sistema de Clima (Dinámico por Sesión)](#-sistema-de-clima-dinámico-por-sesión)
18. [Sistema de Preparación (Fin de Semana)](#sistema-de-preparación-fin-de-semana)
19. [Estrategia de Carrera](#estrategia-de-carrera)
20. [Sistema de Puntos y Divisiones](#sistema-de-puntos-y-divisiones)
21. [Economía y Personal](#economía-y-personal)
22. [Desarrollo de Moto](#desarrollo-de-moto)
23. [Sistema de Carreras y Visualización](#sistema-de-carreras-y-visualización)
24. [Monetización (Modelo Ético)](#monetización-modelo-ético)
25. [Personalización Visual](#personalización-visual)
26. [Modo Carrera: Creación de Piloto](#modo-carrera-creación-de-piloto)
27. [Impacto de Medidas Físicas](#impacto-de-medidas-físicas-en-gameplay)
28. [Sistema Anti-Frustración](#️-sistema-anti-frustración)
29. [Modo Espectador Mejorado](#-modo-espectador-mejorado)
30. [Sistema de Legado](#-sistema-de-legado-meta-juego-largo-plazo)
31. [Economía de Equilibrio](#-economía-de-equilibrio-anti-inflación)
32. [Social y Comunidad](#-social-y-comunidad)
33. [Accesibilidad](#-accesibilidad)
34. [Sincronización Técnica](#-sincronización-técnica)
35. [Monetización Ética Adicional](#-monetización-ética-adicional)
36. [Resumen: Propuesta Única](#-resumen-propuesta-única)
37. [Tecnología y Plataformas](#tecnología-y-plataformas)
38. [Hoja de Ruta](#hoja-de-ruta)
39. [Sistema de Navegación y UI](#-sistema-de-navegación-y-ui)

---

## 📋 INFORMACIÓN GENERAL

| Aspecto | IGP Manager | GPRO | Moto Pro Manager |
|---------|-------------|------|------------------|
| **Web** | igpmanager.com | gpro.net | moto-pro-manager.onrender.com |
| **Tipo** | Gestión F1 tiempo real | Gestión F1 por turnos | Gestión MotoGP tiempo real |
| **Plataformas** | Web, iOS, Android | Web, iOS, Android | Web, iOS, Android, PC |
| **Carreras** | En directo 3D | Simulación textual | 3D + 2D toggle tiempo real |
| **Temporada** | Continua | 17 carreras | 20 carreras |
| **Setup** | Básico | Profundo (1-999) | Profundo (1-99) |
| **Monetización** | Pay-to-win | Freemium | Ética (no pay-to-win) |

---

## 🏍️ SISTEMA DE PILOTOS Y DEGRADACIÓN POR EDAD

### Atributos del Piloto (1-100)

| Atributo | Descripción | Mejora con | Degradación |
|----------|-------------|------------|-------------|
| **Ritmo** | Mantener tiempos consistentes durante carrera sin hacer vueltas malas | Entrenamiento pista | **-5/temp** tras 28 |
| **Concentración** | Evitar errores. `(100-C)/10 ±1` = errores/carrera | Entrenamiento mental | **-3/temp** tras 30 |
| **Frenada** | Ganancia en frenada, adelantar frenando | Entrenamiento físico | **-4/temp** tras 29 |
| **Aceleración** | Salidas curvas, tracción | Gimnasio/pista | **-6/temp** tras 27 |
| **Técnica** | Feedback setup + gestión neumáticos | Carreras disputadas | **No baja** |
| **Experiencia** | Circuitos + evitar accidentes + gestión neumáticos | Años en categoría | **-1/temp** siempre (**-3/temp** si no corre) |
| **Motivación** | `Mot/10` = puntos extra a todos los atributos (excepto Téc y Exp) | Victorias, buen ambiente | **-10/temp** |
| **Recuperación** | Volver de lesiones antes | Centro médico | **-10/temp** tras 29 |
| **Agresividad** | Arriesgar + autonomía decisiones en carrera | Confianza, instinto | **-3/temp** tras 28 |
| **Talento** | Primera curva, adelantamiento, bloqueo, lluvia | Instinto natural | **-5/temp** tras 31 |

> **Nota**: Degradación por temporada (cada temporada = 1 año).

### Sistema de Motivación

La motivación afecta a **todos los atributos excepto Técnica y Experiencia**:

**Fórmula:**
```
Bonificación = Motivación / 10 (redondeo)
Atributo efectivo = Atributo base + Bonificación
```

| Motivación | Bonificación |
|------------|--------------|
| 100 | +10 puntos |
| 90 | +9 puntos |
| 80 | +8 puntos |
| 70 | +7 puntos |
| 60 | +6 puntos |
| 50 | +5 puntos |
| 40 | +4 puntos |
| 30 | +3 puntos |
| 20 | +2 puntos |
| 10 | +1 punto |

**Ejemplo**: Piloto con Ritmo 80 y Motivación 70 → Ritmo efectivo = 87

### Sistema de Concentración

**Fórmula de errores por carrera:**
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
| 10-29 | 7-11 |

### Curva de Vida del Piloto

```
Edad 16-20: Mejora rápida (+2-5 pts/entrenamiento)
Edad 21-26: Mejora normal (+1-3 pts)
Edad 27-30: Mejora lenta (+0.5-1 pt), degradación leve empieza
Edad 31-34: Degradación notable, cuesta mejorar
Edad 35+: Degradación severa, solo veteranos mantienen nivel
```

### Aplicación de Degradación

- **Momento**: Al final de cada temporada
- **Experiencia especial**: Si el piloto no corre ninguna carrera en la temporada → -3 puntos
- Se aplica una sola vez por temporada

### Ejemplo de Degradación

- **Piloto 25 años**, Ritmo 85. Entrena 3 semanas = sube a 87.
- **Mismo piloto a 32 años**. Mismo entrenamiento = sube a 85.5 (redondeado a 86), pero pierde 5/temporada = neto -1 (86 - 5 = 81, vs 85 original = -4 puntos neto).

### Coste Creciente de Mejora

El coste de entrenar un atributo aumenta cuanto más alto es el valor:
- Mejorar de 60 a 61 es más barato que de 80 a 81
- Mejorar de 90 a 91 es extremadamente caro
- Esto aplica a todos los atributos entrenables

### Coste de Mejora por Edad

| Edad | Coste por Punto |
|------|-----------------|
| **16-20 años** | 5,000 |
| **21-26 años** | 10,000 |
| **27-30 años** | 25,000 |
| **31-34 años** | 60,000 |
| **35+ años** | 150,000 (imposible mantener nivel) |

---

## 📊 IMPACTO COMPLETO DE ATRIBUTOS DEL PILOTO

Esta sección consolida TODOS los atributos del piloto (habilidades y físicos) con sus impactos específicos en el gameplay.

---

### 🏍️ ATRIBUTOS DE HABILIDAD (10 atributos, escala 1-100)

#### 1. RITMO

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Capacidad de extraer el máximo en una sola vuelta, pace de qualificación |
| **Afecta a** | Tiempo por vuelta en qualificación, pole position |
| **Mejora con** | Entrenamiento en pista, análisis de telemetría |
| **Degradación** | **-5/año** después de los 28 años |

| Valor | Impacto en Vuelta Rápida |
|-------|--------------------------|
| 1-19 | +2.5s a +4.0s sobre el óptimo |
| 20-39 | +1.0s a +2.5s sobre el óptimo |
| 40-59 | +0.3s a +1.0s sobre el óptimo |
| 60-79 | -0.2s a +0.3s sobre el óptimo |
| 80-89 | -0.5s a -0.2s del óptimo |
| 90-99 | -0.8s a -0.5s del óptimo |

| Factor | Modificador |
|--------|-------------|
| Ritmo > 85 | +15% probabilidad de pole |
| Ritmo < 50 | -20% tiempo en qualificación |

---

#### 2. CONCENTRACIÓN

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Capacidad de mantener foco durante TODA la carrera |
| **Afecta a** | Probabilidad de cometer errores en cualquier momento de la carrera |
| **Mejora con** | Entrenamiento mental, meditación, experiencia |
| **Degradación** | **-3/año** después de los 30 años |

**Fórmula de Errores:**
```
Porcentaje de error = 100 - Concentración
Número de errores = (Porcentaje de error / 10) ± 1  (redondeo en decimales)
```

| Concentración | % Error | Errores base | Rango de errores |
|---------------|---------|--------------|------------------|
| 90-99 | 1-10% | 0-1 | 0-2 errores |
| 80-89 | 11-20% | 1-2 | 0-3 errores |
| 70-79 | 21-30% | 2-3 | 1-4 errores |
| 60-69 | 31-40% | 3-4 | 2-5 errores |
| 50-59 | 41-50% | 4-5 | 3-6 errores |
| 40-49 | 51-60% | 5-6 | 4-7 errores |
| 30-39 | 61-70% | 6-7 | 5-8 errores |
| 20-29 | 71-80% | 7-8 | 6-9 errores |
| 10-19 | 81-90% | 8-9 | 7-10 errores |
| 1-9 | 91-99% | 9-10 | 8-11 errores |

**Cada error provoca:** Pérdida de tiempo (0.2s - 1.0s según gravedad)

| Factor | Modificador |
|--------|-------------|
| Concentración > 85 | Mínimo 0-1 error por carrera |
| Concentración < 30 | Posible abandono por error grave |

---

#### 3. FRENADA

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Ganancia de tiempo en zonas de frenada, capacidad de frenar tarde |
| **Afecta a** | Adelantamientos en frenada, tiempo en curvas lentas |
| **Mejora con** | Entrenamiento físico (piernas), práctica en pista |
| **Degradación** | **-4/año** después de los 29 años |

| Valor | Distancia de Frenada (vs óptimo) |
|-------|----------------------------------|
| 1-19 | +15% a +25% más distancia |
| 20-39 | +8% a +15% más distancia |
| 40-59 | +3% a +8% más distancia |
| 60-79 | 0% a +3% distancia |
| 80-89 | -3% a 0% distancia |
| 90-99 | -5% a -3% distancia |

| Factor | Modificador |
|--------|-------------|
| Frenada > 85 | +20% éxito en adelantamientos en frenada |
| Frenada < 50 | +15% riesgo de bloqueo/ciada en curvas lentas |
| Frenada alta + Circuito con frenadas duras (Motegi) | Bonus de hasta 0.5s/vuelta |

---

#### 4. ACELERACIÓN

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Salida de curvas, tracción, drive out |
| **Afecta a** | Tiempo en salida, recuperación en curvas lentas, velocidad en rectas |
| **Mejora con** | Gimnasio, entrenamiento en pista, control de tracción |
| **Degradación** | **-6/año** después de los 27 años (el más rápido en degradar) |

| Valor | Impacto en Salida de Curva |
|-------|---------------------------|
| 1-19 | Pérdida de 0.3s-0.5s por curva lenta |
| 20-39 | Pérdida de 0.15s-0.3s por curva lenta |
| 40-59 | Pérdida de 0.05s-0.15s por curva lenta |
| 60-79 | Neutral, sin pérdida significativa |
| 80-89 | Ganancia de 0.05s-0.1s por curva |
| 90-99 | Ganancia de 0.1s-0.2s por curva |

| Factor | Modificador |
|--------|-------------|
| Aceleración > 85 | +10% velocidad en rectas tras curva lenta |
| Aceleración < 45 | +25% riesgo de wheelie en MotoGP |
| Circuito con muchas curvas lentas (Sachsenring) | Hasta 0.8s/vuelta de diferencia |

---

#### 5. TÉCNICA

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Feedback preciso del setup + comprensión de cómo afecta al desgaste de neumáticos |
| **Afecta a** | Precisión del feedback de setup, gestión de neumáticos a través del setup |
| **Mejora con** | Carreras disputadas, años en el deporte, análisis de datos |
| **Degradación** | **NO BAJA** (solo sube con la experiencia) |

| Valor | Margen de Aceptación de Setup | Impacto en Gestión Neumáticos |
|-------|-------------------------------|-------------------------------|
| 1-19 | MA = 35 (acepta casi cualquier setup) | No entiende cómo afecta setup al desgaste |
| 20-39 | MA = 30 | Conexión básica setup-desgaste |
| 40-59 | MA = 22 | Entiende cómo el setup afecta las gomas |
| 60-79 | MA = 15 | Optimiza setup para cuidar neumáticos |
| 80-89 | MA = 8 | Setup perfecto + gestión óptima de gomas |
| 90-99 | MA = 3 (solo acepta setup perfecto) | Máxima eficiencia: vuelta rápida + neumáticos vivos |

**Fórmula del Margen de Aceptación (MA):**
```
MA = 45 - 0.15 × Técnica - 0.05 × Experiencia
```

| Factor | Modificador |
|--------|-------------|
| Técnica > 85 | Feedback preciso: "Suspensión trasera blanda = +15% desgaste neumático" |
| Técnica < 40 | Feedback vago: "La moto se siente rara" |
| Técnica alta + Experiencia alta | Encuentran setup perfecto en 2-3 vueltas |

---

#### 6. EXPERIENCIA

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Conocimiento de circuitos + evitar accidentes + gestión de neumáticos por experiencia |
| **Afecta a** | Setup inicial, decisiones estratégicas, anticipar peligros, cuándo cuidar gomas |
| **Mejora con** | Años en la categoría, carreras disputadas |
| **Degradación** | **NO BAJA** (solo sube) |

| Valor | Conocimiento Circuitos | Evitar Accidentes | Gestión Neumáticos |
|-------|------------------------|-------------------|---------------------|
| 1-19 | Desconocidos | No anticipa peligros | No sabe cuándo cuidar |
| 20-39 | Conoce los básicos | Reacciona tarde | Básica |
| 40-59 | Mayoría conocidos | Lee situaciones | Sabe cuándo conservar |
| 60-79 | Todos conocidos | Anticipa la mayoría | Gestión instintiva |
| 80-89 | Veterano, anticipa | Evita accidentes por intuición | Gestión perfecta por experiencia |
| 90-99 | Leyenda, cada curva | "Ve el futuro", nunca choca | Sabe exactamente cuándo push/care |

| Factor | Modificador |
|--------|-------------|
| Experiencia > 80 | -30% tiempo en encontrar setup correcto, -40% riesgo de accidente evitable |
| Experiencia < 30 | +20% errores en primeras visitas a circuito, +15% riesgo de accidente |
| Experiencia alta + Lluvia | -15% riesgo de error en condiciones difíciles |

---

#### 7. MOTIVACIÓN

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Ganas de ganar, recuperación tras adversidad, mantener nivel en temporada larga |
| **Afecta a** | Rendimiento tras malos resultados, intensidad en temporada larga, lucha por título |
| **Mejora con** | Victorias, buenos resultados, ambiente de equipo |
| **Degradación** | **-5/año** después de los 31 años |

| Valor | Impacto en Temporada |
|-------|----------------------|
| 1-19 | Baja motivación, rinde menos si va mal, se rinde fácil |
| 20-39 | Se frustra tras malos resultados |
| 40-59 | Normal, sube y baja con resultados |
| 60-79 | Se recupera rápido de malas carreras |
| 80-89 | Siempre motivado, no baja el nivel |
| 90-99 | "Ganador nato", motivación constante independientemente de resultados |

| Factor | Modificador |
|--------|-------------|
| Motivación > 85 | Mantiene 100% rendimiento toda la temporada |
| Motivación < 40 | -10% rendimiento tras abandono o mal resultado |
| Motivación alta + Luchando por título | +5% rendimiento en carreras clave |
| Motivación baja + Temporada mala | Posible bajada de rendimiento progresiva |

---

#### 8. RECUPERACIÓN

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Capacidad de volver de lesiones, resistencia física |
| **Afecta a** | Tiempo de recuperación de lesiones, rendimiento tras lesión |
| **Mejora con** | Centro médico, fisioterapia, preparación física |
| **Degradación** | **-10/año** después de los 29 años (la más severa) |

| Valor | Modificador de Duración de Lesión |
|-------|-----------------------------------|
| 0-24 | AUMENTA +2 semanas de lesión |
| 25-49 | AUMENTA +1 semana de lesión |
| 50-74 | REDUCE -1 semana de lesión |
| 75-99 | REDUCE -2 semanas de lesión |

| Factor | Modificador |
|--------|-------------|
| Recuperación > 85 | -50% efectos permanentes de lesiones graves |
| Recuperación < 30 | +50% duración de lesiones |
| Recuperación alta + Médico bueno | Recuperación casi instantánea de lesiones leves |

---

#### 9. AGRESIVIDAD

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Atreverse a arriesgar + tomar decisiones autónomas en carrera |
| **Afecta a** | Decisión de adelantar, autonomía en estrategia, riesgos calculados |
| **Mejora con** | Confianza, instinto natural |
| **Degradación** | **-3/año** después de los 28 años |

| Valor | Comportamiento en Carrera | Autonomía |
|-------|---------------------------|-----------|
| 1-19 | Conservador, nunca arriesga | Sigue órdenes equipo siempre |
| 20-39 | Cauteloso, arriesga solo si es seguro | Raramente decide por sí mismo |
| 40-59 | Normal, equilibrio riesgo/seguridad | Consulta decisiones importantes |
| 60-79 | Agresivo, busca adelantamientos | Toma algunas decisiones propias |
| 80-89 | Muy agresivo, primeros en frenar | Decide por sí mismo frecuentemente |
| 90-99 | "Sin miedo", adelanta en imposibles | Autonomía total, ignora equipo si es necesario |

| Factor | Modificador |
|--------|-------------|
| Agresividad > 80 | +30% éxito en adelantamientos agresivos, +2% riesgo de lesión |
| Agresividad < 40 | -20% éxito en adelantamientos, muy conservador |
| Agresividad alta + Lluvia | Riesgo de caída +10%, pero posible ganar tiempo |
| Agresividad alta | Puede ignorar órdenes de equipo (ej: "mantener posición" → ataca anyway) |

---

#### 10. TALENTO

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Capacidad natural de ejecutar maniobras, adaptarse a condiciones, leer situaciones |
| **Afecta a** | Primera curva, adelantamientos, bloqueo defensivo, adaptación a lluvia/cambios |
| **Mejora con** | Instinto natural, difícil de entrenar |
| **Degradación** | **NO BAJA** (es talento natural) |

| Valor | Primera Curva | Adelantamiento | Bloqueo | Lluvia/Cambios |
|-------|---------------|----------------|---------|----------------|
| 1-19 | Se pierde en el tráfico | Ejecuta mal | No sabe bloquear | No se adapta |
| 20-39 | Sobrevive | Básico | Defensa débil | Adaptación lenta |
| 40-59 | Posición normal | Correcto | Defiende bien | Se adapta |
| 60-79 | Buena salida | Ejecuta bien | Buen bloqueo | Buena adaptación |
| 80-89 | Gana posiciones | Maniobra perfecta | Defensa sólida | Se adapta rápido |
| 90-99 | Primera curva impecable | Adelanta en imposibles | Imposible de pasar | "Genio de la lluvia" |

| Factor | Modificador |
|--------|-------------|
| Talento > 85 | +25% éxito en primera curva, +20% éxito en adelantamientos |
| Talento > 85 + Lluvia | No pierde rendimiento en condiciones cambiantes |
| Talento < 40 | -15% éxito en adelantamientos, dificultades en primera curva |
| Talento alto + Agresividad alta | Combinación letal: decide arriesgar + ejecuta perfecto |

---

### 📏 ATRIBUTOS FÍSICOS (4 medidas)

#### 1. ESTATURA (155-210cm)

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Altura del piloto |
| **Afecta a** | Aerodinámica, velocidad punta, estabilidad, riesgo de caída |
| **Base** | 175cm = 0 bonus/penalty |

**Fórmulas (lineales, por cm):**
```
Velocidad punta = (175 - estatura) × 0.2 km/h
Estabilidad = (estatura - 175) × 0.08 %
Riesgo caída curvas rápidas = (175 - estatura) × 0.15%
```

> **Nota**: Riesgo negativo = MENOS probabilidad de caer (los altos son más estables)

| Estatura | Vel. Punta | Estabilidad | Riesgo Caída |
|----------|------------|-------------|--------------|
| 155cm | +4.0 km/h | -1.6% | **+3.0%** |
| 160cm | +3.0 km/h | -1.2% | **+2.25%** |
| 165cm | +2.0 km/h | -0.8% | **+1.5%** |
| 170cm | +1.0 km/h | -0.4% | **+0.75%** |
| 175cm | 0 (base) | 0 (base) | 0% (base) |
| 180cm | -1.0 km/h | +0.4% | **-0.75%** |
| 185cm | -2.0 km/h | +0.8% | **-1.5%** |
| 190cm | -3.0 km/h | +1.2% | **-2.25%** |
| 195cm | -4.0 km/h | +1.6% | **-3.0%** |
| 200cm | -5.0 km/h | +2.0% | **-3.75%** |
| 205cm | -6.0 km/h | +2.4% | **-4.5%** |
| 210cm | -7.0 km/h | +2.8% | **-5.25%** |

---

#### 2. PESO (55-100kg)

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Peso corporal del piloto |
| **Afecta a** | Aceleración, frenada, control, fatiga |
| **Base** | 70kg = 0 bonus/penalty |

**Fórmulas (lineales, por kg):**
```
Aceleración = (70 - peso) × 0.5%
Frenada = (70 - peso) × 0.3%
Control = (peso - 70) × 0.2%
Fatiga = Si < 65kg: +2% por kg bajo 65 | Si > 80kg: -1% por kg sobre 80
```

| Peso | Aceleración | Frenada | Control | Fatiga |
|------|-------------|---------|---------|--------|
| 55kg | +7.5% | +4.5% | -3.0% | +20% |
| 60kg | +5.0% | +3.0% | -2.0% | +10% |
| 65kg | +2.5% | +1.5% | -1.0% | 0% |
| 70kg | 0 (base) | 0 (base) | 0 (base) | 0% |
| 75kg | -2.5% | -1.5% | +1.0% | 0% |
| 80kg | -5.0% | -3.0% | +2.0% | -5% |
| 85kg | -7.5% | -4.5% | +3.0% | -10% |
| 90kg | -10.0% | -6.0% | +4.0% | -15% |
| 95kg | -12.5% | -7.5% | +5.0% | -20% |
| 100kg | -15.0% | -9.0% | +6.0% | -25% |

**Balance Anti-Abuse:**
- Pilotos <65kg: Fatiga extra en carreras largas
- Pilotos >85kg: Ventaja en estabilidad pero pierden aceleración

---

#### 3. ENVERGADURA (Variable)

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Distancia de punta a punta de los brazos extendidos |
| **Afecta a** | Control en curvas, fatiga de brazos |
| **Generación** | `Envergadura = Estatura + variación aleatoria (-10 a +15 cm)` |
| **Base** | 170cm = 0 bonus/penalty |

**Fórmulas (lineales, por cm):**
```
Control curvas = (Envergadura - 170) × 0.15%
Fatiga brazos = (Envergadura - 170) × 0.4%
```

| Envergadura | Control Curvas | Fatiga Brazos |
|-------------|----------------|---------------|
| 145cm | -3.75% | -10% |
| 155cm | -2.25% | -6% |
| 165cm | -0.75% | -2% |
| 170cm | 0 (base) | 0 (base) |
| 175cm | +0.75% | +2% |
| 185cm | +2.25% | +6% |
| 195cm | +3.75% | +10% |
| 205cm | +5.25% | +14% |
| 215cm | +6.75% | +18% |
| 225cm | +8.25% | +22% |

**Ejemplo de generación:**
- Piloto con estatura 178cm
- Variación aleatoria: +8cm
- Envergadura final: 186cm
- Control curvas: +2.4%, Fatiga brazos: +6.4%

---

#### 4. IMC (Calculado automáticamente)

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Índice de Masa Corporal |
| **Fórmula** | `IMC = peso(kg) / estatura(m)²` |
| **Afecta a** | Resistencia física, recuperación (solo si fuera de rango) |

| Rango IMC | Clasificación | Efecto |
|-----------|---------------|--------|
| < 18.5 | Bajo peso | +10% fatiga, -5% recuperación |
| 18.5 - 24.9 | Normal | 0 (base óptima) |
| 25 - 29.9 | Sobrepeso | -5% aceleración, +5% estabilidad |
| ≥ 30 | Obesidad | -15% rendimiento general (no aparece en MotoGP real) |

---

### 🧮 TABLA RESUMEN: IMPACTO DE ATRIBUTOS EN SITUACIONES

| Situación | Atributos Clave | Impacto Principal |
|-----------|-----------------|-------------------|
| **Qualificación** | Ritmo, Agresividad, Talento | Pole position, vuelta rápida |
| **Salida** | Aceleración, Talento, Agresividad | Posición en primera curva |
| **Adelantamiento** | Agresividad (decisión) + Talento (ejecución), Frenada | Éxito en maniobra |
| **Ritmo de carrera** | Concentración, Técnica+Experiencia (gestión neumáticos) | Mantener posición, evitar errores |
| **Final de carrera** | Técnica+Experiencia (neumáticos), Motivación, Físico | Atacar o defender |
| **Lluvia** | Talento, Experiencia, Agresividad | Adaptarse, evitar errores |
| **Setup** | Técnica, Experiencia | Feedback preciso, gestión neumáticos |
| **Recuperar de lesión** | Recuperación, Físico (IMC) | Volver antes |
| **Presión (última vuelta)** | Motivación, Agresividad, Talento | No fallar, dar el extra |
| **Evitar accidentes** | Experiencia, Talento | Anticipar peligros |

---

### 🧮 TABLA RESUMEN: IMPACTO FÍSICO EN CIRCUITOS

| Tipo de Circuito | Físico Ideal | Razón |
|------------------|--------------|-------|
| **Rectas largas** (Mugello, Red Bull Ring) | Bajo + ligero | Velocidad punta clave |
| **Técnico/curvas** (Jerez, Sachsenring) | Normal + envergadura media | Control en curvas |
| **Baches** (COTA, Aragón) | Peso medio-alto | Estabilidad |
| **Abrasivo** (Phillip Island, Sepang) | Cualquiera | Técnica+Experiencia más importante |
| **Calor extremo** (Sepang, Buriram) | Peso bajo-medio | Menos fatiga por calor |
| **Lluvia frecuente** (Silverstone, Assen) | Experiencia > físico | Talento clave |

---

### 🎯 BALANCE GENERAL ANTI-ABUSE

Para evitar que todos elijan "piloto perfecto":

| Build | Ventajas | Desventajas |
|-------|----------|-------------|
| **Bajo y ligero** (155cm, 55kg) | +Velocidad punta, +Aceleración, +Frenada | -Estabilidad, +Fatiga, +Riesgo caída |
| **Alto y pesado** (210cm, 100kg) | +Estabilidad, +Control, -Fatiga | -Velocidad punta, -Aceleración |
| **Balanceado** (175cm, 70kg) | Sin extremos | Sin bonuses significativos |
| **Envergadura grande** | +Control curvas | +Fatiga brazos en carreras largas |
| **Envergadura pequeña** | -Fatiga | -Control en curvas cerradas |

**Principio de diseño**: Cada elección tiene trade-offs. No existe el piloto "perfecto".

---

## 🏥 SISTEMA DE LESIONES COMPLETO

### Probabilidad Base de Lesión

- **Base**: 2% por carrera

### Modificadores de Probabilidad

| Factor | Modificador |
|--------|-------------|
| Agresividad > 80 | +2% |
| Agresividad 60-80 | +1% |
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

**Fórmula para rangos negativos**: `Probabilidad = 100% - (puntos_en_rango × 4%)`
**Fórmula para rangos positivos**: `Probabilidad = 4% + (puntos_en_rango × 4%)`

**Tabla detallada de probabilidad:**

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

- El entrenamiento se asigna a **pilotos contratados** (no hay slots fijos)
- Cada piloto puede tener **1 entrenador personal**
- Si no tiene entrenador, el entrenamiento tarda el **doble** (2 carreras)

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

## 📸 SISTEMA DE AVATARES Y APARIENCIA

### Generación de Avatares con Godot

Los avatares de los pilotos se generan automáticamente desde el modelo 3D en Godot, permitiendo que cada piloto tenga una representación visual única basada en sus características personalizadas.

### Tipos de Avatares

| Tipo | Método | Descripción |
|------|--------|-------------|
| **Pilotos de jugador** | Godot captura | Captura del modelo 3D personalizado |
| **Pilotos mercado (alto nivel)** | Godot headless | Generación automática única |
| **Pilotos mercado (bajo nivel)** | Pre-generados | Pool de 500+ avatares |
| **Pilotos históricos** | Fotos oficiales | Si hay licencia MotoGP |

### Personalizaciones que Afectan el Avatar

| Característica | Opciones | Impacto Visual |
|----------------|----------|----------------|
| **Color de pelo** | Rubio, moreno, castaño, pelirrojo, negro | Avatar se actualiza |
| **Estilo de pelo** | Corto, largo, rapado, rizado | Avatar se actualiza |
| **Color de ojos** | Marrón, azul, verde, negro | Avatar se actualiza |
| **Tono de piel** | 1-6 (escala) | Avatar se actualiza |
| **Rasgos especiales** | Cicatriz, barba, pecas | 20% probabilidad en mercado |
| **Edad** | +5 años | Arrugas sutiles automáticas |

### Flujo de Generación

```
Editar Piloto (Godot 3D)
        ↓
Viewport captura cara (256x256px)
        ↓
Convertir a PNG base64
        ↓
Enviar a API backend
        ↓
Guardar en /uploads/avatars/
        ↓
Mostrar en web con <img>
```

### Ventajas del Sistema de Avatares

- **Consistencia visual**: El modelo 3D y la foto de perfil son el mismo personaje
- **Rendimiento web**: La página de pilotos no necesita cargar Godot
- **Personalización profunda**: Cada piloto es visualmente único
- **Inmersión**: Conexión entre gestión y carreras 3D

---

## 🏪 MERCADO DE PILOTOS

### Generación Procedural

Los pilotos del mercado se generan automáticamente con atributos, nacionalidad y apariencia realistas.

### Momentos de Generación

| Evento | Cantidad | Descripción |
|--------|----------|-------------|
| Inicio de temporada | 500+ pilotos | Población inicial del mercado |
| Cada semana | 10-20 pilotos | Renovación constante |
| Piloto retirado | 1-3 pilotos | Reemplazo automático |

### Datos Generados

**Datos Básicos:**
- Nacionalidad (según distribución por categoría)
- Nombre + Apellido (según nacionalidad)
- Edad (16-35, distribución normal)
- Género (95% masculino, 5% femenino)

**Atributos por Categoría:**

| Categoría | Rango Atributos | Media Típica |
|-----------|-----------------|--------------|
| Amateur | 30-60 | 45 |
| Rookies | 40-65 | 52 |
| Moto3 | 40-70 | 55 |
| Moto2 | 50-80 | 65 |
| MotoGP | 60-90 | 75 |

**Medidas Físicas:**
- Estatura: Distribución normal (media 175cm, σ 7cm)
- Peso: Calculado según estatura
- Envergadura: Estatura × 1.02

### Distribución de Nacionalidades

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

### Cálculo de Precio de Fichaje

```
Precio = Base × (Media Atributos / 50) × Factor Edad × Factor Potencial

Factor Edad:
- 16-21: 0.8 (joven, potencial)
- 22-26: 1.3 (óptimo)
- 27-30: 1.0 (normal)
- 31-34: 0.7 (declive)
- 35+: 0.5 (veterano)

Factor Potencial:
- Edad < 25: 1.2 (margen de mejora)
- Edad ≥ 25: 1.0
```

### Ejemplo de Cálculo

```
Piloto: Marco Rossi, 23 años
Media atributos: 72
Base: 100,000

Precio = 100,000 × (72/50) × 1.3 × 1.2
Precio = 100,000 × 1.44 × 1.3 × 1.2
Precio = 224,640
```

### Pool de Avatares Pre-generados

Para pilotos de medio/bajo nivel, se usa un pool de avatares pre-generados:

```
/public/assets/avatars/
├── male/
│   ├── european/ (50 variantes)
│   ├── latino/ (30 variantes)
│   ├── asian/ (30 variantes)
│   └── african/ (20 variantes)
├── female/
│   └── (misma estructura)
└── default.png
```

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

## 🔧 SETUP DE LA MOTO

### Parámetros (Escala 1-99)

Adaptado a MotoGP (sin alas traseras como F1, pero con aero delantera):

| Parámetro | Valor Alto | Valor Bajo |
|-----------|------------|------------|
| **Alerón delantero** | Más agarre en curvas lentas | Menos resistencia, más velocidad punta |
| **Altura carenado** | Estabilidad en rectas | Agilidad en cambios de dirección |
| **Motor (mapa)** | Potencia máxima | Mejor gestión de neumáticos/batería |
| **Frenos (reparto)** | Más frenada trasera (estilo MotoGP) | Más frenada delantera |
| **Transmisión** | Velocidad punta | Aceleración salidas curvas |
| **Suspensión** | Rígida (pistas lisas) | Blanda (patas de cabra/baches) |

### Feedback del Piloto

Después de cada vuelta, el piloto comenta cada parámetro:
- "La moto se mueve mucho en frenada"
- "Necesito más agarre en salida"
- Comentarios de -3 a +3 según ajuste

### Margen de Aceptación (MA)

Cada piloto tiene un rango donde dice "está bien" pero no es óptimo:
- **Piloto joven** con poca técnica = MA amplio (difícil encontrar el óptimo)
- **Piloto veterano** con técnica alta = MA estrecho (fácil encontrar setup perfecto)

**Fórmula**: `MA = 45 - 0.15*Técnica - 0.05*Experiencia` (adaptada a escala 1-99)

### Algoritmo de Búsqueda de Setup

1. Empezar con todos los valores a 50
2. Según feedback, ajustar en el rango restante
3. Iterar hasta encontrar setup perfecto
4. Setup óptimo varía por circuito y clima

---

## 🛞 SISTEMA DE NEUMÁTICOS

### Compuestos Michelin (12 compuestos reales)

| Tipo | Código | Uso Ideal |
|------|--------|-----------|
| **Extra Soft** | XS | Q2, carrera corta, clima frío |
| **Soft** | S | Qualy, carrera estándar |
| **Medium** | M | Ronda estándar, alta degradación |
| **Hard** | H | Pistas abrasivas, calor extremo |
| **Wet** | W | Lluvia moderada |
| **Extreme Wet** | EW | Lluvia torrencial |

### Reglas de Neumáticos

- En Qualy eliges compuesto para carrera
- No puedes cambiar después (a menos que llueva)
- Cada compuesto tiene temperatura óptima de trabajo
- El desgaste varía por circuito y estilo del piloto

### Degradación

- Caída notable después del **40% de desgaste**
- Sobrecalentamiento aumenta desgaste exponencialmente
- Gestión de neumáticos = atributo clave del piloto

---

## ⛽ SISTEMA DE COMBUSTIBLE (Estrategia Clave)

### Reglas de MotoGP Aplicadas

| Categoría | Máximo Combustible |
|-----------|-------------------|
| **MotoGP** | 24 litros |
| **Moto2** | 13 litros |
| **Moto3** | 11 litros |

> **Nota**: En MotoGP real NO se permite repostar durante la carrera. El combustible que sale en la vuelta de formación es el único disponible.

### Cálculo de Consumo

| Factor | Impacto en Consumo |
|--------|-------------------|
| **Mapa motor** | Mapa 3 (ataque): +15%. Mapa 1 (ahorro): -10% |
| **Peso total** | Cada 5kg extra (piloto pesado + combustible lleno) = +2% consumo |
| **Estilo conducción** | Piloto valiente/agresivo: +5%. Conservador: -3% |
| **Circuito** | Rectas largas (Mugello): +8%. Técnico (Jerez): -5% |
| **Neumáticos** | Desgaste alto = más rueda = más consumo |

### Estrategias de Combustible

Decides litros iniciales (no puedes repostar en carrera):

| Estrategia | Litros | Vueltas posibles | Riesgo |
|------------|--------|------------------|--------|
| **Mínimo** | 18L | ~80% de carrera | Alto (quedarse sin gas) |
| **Conservador** | 20L | ~90% de carrera | Medio (ahorro obligatorio final) |
| **Estándar** | 22L | ~100% de carrera | Bajo (gestión normal) |
| **Seguro** | 24L | ~110% de carrera | Mínimo (peso extra penaliza) |

### Penalización por Exceso de Combustible

- Cada litro sobre el mínimo necesario = +0.75kg de peso
- +0.75kg = -0.1% aceleración, -0.05% velocidad punta

### Consecuencia de Quedarse Sin Combustible

- **Piloto entra a boxes** = carrera terminada (abandono)
- **O reduce a mapa mínimo** = pérdida masiva de tiempo

### Cálculo en Tiempo Real (HUD)

Durante la carrera ves:
- **Consumo instantáneo**: L/100km actual
- **Proyección**: "Quedan 8L, 6 vueltas por delante = llegas justo"
- **Alertas**: "Consumo alto - Reduce mapa o quedarás vacío en vuelta 22"
- **Recomendaciones**: "Cambiar a Mapa 1 para asegurar llegada"

### Qualy vs Carrera

| Sesión | Combustible Típico | Razón |
|--------|-------------------|--------|
| **Q1/Q2** | 3-4 litros | Mínimo peso para vuelta rápida |
| **Sprint** | 6-8 litros | Carrera corta, mínimo peso |
| **Carrera larga** | 20-24 litros | Depende de estrategia de gestión |

### Cambio de Condiciones Meteorológicas

Si empieza seco y llueve:
- Entras a cambiar neumáticos
- En MotoGP NO puedes repostar, pero sí cambiar mapa motor
- Si vas justo de gasolina, reduce mapa para llegar

---

## ⚖️ MASA TOTAL DE LA MOTO

### Fórmula Completa

```
Masa Total (kg) = 
    157kg (moto mínima reglamentaria)
    + Peso piloto (kg)
    + Litros combustible × 0.75 (densidad gasolina)
    + Setup (alerón grande = +2kg, depósito extra = +3kg)
```

### Ejemplos Prácticos

**Carrera 1: Piloto ligero, poco combustible**
- Piloto: 58kg, 168cm
- Combustible: 19 litros (14.25kg)
- Setup: Estándar (0kg extra)
- Total: 157 + 58 + 14.25 = **229.25 kg**
- Bonus: +7% aceleración, +5 km/h velocidad punta
- Riesgo: Quedarse sin gasolina en vuelta 24 de 25

**Carrera 2: Piloto pesado, combustible seguro**
- Piloto: 78kg, 188cm
- Combustible: 24 litros (18kg)
- Setup: Alerón grande (+2kg)
- Total: 157 + 78 + 18 + 2 = **255 kg**
- Penalty: -4% aceleración, -4 km/h velocidad punta
- Ventaja: Llega sobrado, puede empujar todo el tiempo

---

## 📏 MEDIDAS FÍSICAS DEL PILOTO (TODOS LOS MODOS)

> **⚠️ IMPORTANTE**: Las medidas físicas del piloto afectan en **TODOS los modos de juego** (Manager y Carrera), no solo en Modo Carrera. El peso del combustible también es un factor clave de estrategia.

### Aplicación Global

- **Modo Manager**: Al contratar un piloto, ves sus medidas físicas y cómo afectan a la moto
- **Modo Carrera**: Tú eliges tus medidas al crear el piloto

### Atributos Físicos de Todo Piloto

| Medida | Rango | Impacto en Rendimiento |
|--------|-------|------------------------|
| **Estatura** | 160-195cm | Aerodinámica, posición de conducción |
| **Peso piloto** | 55-85kg | Aceleración, frenada, control |
| **Envergadura** | 160-200cm | Apoyo en curvas, fatiga de brazos |
| **IMC** | Auto-calc | Resistencia física, recuperación |

### Fórmulas de Impacto Físico (Aplicadas Siempre)

| Factor | Cálculo | Efecto |
|--------|---------|--------|
| **Aerodinámica (CdA)** | `(195 - estatura) × 0.15` | Menos estatura = menos resistencia al aire = +velocidad punta |
| **Masa total mínima** | `Peso piloto + 157kg + combustible` | Afecta aceleración y frenada |
| **Ratio potencia/peso** | `Potencia motor / masa total` | Determina aceleración en rectas |
| **Centro de gravedad** | `(estatura × 0.55) + (peso piloto × 0.1)` | Afecta estabilidad en cambios de dirección |
| **Fatiga de brazos** | `(envergadura - 160) × tiempo carrera` | Mayor envergadura = más fatiga = errores en final |

### Tabla de Bonuses/Penalties por Estatura

| Estatura | Velocidad Punta | Estabilidad |
|----------|-----------------|-------------|
| 160-165cm | +6 a +9 km/h | -2% |
| 166-170cm | +3 a +6 km/h | -1% |
| 171-180cm | 0 (base) | 0 (base) |
| 181-190cm | -3 a -6 km/h | +2% |
| 191-195cm | -6 a -9 km/h | +4% |

### Tabla de Bonuses/Penalties por Peso

| Peso | Aceleración | Frenada | Control | Fatiga |
|------|-------------|---------|---------|--------|
| 55-60kg | +8% | +5% | -10% | Alta |
| 61-65kg | +4% | +3% | -5% | Media-Alta |
| 66-75kg | 0 (base) | 0 (base) | 0 (base) | Media |
| 76-80kg | -3% | -2% | +5% | Media-Baja |
| 81-85kg | -6% | -4% | +10% | Baja |

### Tabla de Impacto por Envergadura

| Factor | Impacto |
|--------|---------|
| **Envergadura grande** | Más palanca sobre el manillar, mejor control en curvas, pero más fatiga muscular |
| **Envergadura pequeña** | Menos palanca, peor control en curvas cerradas, pero menos cansancio |

| Envergadura | Control Curvas | Fatiga Brazos |
|-------------|----------------|---------------|
| 160-170cm | -5% | -20% |
| 171-180cm | 0 (base) | 0 (base) |
| 181-190cm | +5% | +15% |
| 191-200cm | +10% | +30% |

### Balance (Anti-Abuse)

Para evitar que solo se use "piloto ligero":
- **Límite de altura mínima**: 160cm (no se puede abusar demasiado)
- **Fatiga extra**: Pilotos <65kg se cansan 20% más rápido en carreras >30 min
- **Riesgo de caída**: Pilotos <165cm tienen +5% probabilidad de caída en curvas rápidas (aerodinámica inestable)
- **MotoGP específico**: Motos 1000cc son difíciles de controlar para pilotos <60kg (wheelies frecuentes)

### Visualización en Juego

#### En Garaje (Pre-carrera)

```
┌─────────────────────────────────────┐
│  SETUP DE CARRERA                   │
├─────────────────────────────────────┤
│  Piloto: Marc López                 │
│  Estatura: 172cm | Peso: 68kg       │
│  Envergadura: 175cm                 │
├─────────────────────────────────────┤
│  MOTO                               │
│  Peso base: 157kg                   │
│  Combustible: 22L (+16.5kg)         │
│  MASA TOTAL: 241.5kg                │
├─────────────────────────────────────┤
│  IMPACTO FÍSICO                     │
│  +2% aceleración (piloto ligero)    │
│  +1 km/h velocidad punta            │
│  Consumo proyectado: 1.8L/vuelta    │
│  Alcance: 12.2 vueltas (límite: 13) │
│  ⚠️  Riesgo: MEDIO - Llegas justo   │
└─────────────────────────────────────┘
```

#### Durante Carrera (HUD)

```
Vuelta 18/25 | Pos: 4º | Gap: +2.3s
├─ Combustible: 6.2L / 22L (28%)
├─ Consumo: 1.9L/vuelta (ALTO)
├─ Proyección: Quedarás vacío en vuelta 21
├─ Mapa actual: 2 (ESTÁNDAR)
└─ ⚠️  RECOMENDACIÓN: Cambiar a Mapa 1
```

### Drafting/Resbalón

En rectas largas, estar detrás de otra moto reduce resistencia:
- **Efecto**: -15% resistencia = +8-12 km/h velocidad punta
- **Estrategia**: Piloto bajo + drafting = adelantamiento seguro
- **Riesgo**: Quedarse sin espacio de frenada

---

## 🏁 FACTORES DE CIRCUITO (Cada uno único)

Cada circuito tiene características propias que afectan a setup, estrategia y rendimiento de pilotos.

### Características Base por Circuito

| Circuito | País | Tipo | Longitud | Curvas | Recta larga | Dificultad |
|----------|------|------|----------|--------|-------------|------------|
| Losail | Qatar | Nocturno, técnico | 5.4km | 16 | 1068m | Media-Alta |
| Portimão | Portugal | Montaña, desnivel | 4.6km | 15 | 970m | Alta |
| COTA | USA | Mixto, baches | 5.5km | 20 | 1200m | Media |
| Jerez | España | Técnico, grip bajo | 4.4km | 13 | 600m | Media |
| Le Mans | Francia | Mixto, frenadas | 4.2km | 14 | 450m | Media |
| Mugello | Italia | Rápido, rectas | 5.2km | 14 | 1145m | Media |
| Barcelona | España | Completo, técnico | 4.7km | 16 | 1047m | Alta |
| Sachsenring | Alemania | Lento, izquierdas | 3.7km | 13 | 780m | Media |
| Assen | Holanda | Rápido, fluido | 4.5km | 18 | 560m | Media |
| Red Bull Ring | Austria | Rápido, corto | 4.3km | 10 | 650m | Baja-Media |
| Silverstone | UK | Rápido, cambiante | 5.9km | 18 | 770m | Alta |
| Misano | Italia | Técnico, plano | 4.2km | 16 | 530m | Media |
| Aragón | España | Mixto, complicado | 5.1km | 17 | 968m | Alta |
| Motegi | Japón | Frenadas, técnico | 4.8km | 14 | 762m | Alta |
| Phillip Island | Australia | Rápido, mar | 4.5km | 12 | 900m | Media |
| Buriram | Tailandia | Técnico, calor | 4.6km | 12 | 1000m | Media |
| Sepang | Malasia | Calor, lluvia | 5.5km | 15 | 920m | Alta |
| Valencia | España | Técnico, final | 4.0km | 14 | 876m | Media |

### Factores Específicos de Circuito (Escala 1-10)

Cada circuito tiene 5 factores únicos que afectan rendimiento:

| Factor | Descripción | Impacto |
|--------|-------------|---------|
| **Abrasividad** | Desgaste de neumáticos | Alto = cambios frecuentes |
| **Grip natural** | Adherencia del asfalto | Bajo = más caídas, setup crítico |
| **Baches/irregularidades** | Suspensión clave | Alto = setup blando obligatorio |
| **Zonas de adelantamiento** | Oportunidades de rebufo | Alto = estrategia de slipstream |
| **Factor sorpresa** | Cambios de condiciones | Alto = clima impredecible |

### Tabla de Circuitos Detallada

| Circuito | Abrasividad | Grip | Baches | Adelant. | Sorpresa | Especial |
|----------|-------------|------|--------|----------|----------|----------|
| Losail | 6 | 5 | 3 | 7 | 4 | Arena en pista |
| Portimão | 7 | 6 | 8 | 6 | 5 | Desniveles extremos |
| COTA | 5 | 4 | 9 | 7 | 6 | Baches de Austin |
| Jerez | 4 | 3 | 4 | 5 | 5 | Temperatura asfalto |
| Le Mans | 6 | 5 | 3 | 4 | 7 | Lluvia repentina |
| Mugello | 8 | 7 | 4 | 9 | 4 | Drafting crucial |
| Barcelona | 5 | 6 | 5 | 6 | 5 | Equilibrado |
| Sachsenring | 3 | 6 | 2 | 3 | 4 | Solo izquierdas |
| Assen | 4 | 7 | 3 | 5 | 6 | Velocidad media |
| Red Bull Ring | 7 | 6 | 3 | 8 | 5 | Rectas largas |
| Silverstone | 6 | 5 | 4 | 7 | 8 | Viento/cambios |
| Misano | 5 | 6 | 2 | 4 | 5 | Grip variable |
| Aragón | 6 | 5 | 7 | 6 | 5 | Cambios altura |
| Motegi | 4 | 6 | 3 | 5 | 6 | Frenadas duras |
| Phillip Island | 9 | 7 | 3 | 8 | 7 | Viento mar |
| Buriram | 6 | 5 | 4 | 7 | 5 | Humedad |
| Sepang | 8 | 4 | 5 | 6 | 9 | Tormentas |
| Valencia | 3 | 5 | 2 | 5 | 4 | Decisivo |

### Impacto en Setup

| Factor alto | Setup recomendado |
|-------------|-------------------|
| Abrasividad | Suspensión rígida, neumáticos duros |
| Grip bajo | Alerón alto, suspensión blanda |
| Baches | Suspensión muy blanda, altura alta |
| Adelantamiento | Transmisión larga, motor potencia |
| Sorpresa (clima) | Setup intermedio, neumáticos mixtos |

### Circuitos Especiales

**Circuitos Nocturnos**:
- Losail (Qatar): Carrera bajo focos. Temperatura asfalto baja al inicio, sube después.
- Impacto: Setup cambia durante carrera, neumáticos tardan en calentar.

**Circuitos Costeros**:
- Phillip Island, Valencia: Viento cambiante, arena en pista (grip variable).

---

## 🌤️ SISTEMA DE CLIMA (Dinámico por Sesión)

El clima es independiente para cada sesión del fin de semana. Puede llover en FP1, estar seco en FP2, nublado en Qualy y tormenta en carrera.

### Estados del Tiempo

| Estado | Símbolo | Probabilidad | Impacto |
|--------|---------|--------------|---------|
| **Soleado** | ☀️ | 40% | Condiciones óptimas |
| **Nublado** | ☁️ | 25% | Temperatura baja, grip ligeramente menor |
| **Niebla** | 🌫️ | 5% | Visibilidad reducida, riesgo medio |
| **Llovizna** | 🌦️ | 15% | Pista húmeda, neumáticos intermedios |
| **Lluvia** | 🌧️ | 12% | Pista mojada, neumáticos de lluvia |
| **Tormenta** | ⛈️ | 3% | Riesgo alto, bandera roja posible |

### Evolución del Clima Durante Sesión

```
Ejemplo: Carrera en Silverstone
Vuelta 1-8:  ☁️ Nublado - Pista seca
Vuelta 9:    🌦️ Empieza a lloviznar - Alerta equipo
Vuelta 12:   🌧️ Lluvia fuerte - Entrada a boxes obligatoria
Vuelta 15:   ☁️ Para de llover - Decisión: seguir con agua o cambiar a seco
Vuelta 20:   ☀️ Seco rápido - Pilotos con neumáticos de lluvia pierden 5s/vuelta
```

### Predicción Meteorológica

Antes de cada sesión, recibes un pronóstico (con margen de error):

```
PRONÓSTICO QUALY - Silverstone
├─ Probabilidad lluvia: 60%
├─ Intensidad esperada: Moderada
├─ Ventana seca: 14:20-14:35 (15 min)
├─ Confianza: Media (Silverstone es impredecible)
└─ Recomendación: Salir temprano con neumáticos blandos
```

**Precisión del pronóstico**:
- 24h antes: ±30% de error
- 6h antes: ±15% de error
- 1h antes: ±5% de error
- En carrera: Radar en tiempo real (actualización cada 5 min)

### Impacto del Clima en Rendimiento

#### Temperatura de Asfalto

| Temp. Asfalto | Grip | Desgaste neumáticos | Motor |
|---------------|------|---------------------|-------|
| < 20°C | Bajo | Lento | Frío, menos potencia |
| 20-30°C | Óptimo | Normal | Óptimo |
| 30-40°C | Alto | Rápido | Calor, riesgo |
| 40°C+ | Muy alto | Extremo | Degradación |

#### Condiciones de Pista

| Estado | Neumático obligatorio | Tiempo por vuelta | Riesgo caída |
|--------|----------------------|-------------------|--------------|
| Seco | Slick (S/M/H) | 100% (base) | Bajo |
| Húmedo (llovizna) | Intermedio | +3-5% | Medio |
| Mojado | Lluvia | +8-12% | Alto |
| Encharcado | Lluvia extrema | +15-20% | Muy alto |
| Secando (línea) | Slick o Inter | Variable | Muy alto |

#### Visibilidad

| Condición | Impacto |
|-----------|---------|
| Soleado | Normal |
| Nublado | Normal |
| Niebla | -10% velocidad punta (precaución) |
| Lluvia | -5% velocidad, +20% riesgo error |
| Lluvia fuerte | -15% velocidad, +50% riesgo error, spray |

> **Spray**: En lluvia, el piloto va ciego si no tiene a nadie delante. Adelantar es casi imposible. El segundo gana tiempo en rectas por el "agujero de aire" limpio.

### Impacto en Físico del Piloto

| Condición | Fatiga física | Fatiga mental | Riesgo error |
|-----------|---------------|---------------|--------------|
| Soleado/cálido | Alta (deshidratación) | Media | Bajo |
| Nublado | Media | Baja | Bajo |
| Frío | Media (músculos rígidos) | Baja | Medio |
| Lluvia | Muy alta (fuerza extra) | Alta (concentración) | Alto |
| Cambios constantes | Alta | Muy alta | Muy alto |

- Piloto con alta resistencia física: Menos penalización en lluvia.
- Piloto con alta concentración: Mejor manejo de cambios de condiciones.

### Escenarios de Cambio de Condiciones

**Escenario 1: Seco → Lluvia**

```
Minuto 0:   Pista seca, neumáticos slicks
Minuto 15:  Nublado, temperatura baja
Minuto 22:  Primas gotas, pilotos dudan
Minuto 25:  Lluvia fuerte, caídas masivas
Minuto 26:  Entrada a boxes, cambio a lluvia
Minuto 30:  Safety car (bandera roja posible)
Minuto 35:  Carrera reinicia, pista mojada
```

**Escenario 2: Lluvia → Seco**

```
Minuto 0:   Lluvia torrencial, todos con agua
Minuto 20:  Para de llover, pista con charcos
Minuto 25:  "Línea seca" aparece, algunos cambian a inter
Minuto 30:  Pista casi seca, inters se destruyen
Minuto 32:  Entrada a boxes, slicks blandos
Minuto 35:  Últimas vueltas, diferencia de 10s entre estrategias
```

**Ruleta del Clima (Silverstone, Sepang)**:
En circuitos con Factor Sorpresa alto, el clima cambia sin aviso:
- Vuelta 5: ☀️ Seco, slicks blandos funcionan
- Vuelta 6: 🌦️ Llovizna en sector 3
- Vuelta 7: 🌧️ Lluvia fuerte en sector 1 y 2
- Vuelta 8: ☁️ Seco otra vez
- Resultado: Caos, pilotos con neumáticos equivocados, estrategia decide carrera

### Visualización en Juego

#### Pantalla de Garaje (Pre-sesión)

```
┌─────────────────────────────────────────┐
│  CIRCUITO: Silverstone                  │
│  Sesión: Q2 | Clima actual: 🌧️ Lluvia   │
│  Temp asfalto: 18°C | Ambiente: 15°C    │
├─────────────────────────────────────────┤
│  PRONÓSTICO PRÓXIMA HORA:               │
│  14:00-14:20: 🌧️ Lluvia fuerte (80%)    │
│  14:20-14:40: 🌦️ Llovizna (60%)         │
│  14:40-15:00: ☁️ Nublado (40%)          │
├─────────────────────────────────────────┤
│  SETUP RECOMENDADO:                     │
│  Alerón: Alto (agarre en mojado)        │
│  Suspensión: Blanda (baches + agua)     │
│  Neumáticos: Lluvia (obligatorio)       │
│  Mapa motor: Conservador (menos wheelie)│
└─────────────────────────────────────────┘
```

#### Durante Carrera (HUD)

```
Vuelta 12/27 | Pos: 3º | Gap líder: +1.2s
├─ Clima: 🌧️ Lluvia moderada
├─ Temp asfalto: 21°C (bajando)
├─ Pista: Mojada, charcos en curva 3 y 12
├─ Visibilidad: 60% (spray del 2º)
├─ Alerta: 🟡 Sector 2 secándose rápido
└─ Sugerencia: Preparar neumáticos intermedios
```

### Resumen de Variables por Carrera

Cada carrera es única por combinación de:

1. **Circuito** (18 diferentes, cada uno con 5 factores)
2. **Clima** (6 estados, evolución dinámica)
3. **Temperatura** (afecta grip y motor)
4. **Piloto** (físico, forma, lesiones)
5. **Moto** (setup, desarrollo, combustible)
6. **Estrategia** (neumáticos, mapas, riesgo)
7. **Rivales** (IA o humanos, sus estrategias)
8. **Sucesos** (caídas, safety car, banderas)

> **Resultado**: Millones de combinaciones posibles. Ninguna carrera igual.

---

## 🏁 SISTEMA DE PREPARACIÓN (FIN DE SEMANA)

### Orden del Fin de Semana

```
FP1 → FP2 → FP3 → Test Invierno* → FP4 → Sprint → Q1 → Q2 → Warm Up → Carrera
```
*Test Invierno solo en las 3 primeras carreras de la temporada

### Estructura de Sesiones

| Sesión | Laps disponibles | Objetivo | Coste |
|--------|------------------|----------|-------|
| **FP1** | 8 vueltas | Encontrar setup óptimo | 25,000/vuelta |
| **FP2** | 8 vueltas | Encontrar setup óptimo | 25,000/vuelta |
| **FP3** | 8 vueltas | Encontrar setup óptimo | 25,000/vuelta |
| **FP4** | 4 vueltas | Test de ritmo de carrera | 25,000/vuelta |
| **Sprint** | 5 vueltas | Carrera corta, puntos extra | 40,000/vuelta |
| **Q1** | 2 vueltas | Clasificación para Q2 | 50,000/vuelta |
| **Q2** | 2 vueltas | Pole position | 50,000/vuelta |
| **Warm Up** | 3 vueltas | Últimos ajustes | 30,000/vuelta |

### Sprint Race

- Disponible en cualquier momento antes de la clasificación
- **Distancia**: 30% de la carrera principal
- **Puntos** (top 9): 12-9-7-6-5-4-3-2-1
- No obligatorio, pero recomendado por puntos extra

### Test de Invierno

- **Solo en las 3 primeras carreras** de la temporada
- Una sesión extra (6 vueltas) antes de cada clasificación
- **Coste**: 20,000/vuelta
- Sin puntos, pero el setup encontrado se guarda para esa carrera específica
- Total: 3 tests de invierno por temporada

---

## 📊 ESTRATEGIA DE CARRERA

### Bloqueo de Estrategia

La estrategia se bloquea **90 minutos antes** de la carrera.

### Elementos a Configurar

1. **Combustible inicial** (litros a los que rellenar en cada parada)
2. **Plan de paradas** (vuelta de cada parada)
3. **Compuesto de neumático** por stint
4. **Mapa de motor inicial**
5. **Riesgos del piloto** (0-100)

### Paradas en Boxes

Entras a boxes cuando no puedas completar otra vuelta por:
- **Combustible insuficiente**
- **Neumáticos desgastados** (por debajo del nivel seguro)
- **Cambio climático** (de seco a lluvia o viceversa)

### Mapas de Motor (Cambiables durante carrera)

| Mapa | Efecto | Uso |
|------|--------|-----|
| **1 - Conservador** | Protege neumáticos | Gestión |
| **2 - Estándar** | Balance | Normal |
| **3 - Ataque** | Máxima potencia, más desgaste | Adelantar |

### Riesgos del Piloto (0-100)

Afecta a:
- Probabilidad de error (caída)
- Desgaste de moto
- Tiempo por vuelta

---

## 🏆 SISTEMA DE PUNTOS Y DIVISIONES

### Sistema de Puntos

| Posición | Puntos |
|----------|--------|
| 1º | 25 |
| 2º | 20 |
| 3º | 16 |
| 4º | 13 |
| 5º | 11 |
| 6º | 10 |
| 7º | 9 |
| 8º | 8 |
| 9º | 7 |
| 10º | 6 |
| 11º | 5 |
| 12º | 4 |
| 13º | 3 |
| 14º | 2 |
| 15º | 1 |

### Pirámide de Niveles

| Nivel | Grupos | Managers/grupo | Promoción/Descenso |
|-------|--------|----------------|-------------------|
| **MotoGP Elite** | 1 | 24 | Campeón defiende título |
| **MotoGP** | 5 | 24 | Top 3 suben, últimos 3 bajan |
| **Moto2** | 25 | 20 | Top 2 suben, últimos 4 bajan |
| **Moto3** | 75 | 16 | Top 2 suben, últimos 3 bajan |
| **Rookies** | 150 | 12 | Top 3 suben |
| **Amateur** | Ilimitados | 10 | Top 3 suben (nivel de entrada) |

### Temporada

- **20 carreras** (calendario real MotoGP adaptado)
- **Frecuencia**: 2 carreras por semana (martes y sábado 20:00 CET)

---

## 💰 ECONOMÍA Y PERSONAL

### Personal a Contratar

| Rol | Función | Salario Típico |
|-----|---------|----------------|
| **Piloto titular** | Corre todas las carreras | 500k-15M/carrera |
| **Piloto reserva #1** | Sustituye lesiones | 50k-2M/carrera |
| **Piloto reserva #2** | Test y wildcard | 30k-1M/carrera |
| **Jefe de equipo** | Bonus moral, negociación sponsors | 200k-5M/año |
| **Ingeniero de pista** | Mejora setup base | 150k-3M/año |
| **Preparador físico** | Reduce degradación física piloto | 80k-1.5M/año |
| **Mecánico jefe** | Fiabilidad moto, velocidad pits | 100k-2M/año |
| **Data engineer** | Mejora feedback setup piloto | 120k-2.5M/año |
| **Fisioterapeuta** | Recuperación lesiones | 60k-800k/año |

### Fuentes de Ingresos

| Fuente | Cantidad |
|--------|----------|
| Sponsor principal | Variable por resultados |
| Premios carrera | Por posición |
| Premio temporada | Por posición final |
| Merchandise | Variable por popularidad |

---

## 🔧 DESARROLLO DE MOTO

### Nivel de Piezas (1-20)

| Pieza | Función | Coste Mejora |
|-------|---------|--------------|
| **Motor** | Potencia, fiabilidad | 2M-50M por nivel |
| **Chasis** | Agilidad, estabilidad | 1.5M-40M |
| **Electrónica** | Control tracción, gestión | 1M-30M |
| **Aerodinámica** | Velocidad punta, downforce | 800k-25M |
| **Frenos** | Distancia frenada | 600k-20M |

### Sistema de Evolutivos

Cada 4 carreras puedes traer mejora física (como MotoGP real). No es acumulación de puntos, es desarrollo real con coste y tiempo.

---

## 🎮 SISTEMA DE CARRERAS Y VISUALIZACIÓN

### Modos de Visualización (Toggle en Tiempo Real)

| Modo | Descripción | Uso Recomendado |
|------|-------------|-----------------|
| **3D Cámara TV** | Vista seguimiento moto, gráficos 3D | Inmersión, momentos clave |
| **3D Onboard** | Vista del casco del piloto | Análisis de línea |
| **2D Pájaro** | Vista cenital, iconos moviéndose | Estrategia, overview |
| **2D Sector** | Gráfico de posiciones por sector | Análisis de ritmo |
| **Texto/Live Timing** | Solo datos, tiempos, gaps | Batería baja, conexión lenta |

### Cambio Durante Carrera

Botón flotante siempre visible. Cambio instantáneo sin pausar.

### Duración de Carrera

45-60 minutos (carreras reales MotoGP son ~40 min).

### Momentos de Decisión (Notificaciones)

1. **Vuelta de formación**: Confirmar mapa de salida
2. **Salida**: Riesgo de caída en primera curva
3. **Cambio meteorológico**: Decidir si entrar a boxes
4. **Caída del piloto**: Reenganchar o abandonar
5. **Bandera amarilla**: Mantener o arriesgar
6. **Últimas 5 vueltas**: Push final o conservar

---

## 💳 MONETIZACIÓN (MODELO ÉTICO)

### Principio Anti Pay-to-Win

**NADA** de ventajas competitivas por dinero.

### Gratis para Todos (Sin VIP)

- ✅ Ligas ilimitadas (cualquier tamaño)
- ✅ Modo Carrera completo
- ✅ Todas las motos y circuitos
- ✅ Setup completo y estrategia
- ✅ Visualización 3D y 2D
- ✅ Pilotos y staff completos
- ✅ Chat completo durante carreras
- ✅ Animaciones de podio (básicas)
- ✅ Insignias de perfil (básicas)
- ❌ Anuncio obligatorio cada 24h (30s video)

### VIP/Premium ($4.99/mes o $39.99/año)

- ✅ Sin anuncios (acceso inmediato siempre)
- ✅ 1 slot de entrenamiento simultáneo (igual que no-VIP)
- ✅ Estadísticas avanzadas (comparativas históricas)
- ✅ 1-2 skins exclusivas gratis (VIP gift)
- ✅ Animaciones de podio premium
- ✅ Insignias de perfil exclusivas
- ✅ Acceso beta a nuevas características

### Compras Únicas (Cosméticas Solo)

| Producto | Precio |
|----------|--------|
| Packs de skins históricas (MotoGP clásicas) | $0.99-2.99 |
| Animaciones de victoria especiales | $0.49-1.49 |
| Nombre de equipo personalizado premium | $0.99 (cada vez) |

### LO QUE NO EXISTE (Anti-Pay-to-Win)

- ❌ No hay "acelerar reparaciones"
- ❌ No hay "mejorar piloto instantáneamente"
- ❌ No hay "motos más rápidas por dinero"
- ❌ No hay "boosts de rendimiento"
- ❌ No hay "pilotos legendarios exclusivos de pago"
- ❌ No hay "más slots de entrenamiento" para VIP

---

## 🖥️ TECNOLOGÍA Y PLATAFORMAS

### Stack Técnico (Arquitectura Híbrida)

| Componente | Tecnología | Uso |
|------------|------------|-----|
| **Frontend Web** | HTML + CSS + JavaScript | Gestión, menús, configuración |
| **Frontend 3D** | Godot 4 (WebAssembly) | Carreras 3D, animaciones |
| **Backend** | Node.js + Express | API REST |
| **Base de datos** | TiDB (MySQL cloud) | Datos persistentes |
| **Sesiones** | express-session + TiDB | Autenticación |
| **Comunicación** | WebSocket (futuro) | Tiempo real en carreras |

### Arquitectura Híbrida: Web + Godot 4

```
┌────────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA HÍBRIDA                        │
├────────────────────────────────────────────────────────────────┤
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
│   Godot solo se carga en páginas de carrera (no en toda la web)│
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Ventajas de la Arquitectura Híbrida

| Ventaja | Descripción |
|---------|-------------|
| **No reescribir todo** | Se mantiene la web actual funcionando |
| **Carga más rápida** | Godot solo se carga en páginas de carrera |
| **Desarrollo gradual** | Migración progresiva sin parar el proyecto |
| **Render compatible** | Godot Web son archivos estáticos |
| **Flexibilidad futura** | Fácil migrar a Steam/Play Store si se desea |

### Plataformas

| Plataforma | Estado | Notas |
|------------|--------|-------|
| **Web** | ✅ Activo | HTML + Godot WASM |
| **Steam (PC)** | 🔮 Futuro | Reexportar Godot a nativo |
| **Play Store** | 🔮 Futuro | Reexportar Godot a Android |
| **App Store** | 🔮 Futuro | Reexportar Godot a iOS |

### Ventajas de Godot 4

- **Gratis 100%**: Sin límites de ingresos, sin royalties
- **Multiplataforma**: Web, Steam, Android, iOS desde un proyecto
- **GDScript**: Fácil de aprender (similar a Python)
- **Ligero**: Editor ~100MB
- **Open Source**: Licencia MIT

### Requisitos Móvil (Futuro)

| Requisito | Mínimo |
|-----------|--------|
| **Android** | 8.0+ |
| **iOS** | 13+ |
| **RAM** | 3GB (3D), 2GB (2D) |
| **Espacio** | 500MB |

---

## 🗓️ HOJA DE RUTA

### Fase 1 (Meses 1-4): MVP

- [x] Sistema de cuenta y sesiones
- [ ] 6 circuitos (Jerez, Mugello, Phillip Island, Silverstone, Brno, Sepang)
- [ ] 4 equipos oficiales + crear equipo propio
- [ ] Simulador 2D funcional
- [ ] Setup básico (3 parámetros)
- [ ] Economía simplificada

### Fase 2 (Meses 5-8): Profundidad

- [ ] Setup completo 6 parámetros estilo GPRO
- [ ] Simulador 3D con toggle 2D/3D
- [ ] Sistema de lesiones y pilotos suplentes
- [ ] Moto2 y Moto3 integrados
- [ ] Neumáticos reales (12 compuestos)
- [ ] Modo Carrera de piloto

### Fase 3 (Meses 9-12): Pulido

- [ ] Todos los circuitos del calendario real
- [ ] Sprint races
- [ ] Sistema de patrocinadores dinámico
- [ ] Apps móviles nativas optimizadas
- [ ] Anti-cheat robusto
- [ ] Localización (ES, EN, IT, FR, DE, JP)

---

## 🎨 PERSONALIZACIÓN VISUAL

### Gratis para Todos (No-VIP y VIP)

| Elemento | Opciones | Notas |
|----------|----------|-------|
| **Moto - Color primario** | Selector RGB completo | Cualquier color |
| **Moto - Color secundario** | Selector RGB completo | Detalles, carenado |
| **Moto - Número** | 2-99 (si está libre) | El 1 es solo para campeón defensor |
| **Uniforme piloto - Color principal** | Selector RGB | Mono de carreras |
| **Uniforme piloto - Color secundario** | Selector RGB | Franjas, detalles |
| **Casco - Color base** | Selector RGB | 1 color gratis |
| **Nombre piloto** | Personalizado | Libre |

### De Pago (Skins Premium)

| Tipo | Precio | Contenido |
|------|--------|-----------|
| **Skins históricas MotoGP** | $0.99-2.99 | Réplicas oficiales (Rossi 46, Márquez 93, etc.) |
| **Skins equipos oficiales** | $1.99-2.99 | Ducati, Honda, KTM, Aprilia, Yamaha, Suzuki |
| **Skins especiales** | $0.99-1.99 | Camuflaje, fluorescente, metálico, etc. |
| **Cascos especiales** | $0.49-0.99 | Diseños únicos, aerografía |

**VIP**: Reciben 1-2 skins de equipos oficiales al suscribirse (elegir cuáles).

> **Nota**: Las skins premium no bloquean la personalización de colores. Puedes comprar una skin histórica y luego cambiarle los colores (variación personalizada).

---

## 🏁 MODO CARRERA: CREACIÓN DE PILOTO

### Datos Básicos

- **Nombre**: Libre
- **Nacionalidad**: 20+ opciones (afecta sponsors iniciales)
- **Fecha de nacimiento**: Determina edad inicial (16-18 años recomendado)
- **Número favorito**: 2-99 (intentas reservarlo)

### Distribución de Puntos Iniciales

Empiezas con **50 puntos** para distribuir (todos los atributos en 40 inicial):

| Atributo | Coste | Descripción |
|----------|-------|-------------|
| Velocidad pura | 1:1 | Ritmo en vuelta lanzada |
| Consistencia | 1:1 | Evitar errores |
| Frenada | 1:1 | Ganancia en frenada |
| Aceleración | 1:1 | Salidas curvas |
| Gestión neumáticos | 2:1 | Cuidado de gomas (caro) |
| Técnica | 3:1 | Feedback setup (muy caro) |
| Mental | 1:1 | Manejo presión |
| Valentía | 1:1 | Adelantamientos |

**Ejemplo**: 20 puntos en Velocidad = 60 de Velocidad base. 10 puntos en Técnica = 43 de Técnica (coste 3:1).

### Origen de Carrera (Backstory)

| Origen | Bonus Inicial | Descripción |
|--------|---------------|-------------|
| **Crina de Campeones** | +5 Velocidad, +3 Técnica | España, Italia - expectativas altas |
| **Talent Factory** | +5 Consistencia, +3 Mental | Escuela de pilotos reconocida |
| **Autodidacta** | +5 Valentía, +3 Aceleración | Sin respaldo, más riesgo |
| **Físico privilegiado** | Mejores stats físicos base | Ventaja en medidas corporales |
| **Dinero familiar** | +500,000 inicial | Puedes comprar mejor equipo |

### Progresión en Modo Carrera

**Temporada 1-2 (Moto3)**:
- Edad: 16-17 años
- Objetivo: Aprender, acabar carreras
- Contratos: Equipos pequeños, salario bajo
- Mejora rápida (+3-5 por entrenamiento)

**Temporada 3-4 (Moto2)**:
- Edad: 18-19 años
- Objetivo: Podios, subir a MotoGP
- Contratos: Equipos medianos
- Mejora normal (+2-3)

**Temporada 5+ (MotoGP)**:
- Edad: 20+ años
- Objetivo: Victorias, campeonato
- Contratos: Fábricas o satélites
- Mejora lenta, degradación empieza a los 27

### Cambio de Equipo

- Cada temporada recibes ofertas según rendimiento
- Puedes rechazar y quedarte (negociar mejor salario)
- Equipos fábrica solo te fichan si eres top 10
- Equipos satélite = moto peor pero más libertad

---

## 📐 IMPACTO DE MEDIDAS FÍSICAS EN GAMEPLAY

### Ejemplos de Builds

**"Piloto ligero"** (Estatura 165cm, Peso 58kg, Envergadura 168cm):
- ✅ +9 velocidad punta (aerodinámica)
- ✅ +0.6 aceleración (peso bajo)
- ✅ Mejor gestión neumáticos (menos carga)
- ❌ -2 estabilidad (peso insuficiente)
- ❌ Fatiga rápida en carreras largas
- ❌ Dificultad para motos grandes (MotoGP)

**"Piloto atlético"** (Estatura 180cm, Peso 72kg, Envergadura 185cm):
- ✅ +3.4 estabilidad
- ✅ +2.5 control en curvas
- ✅ Resistencia física alta
- ❌ -4.5 velocidad punta
- ❌ Mayor desgaste de neumáticos

**"Piloto compacto"** (Estatura 170cm, Peso 65kg, Envergadura 172cm):
- Balanceado, sin bonuses ni penalties extremos
- Ideal para empezar

### Adaptación Física Durante Carrera

- **Perder peso**: 1-2kg por sudoración (afecta rendimiento final)
- **Ganar fatiga**: Brazos, cuello, piernas (afecta consistencia)
- **Recuperar**: En boxes o con entrenamiento físico entre carreras

### Entrenamiento Físico Específico

| Tipo | Beneficio |
|------|-----------|
| **Gimnasio** | +fuerza (mejor control moto grande) |
| **Cardio** | +resistencia (menos fatiga) |
| **Yoga/Pilates** | +flexibilidad (mejor feedback setup) |
| **Simulador** | +técnica sin riesgo |

---

## 👤 VISUALIZACIÓN DEL PILOTO

En Modo Carrera, tu piloto aparece en:

- **Foto de perfil**: Avatar 3D con tu uniforme personalizado
- **Carrera**: Modelo 3D con tu número y colores
- **Podio**: Celebración con tu estatura y peso realistas (piloto bajo vs alto se nota)
- **Garaje**: Conversaciones con ingeniero, gestos según personalidad

---

## 📝 RESUMEN DE PERSONALIZACIÓN

| Elemento | Gratis | Pago/VIP |
|----------|--------|----------|
| Colores moto (2) | ✅ RGB completo | - |
| Colores uniforme (2) | ✅ RGB completo | - |
| Número moto | ✅ 2-99 | - |
| Nombre piloto | ✅ Libre | - |
| Skins históricas | - | $0.99-2.99 |
| Skins equipos | Regalo VIP (1-2) | $1.99-2.99 |
| Cascos especiales | - | $0.49-0.99 |
| Animaciones podio | Básicas | Avanzadas $0.49-1.49 |
| Insignias perfil | Básicas | VIP + avanzadas |

---

## 📝 RESUMEN DE SISTEMAS CLAVE

### Prioridad ALTA (Implementar Primero)

1. **Pilotos con degradación por edad** (10 atributos)
2. **Setup de moto detallado** (6 parámetros 1-99)
3. **Sistema de neumáticos** Michelin (12 compuestos)
4. **Sistema de combustible** y consumo
5. **Sistema de lesiones**

### Prioridad MEDIA

1. Sistema climático dinámico
2. Negociación de sponsors
3. Staff técnico
4. Instalaciones del equipo
5. Sistema de divisiones

### Prioridad BAJA

1. Visualización 3D
2. Mercado de transferencias
3. Sprint races
4. Test de invierno

---

## 🛡️ SISTEMA ANTI-FRUSTRACIÓN

Aprendiendo de errores de juegos competidores (IGP, GPRO).

### Setup de Emergencia

**Problema**: En otros juegos, si fallas el setup en Qualy, la carrera está arruinada.

**Solución**:
- Si en Q1 tu piloto dice "esto no funciona" (feedback negativo en 3+ parámetros), puedes gastar **100,000** para resetear a setup base del equipo
- Solo **1 vez por fin de semana**
- Penalización: Pierdes 1 vuelta de Qualy (tiempo perdido)

### Veteranos Valiosos

**Problema**: Pilotos jóvenes prometedores se vuelven "inútiles" a los 28 años en otros juegos.

**Solución**: Pilotos >30 años con alta Experiencia dan bonus táctico al equipo:
- **+5% precisión** en predicción meteorológica
- **+3% eficiencia** en consumo de combustible (consejos por radio)
- **Mejor feedback de setup**: MA más estrecho para compañeros jóvenes

---

## 📺 MODO ESPECTADOR MEJORADO

IGP 26 falló al forzar 3D. Nosotros damos opciones.

### "Director de Carrera" (Modo espectador gratuito)

- Sigues una carrera sin participar
- Cámaras de todos los pilotos
- Datos en tiempo real (telemetría)
- Apuestas virtuales con dinero del juego (sin valor real, pero divertido)
- Útil para aprender circuitos nuevos antes de correr

---

## 🏆 SISTEMA DE LEGADO (Meta-juego largo plazo)

### Hall of Fame

- Pilotos retirados (>35 años o lesión grave) entran con stats finales
- Sus records permanecen para comparar con nuevas generaciones

### Escuelas de Pilotos

- Inviertes dinero para formar jóvenes
- Luego los fichas barato o vendes a otros equipos
- Genera ingresos pasivos si tienes buena academia

### Circuitos Históricos (Temporadas Dinámicas)

Cada temporada tendrá circuitos diferentes. Todos los circuitos (actuales e históricos) están desbloqueados en todas las categorías.

**Circuitos Históricos Disponibles**:

| Circuito | País | Años activo | Carácterística especial |
|----------|------|-------------|------------------------|
| Estoril | Portugal | 1987-2012 | Vientos atlánticos |
| Istanbul Park | Turquía | 2005-2008, 2013 | Curva 8 legendaria |
| Laguna Seca | USA | 1988-2013 | Corkscrew |
| Indianapolis | USA | 2008-2015 | Ovalo histórico |
| Donington Park | UK | 2000-2009 | Técnico británico |
| Brno | Chequia | 1965-2020 | Bosque y desnivel |
| Argentina (Buenos Aires) | Argentina | 1961-1999 | Asfalto histórico |
| Rio de Janeiro | Brasil | 1995-2004 | Calor extremo |
| Suzuka (East) | Japón | Variante alternativa | Técnico corto |
| Kyalami | Sudáfrica | 1983-1992 | Altura africana |
| Nürburgring | Alemania | Varias épocas | Clima cambiante |
| Welkom | Sudáfrica | 1999-2004 | Desierto |
| Shanghai | China | 2005-2008 | Recta kilométrica |

> **Resultado**: Cada temporada es única. Nunca repetirás exactamente el mismo calendario.

---

## 💰 ECONOMÍA DE EQUILIBRIO (Anti-inflación)

### Problema en Competencia

GPRO e IGP sufren inflación descontrolada de dinero.

### Soluciones

| Mecanismo | Descripción |
|-----------|-------------|
| **Mercado dinámico** | Precios de pilotos/staff suben/bajan según oferta/demanda global (todos los jugadores afectan) |
| **Impuesto de lujo** | Ganar >50M en una temporada = 20% impuesto (evita acumulación infinita) |
| **Patrocinadores realistas** | Si quedas último 3 carreras seguidas, pierdes sponsor principal |
| **Bonus por posición** | Más dinero por ganar en categorías bajas (motiva subir) |

---

## 👥 SOCIAL Y COMUNIDAD

Funciones que faltan en juegos competidores. En GPRO e IGP, el aspecto social es limitado: apenas chat básico y ligas predefinidas. Moto Pro Manager implementa un ecosistema social completo para crear comunidad y aumentar retención.

### Ligas Privadas Personalizadas

**Concepto**: Los jugadores pueden crear sus propias ligas con reglas personalizadas, invitando a amigos o haciéndolas públicas para que cualquiera se una.

**Reglas personalizables**:
- **Ban de setups**: El creador puede limitar ciertos parámetros (ej: "Solo setup blando en suspensión") para nivelar el campo
- **Clima forzado**: Forzar condiciones específicas (siempre lluvia, siempre seco) para entrenar escenarios concretos
- **Presupuesto limitado**: Capar el presupuesto máximo disponible para todos los participantes
- **Categoría fija**: Obligar a usar solo Moto2 o Moto3 para novatos
- **Calendario personalizado**: Elegir qué circuitos y en qué orden (de los 30 disponibles)

**Permisos del creador**:
- Expulsar jugadores tóxicos
- Transferir propiedad de la liga
- Configurar puntos personalizados (ej: solo top 5 puntúa)
- Establecer horarios de carrera específicos

**Monetización**: Ligas privadas son GRATIS. No se cobra por crear o unirse.

### Modo "Desafío" (Asíncrono)

**Concepto**: Retar a un amigo a batir tu tiempo en un circuito específico, sin necesidad de estar online simultáneamente.

**Funcionamiento**:
1. Seleccionas un circuito y condiciones (clima fijo, setup predefinido o libre)
2. Eliges un amigo de tu lista o buscas por username
3. Envías el desafío con un mensaje personalizado ("Te apuesto 50k que no bajas de 1:32")
4. El amigo tiene 48h para aceptar y completar la vuelta
5. El ganador recibe el premio acordado (dinero del juego, nunca real)

**Características**:
- Guardar récord personal en cada circuito
- Tabla de líderes entre amigos
- Historial de desafíos ganados/perdidos
- Compartir resultados en redes sociales con imagen generada

**Ejemplo de visualización**:
```
┌────────────────────────────────────┐
│  DESAFÍO: Mugello                  │
├────────────────────────────────────┤
│  Tú:      1:32.456                 │
│  Amigo:   1:33.102                 │
│  ─────────────────────────────     │
│  ¡GANASTE! +50,000                 │
│  Margen: 0.646s                    │
│  Tu mejor vuelta en este circuito  │
└────────────────────────────────────┘
```

### Exportar Replay

**Concepto**: Guardar carrera épica como video 2D para compartir en redes sociales, YouTube o enviar a amigos.

**Opciones de exportación**:
- **Formato**: MP4 (480p gratis, 720p VIP, 1080p VIP)
- **Duración**: Últimas 5 vueltas, carrera completa, o momentos destacados (automático)
- **Cámara**: Seguir a tu piloto, vista general, o dinámica (cambia según acción)
- **Overlay**: Tiempos, gaps, nombre de pilotos (activable/desactivable)
- **Audio**: Motor + ambient, solo música, o silenciado

**Límites**:
- No-VIP: 3 exportaciones/mes, marca de agua
- VIP: Ilimitado, sin marca de agua, calidad 1080p

### Clanes/Equipos

**Concepto**: Agruparse con amigos para competir en ranking de equipos, similar a clanes en otros juegos pero enfocado en competición.

**Estructura del Clan**:
- **Líder**: Crea el clan, invita miembros, establece objetivos
- **Oficiales**: Pueden invitar/expulsar miembros
- **Miembros**: Participan en eventos del clan
- **Límite**: 10 miembros por clan

**Ranking de Clanes**:
- Puntos acumulados de todos los miembros en ligas oficiales
- Eventos especiales "Clan Wars": competición entre clanes con premios exclusivos
- Tabla de líderes global con posicionamiento de cada clan

**Beneficios del Clan**:
- Bonos grupales: Si 3+ miembros terminan top 10 en sus ligas, bono de $100k para todos
- Chat privado del clan
- Estrategia compartida: Los miembros pueden compartir setups entre ellos

**Ejemplo de interfaz**:
```
┌─────────────────────────────────────┐
│  CLAN: "Velocidad Máxima"           │
│  Ranking Global: #42                │
│  Puntos Totales: 15,340             │
├─────────────────────────────────────┤
│  Miembros (8/10):                   │
│  1. Marc_93 (Líder) - MotoGP Elite  │
│  2. Vale_46 (Oficial) - MotoGP      │
│  3. Casey_27 (Miembro) - Moto2      │
│  ...                                │
├─────────────────────────────────────┤
│  Evento Activo: Clan War vs "Riders"│
│  Progreso: 3/5 carreras             │
│  Premio: 500k + skin exclusiva      │
└─────────────────────────────────────┘
```

---

## ♿ ACCESIBILIDAD

### Problema en Competencia

GPRO es intimidante para novatos. La interfaz está sobrecargada de información, los términos técnicos no se explican, y no hay manera de practicar sin arriesgar posición en liga. IGP tiene problema similar con su interfaz 3D obligatoria.

### Soluciones Detalladas

#### Modo "Escuela de Pilotos"

**Concepto**: 5 carreras contra IA lenta para aprender mecánicas sin presión, antes de entrar en ligas competitivas.

**Estructura del tutorial**:

| Lección | Contenido | Objetivo |
|---------|-----------|----------|
| **1. Básicos** | Controles de interfaz, navegación | Completar 1 vuelta sin salirse |
| **2. Setup I** | Alerón y suspensión básicos | Ajustar setup según feedback simple |
| **3. Setup II** | Motor, transmisión, frenos | Encontrar setup óptimo con pistas |
| **4. Estrategia** | Combustible, neumáticos, mapas | Terminar carrera sin quedarte sin gas |
| **5. Carrera completa** | Todo integrado | Ganar contra IA novata |

**Características**:
- Feedback paso a paso con resaltado de UI
- No afecta liga ni economía real
- Repetible cuantas veces se quiera
- Recompensa: $50,000 al completar todas las lecciones

**IA adaptativa**: Si el novato va muy rápido, la IA acelera. Si va lento, la IA espera. Siempre hay competencia sin frustración.

#### Glosario Integrado

**Concepto**: Diccionario accesible desde cualquier pantalla que explica términos técnicos del mundo del motociclismo y mecánica del juego.

**Términos incluidos** (ejemplos):

| Término | Definición |
|---------|------------|
| **MA (Margen de Aceptación)** | Rango donde el piloto dice "está bien" pero no es óptimo. Pilotos con más técnica tienen MA más estrecho. |
| **Drafting/Slipstream** | Ir detrás de otra moto reduce resistencia del aire, ganando 8-12 km/h en recta. |
| **Undercut** | Estrategia de entrar a boxes antes que el rival para ganar posición con neumáticos frescos. |
| **Dirty Air** | Aire turbulento detrás de una moto que afecta la estabilidad de quien sigue. |
| **Wheelie** | La rueda delantera se levanta por exceso de potencia. Más frecuente en pilotos ligeros. |
| **Abrasividad** | Medida de cuánto desgasta el asfalto los neumáticos. Alta = más cambios de gomas. |

**Acceso**: Click derecho en cualquier término resaltado en azul, o botón "?" en esquina superior.

#### Tooltips Contextuales

**Concepto**: Al pasar el ratón sobre cualquier estadística, aparece una ventana emergente explicando qué significa y cómo afecta el gameplay.

**Ejemplos**:

```
┌─────────────────────────────────────────┐
│  VELOCIDAD PURA: 78                     │
├─────────────────────────────────────────┤
│  Qué es: Ritmo del piloto en vuelta     │
│  lanzada (sin tráfico).                 │
│                                         │
│  Cómo mejora: Entrenamiento en pista.   │
│  Degradación: -0.5/año tras 28 años.    │
│                                         │
│  Impacto en carrera: Determina qué tan  │
│  rápido puede ir el piloto en qualy y   │
│  cuando lidera sin drafting.            │
└─────────────────────────────────────────┘
```

**En móvil**: Tap & hold (mantener pulsado) para ver tooltip.

#### Feedback del Piloto Mejorado

**Concepto**: El piloto comenta el setup con indicaciones claras y graduales, suficiente para que un novato aprenda sin necesidad de guía externa.

**Niveles de feedback**:

| Nivel | Piloto Técnica | Feedback |
|-------|----------------|----------|
| **Novato** | 0-40 | Indicaciones directas: "El alerón está muy bajo, súbelo" |
| **Intermedio** | 41-70 | Pistas: "Me falta agarre en curvas lentas" |
| **Experto** | 71-100 | Sutil: "Algo no está fino en la zona media" |

**Ejemplo de conversación en garaje**:
```
┌──────────────────────────────────────┐
│  PILOTO: "La moto se mueve mucho en  │
│  frenada. Creo que la suspensión     │
│  está demasiado rígida para este     │
│  circuito con baches."               │
│                                      │
│  [Suspensión actual: 75]             │
│  [Recomendación: bajar a 40-50]      │
│                                      │
│  💡 Pista: El circuito tiene baches  │
│  nivel 8/10. Suspensión blanda       │
│  absorbe mejor las irregularidades.  │
└──────────────────────────────────────┘
```

---

## 🔧 SINCRONIZACIÓN TÉCNICA

### Problema Principal

Carreras en tiempo real con gente de todo el mundo presenta múltiples desafíos técnicos: latencia variable, desconexiones inesperadas, pérdidas de paquetes, y diferencias en la calidad de conexión entre jugadores. Un jugador con mala conexión puede arruinar la experiencia de otros 23.

### Soluciones Detalladas

#### Servidores Regionales

**Concepto**: Infraestructura distribuida geográficamente para minimizar latencia. Los jugadores eligen su región al crear cuenta o unirse a una liga.

**Regiones disponibles**:

| Región | Servidores | Latencia típica | Países principales |
|--------|------------|-----------------|-------------------|
| **Europa** | Frankfurt, Londres | 20-50ms | España, UK, Alemania, Francia, Italia |
| **Américas** | Nueva York, São Paulo | 30-80ms | USA, Brasil, México, Argentina, Canadá |
| **Asia-Pacífico** | Tokio, Singapur | 25-70ms | Japón, Australia, Indonesia, Corea |

**Cross-region**: Posible pero con aviso de "Alta latencia esperada". Los amigos pueden jugar juntos aunque estén en regiones diferentes, pero la experiencia puede verse afectada.

**Coste**: Uso de CDN (Cloudflare, AWS CloudFront) para distribuir carga. Backend principal en un servidor central con edge nodes para sincronización.

#### Modo "Híbrido" (IA de Respaldo)

**Concepto**: Si un jugador pierde conexión durante carrera, una IA conservadora toma el control temporalmente, manteniendo su posición pero sin realizar arriesgadas maniobras.

**Comportamiento de la IA**:
- **Ritmo**: 95% del ritmo normal del piloto (ligeramente más lento)
- **Adelantamientos**: Solo si hay oportunidad clara (no arriesga)
- **Defensa**: No defiende agresivamente posiciones
- **Estrategia**: Mantiene la estrategia predefinida (no improvisa)

**Ejemplo de secuencia**:
```
Vuelta 12: Jugador pierde conexión
→ IA toma control inmediatamente
→ Mensaje en chat: "Juan_Moto está en modo híbrido (IA)"
→ Posición: 4º → 5º → 5º (mantiene)
Vuelta 15: Jugador reconecta
→ IA transfiere control suavemente
→ Mensaje: "Juan_Moto ha vuelto"
→ Jugador continúa desde posición actual
```

**Límite**: Si no reconecta en 5 vueltas, se retira automáticamente.

#### Sistema de Reconexión

**Concepto**: Dar tiempo suficiente para que un jugador pueda reconectarse sin perder todo su progreso.

**Ventana de reconexión**:
- **Tiempo**: 2 minutos desde la desconexión
- **Posición**: Se mantiene la posición al momento de desconexión
- **Daños**: Si hubo incidente durante desconexión, se aplica al reconectar

**Proceso de reconexión**:
1. Detectar pérdida de conexión (heartbeat cada 2 segundos)
2. Activar IA híbrida inmediatamente
3. Notificar al jugador por push notification/email (si está configurado)
4. Al reconectar, sincronizar estado actual
5. Transferir control de IA a jugador

**Caso especial - Desconexión masiva**: Si más del 50% de jugadores pierden conexión simultáneamente, la carrera se pausa y se reanuda 5 minutos después (bandera roja virtual).

#### Buffer de Acciones Local

**Concepto**: Los comandos del jugador (cambiar mapa, riesgo, entrar a boxes) se guardan localmente si hay micro-cortes de conexión, enviándose cuando esta se restablece.

**Funcionamiento**:
```
Jugador pulsa: "Mapa 1 (ahorro)"
→ Acción guardada localmente con timestamp
→ Intento de envío al servidor
→ Si falla, queda en cola local
→ Cuando conexión vuelve, cola se envía
→ Servidor aplica acciones en orden temporal
```

**Límites**:
- Buffer máximo: 10 acciones
- Tiempo máximo en buffer: 30 segundos
- Si se excede, se descartan las más antiguas

**Prevención de trampas**: El servidor valida que las acciones tengan sentido (no puedes cambiar mapa 5 veces en 2 segundos). Acciones sospechosas se rechazan.

### Arquitectura Técnica Simplificada

```
┌─────────────────────────────────────────────────────┐
│                    SERVIDOR CENTRAL                  │
│  (Sincronización global, persistencia, matchmaking) │
└──────────────────────┬──────────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
│ Edge Europa │ │ Edge Améric │ │ Edge Asia   │
│ (Frankfurt) │ │ (N.York)    │ │ (Tokyo)     │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │
       └───────────────┼───────────────┘
                       │
           ┌───────────┼───────────┐
           │           │           │
      ┌────▼────┐ ┌────▼────┐ ┌────▼────┐
      │Jugador 1│ │Jugador 2│ │Jugador N│
      │(España) │ │(Brasil) │ │(Japón)  │
      └─────────┘ └─────────┘ └─────────┘
```

**WebSocket vs HTTP**:
- Carreras: WebSocket (tiempo real, bidireccional)
- Navegación normal: HTTP REST (más eficiente)
- Fallback: Si WebSocket falla, HTTP polling cada 1s

---

## 💳 MONETIZACIÓN ÉTICA ADICIONAL

### Pase de Temporada ($4.99/temporada)

- Desafíos extra con recompensas
- Skins exclusivas de esa temporada
- Estadísticas avanzadas desbloqueadas
- No afecta competitividad

### Pack "Apoya al Dev" ($1.99)

- Insignia de agradecimiento en perfil
- 1 skin exclusiva de agradecimiento
- Sin ventajas competitivas

### Merchandising Real (Opcional)

- Camisetas con diseños de skins del juego
- Integración con print-on-demand (sin inventario)

### LO QUE NUNCA EXISTIRÁ

- ❌ Loot boxes
- ❌ Pilotos/motos más rápidas por dinero
- ❌ "Energía" que limita jugar
- ❌ Acelerar entrenamientos
- ❌ Boosts de rendimiento

---

## 📊 RESUMEN: PROPUESTA ÚNICA

| Aspecto | Moto Pro Manager vs Competencia |
|---------|--------------------------------|
| **Física** | Piloto real (estatura/peso) + combustible + clima dinámico |
| **Setup** | 6 parámetros estilo GPRO pero simplificado (1-99) |
| **Visual** | 3D/2D toggle en tiempo real, no forzado |
| **Monetización** | Anuncios opcionales (no-VIP), todo contenido jugable gratis |
| **Progresión** | Degradación real por edad, veteranos útiles |
| **Clima** | Evolución por sesión, no predecible al 100% |
| **Circuitos** | 18 actuales + 12+ históricos, calendario dinámico cada temporada |
| **Accesibilidad** | Modo Escuela + feedback del piloto, profundidad para expertos |
| **Anti-frustración** | Setup de emergencia, veteranos valiosos |
| **Social** | Ligas privadas, desafíos, replays exportables |

---

*Documento actualizado: Febrero 2025*
*Basado en investigación de: wiki.gpro.net, igpmanager.com, MotoGP official*

---

## 📁 ESTRUCTURA DE CÓDIGO FUENTE (Flutter/Dart)

### Árbol de Directorios

```
/motogp_manager
├── /lib
│   ├── main.dart
│   ├── /models
│   │   ├── pilot.dart
│   │   ├── bike.dart
│   │   ├── circuit.dart
│   │   ├── weather.dart
│   │   ├── race_session.dart
│   │   ├── setup.dart
│   │   ├── team.dart
│   │   ├── player.dart
│   │   └── championship.dart
│   ├── /services
│   │   ├── race_simulator.dart
│   │   ├── weather_service.dart
│   │   ├── physics_engine.dart
│   │   ├── ai_strategy.dart
│   │   └── monetization.dart
│   ├── /screens
│   │   ├── login_screen.dart
│   │   ├── dashboard_screen.dart
│   │   ├── garage_screen.dart
│   │   ├── setup_screen.dart
│   │   ├── race_screen.dart
│   │   ├── results_screen.dart
│   │   ├── market_screen.dart
│   │   └── settings_screen.dart
│   ├── /widgets
│   │   ├── weather_widget.dart
│   │   ├── telemetry_widget.dart
│   │   ├── track_map.dart
│   │   ├── pit_strategy.dart
│   │   └── race_controls.dart
│   └── /utils
│       ├── constants.dart
│       └── helpers.dart
├── /assets
│   ├── /circuits
│   ├── /skins
│   ├── /sounds
│   └── /fonts
└── pubspec.yaml
```

### Descripción de Módulos

#### Models (Modelos de Datos)

| Archivo | Descripción |
|---------|-------------|
| `pilot.dart` | Atributos del piloto (10 stats), edad, físico, lesiones |
| `bike.dart` | Moto, nivel de piezas, setup actual |
| `circuit.dart` | Circuito con 5 factores, longitud, curvas |
| `weather.dart` | Estado climático, temperatura, evolución |
| `race_session.dart` | Sesión de carrera (FP, Qualy, Carrera) |
| `setup.dart` | 6 parámetros de configuración |
| `team.dart` | Equipo, staff, presupuesto |
| `player.dart` | Usuario, VIP, configuración |
| `championship.dart` | Temporada, calendario, clasificaciones |

#### Services (Lógica de Negocio)

| Archivo | Descripción |
|---------|-------------|
| `race_simulator.dart` | Simulación de carrera en tiempo real |
| `weather_service.dart` | Generación y evolución del clima |
| `physics_engine.dart` | Cálculos de masa, aerodinámica, consumo |
| `ai_strategy.dart` | IA de pilotos rivales |
| `monetization.dart` | VIP, anuncios, skins |

#### Screens (Pantallas)

| Archivo | Descripción |
|---------|-------------|
| `login_screen.dart` | Autenticación, registro |
| `dashboard_screen.dart` | Panel principal (Paddock) |
| `garage_screen.dart` | Gestión de moto y piloto |
| `setup_screen.dart` | Configuración de 6 parámetros |
| `race_screen.dart` | Visualización de carrera (2D/3D toggle) |
| `results_screen.dart` | Clasificaciones, estadísticas |
| `market_screen.dart` | Mercado de fichajes |
| `settings_screen.dart` | Configuración de usuario |

#### Widgets (Componentes UI)

| Archivo | Descripción |
|---------|-------------|
| `weather_widget.dart` | Widget de clima y pronóstico |
| `telemetry_widget.dart` | Datos en tiempo real durante carrera |
| `track_map.dart` | Mapa del circuito con posiciones |
| `pit_strategy.dart` | Selector de estrategia de paradas |
| `race_controls.dart` | Controles durante carrera (mapas, riesgo) |

### Stack Tecnológico Recomendado

| Componente | Tecnología |
|------------|------------|
| **Framework** | Flutter 3.x (iOS, Android, Web) |
| **Lenguaje** | Dart |
| **Backend** | Node.js + Express (actual) |
| **Base de datos** | TiDB (MySQL) + Redis (estado carrera) |
| **Tiempo real** | WebSocket para carreras |
| **3D** | Flutter + Unity integration (opcional) |
| **Estado** | Riverpod / Bloc |
| **API** | REST + GraphQL (opcional) |

---

## 💻 MODELOS DE DATOS EN CÓDIGO (Dart/Flutter)

### Pilot Model (`/lib/models/pilot.dart`)

```dart
class Pilot {
  final String id;
  String name;
  String nationality;
  int age;
  
  // Medidas físicas (impacto en todas las categorías)
  int height; // cm (160-195)
  int weight; // kg (55-85)
  int wingspan; // cm (160-200)
  
  // Atributos (1-100)
  int pureSpeed;
  int consistency;
  int braking;
  int acceleration;
  int tireManagement;
  int technique;
  int experience;
  int mental;
  int recovery;
  int bravery;
  
  // Estado
  double fatigue; // 0-100
  int injuries; // 0-100 (0 = sano)
  bool isReserve;
  
  // Cálculo automático
  double get bmi => weight / ((height / 100) * (height / 100));
  
  // Impacto físico en rendimiento
  Map<String, double> getPhysicalImpact() {
    return {
      'aerodynamics': (195 - height) * 0.15, // km/h bonus
      'acceleration': weight < 65 ? (65 - weight) * 0.4 : (weight > 75 ? (75 - weight) * 0.3 : 0),
      'stability': (weight - 55) * 0.2,
      'fatigueRate': (wingspan - 160) * 0.1,
    };
  }
  
  // Degradación por edad
  void applyAgeDegradation() {
    if (age > 27) pureSpeed -= 0.5;
    if (age > 29) acceleration -= 0.6;
    if (age > 30) consistency -= 0.3;
    if (age > 31) mental -= 0.5;
    if (age > 32) tireManagement -= 0.2;
    if (age > 29) recovery -= 1.0;
    if (age > 28) bravery -= 0.3;
  }
  
  // Coste de mejora según edad
  int getTrainingCost() {
    if (age <= 20) return 5000;
    if (age <= 26) return 10000;
    if (age <= 30) return 25000;
    if (age <= 34) return 60000;
    return 150000;
  }
}
```

### Circuit Model (`/lib/models/circuit.dart`)

```dart
class Circuit {
  final String id;
  String name;
  String country;
  double length; // km
  int corners;
  int longStraight; // metros
  Difficulty difficulty;
  
  // Factores únicos (1-10)
  int abrasiveness; // Desgaste neumáticos
  int naturalGrip; // Adherencia asfalto
  int bumps; // Irregularidades
  int overtakingZones; // Oportunidades de adelantamiento
  int surpriseFactor; // Cambios de condiciones
  
  // Tipo especial
  bool isNightRace;
  bool isHistoric; // Circuito no vigente en MotoGP actual
  
  // Clima típico (probabilidades base)
  Map<WeatherState, double> typicalWeather;
  
  Circuit({
    required this.id,
    required this.name,
    required this.country,
    required this.length,
    required this.corners,
    required this.longStraight,
    required this.difficulty,
    required this.abrasiveness,
    required this.naturalGrip,
    required this.bumps,
    required this.overtakingZones,
    required this.surpriseFactor,
    this.isNightRace = false,
    this.isHistoric = false,
    required this.typicalWeather,
  });
}

enum Difficulty { low, mediumLow, medium, mediumHigh, high }

// Lista de circuitos (vigentes + históricos)
final List<Circuit> allCircuits = [
  // Vigentes 2024
  Circuit(
    id: 'losail', 
    name: 'Losail', 
    country: 'Qatar', 
    length: 5.4, 
    corners: 16, 
    longStraight: 1068, 
    difficulty: Difficulty.mediumHigh, 
    abrasiveness: 6, 
    naturalGrip: 5, 
    bumps: 3, 
    overtakingZones: 7, 
    surpriseFactor: 4, 
    isNightRace: true, 
    typicalWeather: {WeatherState.sunny: 0.7, WeatherState.cloudy: 0.2, WeatherState.rain: 0.1}
  ),
  Circuit(
    id: 'portimao', 
    name: 'Portimão', 
    country: 'Portugal', 
    length: 4.6, 
    corners: 15, 
    longStraight: 970, 
    difficulty: Difficulty.high, 
    abrasiveness: 7, 
    naturalGrip: 6, 
    bumps: 8, 
    overtakingZones: 6, 
    surpriseFactor: 5, 
    typicalWeather: {WeatherState.sunny: 0.6, WeatherState.cloudy: 0.25, WeatherState.rain: 0.15}
  ),
  Circuit(
    id: 'cota', 
    name: 'COTA', 
    country: 'USA', 
    length: 5.5, 
    corners: 20, 
    longStraight: 1200, 
    difficulty: Difficulty.medium, 
    abrasiveness: 5, 
    naturalGrip: 4, 
    bumps: 9, 
    overtakingZones: 7, 
    surpriseFactor: 6, 
    typicalWeather: {WeatherState.sunny: 0.5, WeatherState.cloudy: 0.2, WeatherState.rain: 0.3}
  ),
  // ... más circuitos vigentes
  
  // Históricos épicos (desbloqueados en todas las categorías)
  Circuit(
    id: 'estoril', 
    name: 'Estoril', 
    country: 'Portugal', 
    length: 4.2, 
    corners: 13, 
    longStraight: 600, 
    difficulty: Difficulty.mediumHigh, 
    abrasiveness: 5, 
    naturalGrip: 4, 
    bumps: 6, 
    overtakingZones: 5, 
    surpriseFactor: 7, 
    isHistoric: true, 
    typicalWeather: {WeatherState.sunny: 0.6, WeatherState.cloudy: 0.3, WeatherState.rain: 0.1}
  ),
  Circuit(
    id: 'istanbul', 
    name: 'Istanbul Park', 
    country: 'Turkey', 
    length: 5.3, 
    corners: 14, 
    longStraight: 720, 
    difficulty: Difficulty.high, 
    abrasiveness: 6, 
    naturalGrip: 5, 
    bumps: 4, 
    overtakingZones: 8, 
    surpriseFactor: 5, 
    isHistoric: true, 
    typicalWeather: {WeatherState.sunny: 0.5, WeatherState.cloudy: 0.3, WeatherState.rain: 0.2}
  ),
  Circuit(
    id: 'brno', 
    name: 'Brno', 
    country: 'Czech Republic', 
    length: 5.4, 
    corners: 14, 
    longStraight: 650, 
    difficulty: Difficulty.mediumHigh, 
    abrasiveness: 6, 
    naturalGrip: 6, 
    bumps: 5, 
    overtakingZones: 6, 
    surpriseFactor: 6, 
    isHistoric: true, 
    typicalWeather: {WeatherState.sunny: 0.5, WeatherState.cloudy: 0.35, WeatherState.rain: 0.15}
  ),
  Circuit(
    id: 'indianapolis', 
    name: 'Indianapolis GP', 
    country: 'USA', 
    length: 4.2, 
    corners: 16, 
    longStraight: 800, 
    difficulty: Difficulty.medium, 
    abrasiveness: 7, 
    naturalGrip: 5, 
    bumps: 4, 
    overtakingZones: 6, 
    surpriseFactor: 5, 
    isHistoric: true, 
    typicalWeather: {WeatherState.sunny: 0.6, WeatherState.cloudy: 0.25, WeatherState.rain: 0.15}
  ),
];
```

### Weather Model (`/lib/models/weather.dart`)

```dart
enum WeatherState { sunny, cloudy, foggy, drizzle, rain, storm }

class Weather {
  WeatherState current;
  double trackTemp; // Celsius
  double airTemp;
  double humidity;
  double windSpeed; // km/h
  String windDirection;
  
  Weather({
    required this.current,
    required this.trackTemp,
    required this.airTemp,
    required this.humidity,
    required this.windSpeed,
    required this.windDirection,
  });
  
  // Evolución del clima (cambio durante sesión)
  Weather evolve(Circuit circuit) {
    // Lógica de cambio basada en factor sorpresa del circuito
    double changeProbability = circuit.surpriseFactor * 0.05;
    
    if (Random().nextDouble() < changeProbability) {
      // Cambia estado
      List<WeatherState> possible = _getPossibleTransitions(current);
      return Weather(
        current: possible[Random().nextInt(possible.length)],
        trackTemp: trackTemp + Random().nextDouble() * 4 - 2,
        airTemp: airTemp + Random().nextDouble() * 3 - 1.5,
        humidity: (humidity + Random().nextDouble() * 10 - 5).clamp(20, 95),
        windSpeed: (windSpeed + Random().nextDouble() * 10 - 5).clamp(0, 80),
        windDirection: windDirection, // Simplificado
      );
    }
    return this;
  }
  
  List<WeatherState> _getPossibleTransitions(WeatherState current) {
    switch(current) {
      case WeatherState.sunny: return [WeatherState.sunny, WeatherState.cloudy];
      case WeatherState.cloudy: return [WeatherState.sunny, WeatherState.cloudy, WeatherState.drizzle];
      case WeatherState.foggy: return [WeatherState.foggy, WeatherState.cloudy];
      case WeatherState.drizzle: return [WeatherState.cloudy, WeatherState.drizzle, WeatherState.rain];
      case WeatherState.rain: return [WeatherState.drizzle, WeatherState.rain, WeatherState.storm];
      case WeatherState.storm: return [WeatherState.rain, WeatherState.storm];
    }
  }
  
  // Impacto en neumáticos
  TireType getRecommendedTire() {
    switch(current) {
      case WeatherState.sunny:
      case WeatherState.cloudy:
        return TireType.slick;
      case WeatherState.foggy:
      case WeatherState.drizzle:
        return TireType.intermediate;
      case WeatherState.rain:
      case WeatherState.storm:
        return TireType.wet;
    }
  }
}

enum TireType { slick, intermediate, wet }
```

### Setup Model (`/lib/models/setup.dart`)

```dart
class Setup {
  // Escala 1-99 (no 1-999 como GPRO)
  int frontWing; // Alerón delantero
  int fairingHeight; // Altura carenado
  int engineMap; // Potencia vs consumo
  int brakeBalance; // Reparto frenada
  int transmission; // Velocidad punta vs aceleración
  int suspension; // Rígida vs blanda
  
  Setup({
    this.frontWing = 50,
    this.fairingHeight = 50,
    this.engineMap = 50,
    this.brakeBalance = 50,
    this.transmission = 50,
    this.suspension = 50,
  });
  
  // Margen de Aceptación (MA) según técnica del piloto
  int getAcceptanceMargin(int pilotTechnique) {
    return (45 - (0.15 * pilotTechnique).round() - (0.05 * pilotTechnique).round()).clamp(5, 40);
  }
  
  // Feedback del piloto (comparado con setup óptimo del circuito)
  Map<String, String> getPilotFeedback(Setup optimal, int pilotTechnique) {
    int ma = getAcceptanceMargin(pilotTechnique);
    Map<String, String> feedback = {};
    
    if ((frontWing - optimal.frontWing).abs() <= ma) {
      feedback['frontWing'] = 'Bien';
    } else if (frontWing < optimal.frontWing) {
      feedback['frontWing'] = 'Falta agarre en curvas lentas';
    } else {
      feedback['frontWing'] = 'Mucha resistencia en rectas';
    }
    
    // Similar para otros parámetros...
    
    return feedback;
  }
}
```

### Race Session Model (`/lib/models/race_session.dart`)

```dart
enum SessionType { fp1, fp2, fp3, fp4, sprint, q1, q2, warmUp, race }

class RaceSession {
  SessionType type;
  Circuit circuit;
  Weather weather;
  int totalLaps;
  int currentLap;
  List<RaceEntry> entries; // Pilotos participando
  
  RaceSession({
    required this.type,
    required this.circuit,
    required this.weather,
    required this.totalLaps,
    this.currentLap = 0,
    required this.entries,
  });
  
  // Coste por vuelta según sesión
  int getCostPerLap() {
    switch(type) {
      case SessionType.fp1:
      case SessionType.fp2:
      case SessionType.fp3:
      case SessionType.fp4:
        return 25000;
      case SessionType.sprint:
        return 40000;
      case SessionType.q1:
      case SessionType.q2:
        return 50000;
      case SessionType.warmUp:
        return 30000;
      case SessionType.race:
        return 0; // Ya pagado al inscribirse
    }
  }
}

class RaceEntry {
  Pilot pilot;
  Setup setup;
  double fuel; // Litros
  TireType tires;
  int engineMap; // 1=ahorro, 2=estándar, 3=ataque
  int riskLevel; // 0-100
  
  double currentPosition;
  double lastLapTime;
  double bestLapTime;
  double tireWear; // 0-100
  double fuelConsumption; // L/vuelta
  
  RaceEntry({
    required this.pilot,
    required this.setup,
    required this.fuel,
    required this.tires,
    this.engineMap = 2,
    this.riskLevel = 50,
    this.currentPosition = 0,
    this.lastLapTime = 0,
    this.bestLapTime = 999,
    this.tireWear = 0,
    this.fuelConsumption = 0,
  });
}
```

---

## ⚙️ SERVICIOS PRINCIPALES EN CÓDIGO (Dart/Flutter)

### Physics Engine (`/lib/services/physics_engine.dart`)

```dart
class PhysicsEngine {
  // Cálculo de tiempo por vuelta
  double calculateLapTime(RaceEntry entry, Circuit circuit, Weather weather, int lapNumber) {
    double baseTime = circuit.length * 30; // Base según longitud
    
    // 1. Impacto físico del piloto
    Map<String, double> physImpact = entry.pilot.getPhysicalImpact();
    baseTime -= physImpact['aerodynamics'] ?? 0; // km/h bonus reduce tiempo
    baseTime *= (1 - (physImpact['acceleration'] ?? 0) / 100);
    
    // 2. Impacto setup
    double setupEfficiency = _calculateSetupEfficiency(entry.setup, circuit);
    baseTime *= (2 - setupEfficiency); // 0.8-1.2
    
    // 3. Impacto clima
    baseTime *= _getWeatherMultiplier(weather, entry.tires);
    
    // 4. Impacto neumáticos
    double tireGrip = 1 - (entry.tireWear / 200); // 0.5-1.0
    baseTime *= (2 - tireGrip);
    
    // 5. Impacto combustible (peso)
    double fuelWeight = entry.fuel * 0.75; // kg
    baseTime *= (1 + fuelWeight / 1000); // +0.075s por kg aprox
    
    // 6. Impacto motor
    Map<int, double> engineMultipliers = {1: 1.03, 2: 1.0, 3: 0.98};
    baseTime *= engineMultipliers[entry.engineMap] ?? 1.0;
    
    // 7. Fatiga del piloto
    double fatiguePenalty = entry.pilot.fatigue / 500; // 0-0.2
    baseTime *= (1 + fatiguePenalty);
    
    // 8. Riesgo (velocidad vs errores)
    if (entry.riskLevel > 70 && Random().nextDouble() < 0.05) {
      // Error/casi caída
      baseTime += 2.0; // Pérdida de 2 segundos
    } else if (entry.riskLevel > 70) {
      baseTime *= 0.995; // Más rápido pero arriesgado
    }
    
    // 9. Drafting (si no es líder)
    if (entry.currentPosition > 1) {
      baseTime *= 0.98; // 2% más rápido por slipstream
    }
    
    return baseTime + Random().nextDouble() * 0.3; // Variación realista
  }
  
  double _calculateSetupEfficiency(Setup setup, Circuit circuit) {
    // Setup óptimo teórico para el circuito
    Setup optimal = _getOptimalSetup(circuit);
    
    // Comparar parámetros
    double diff = 0;
    diff += (setup.frontWing - optimal.frontWing).abs() / 99;
    diff += (setup.fairingHeight - optimal.fairingHeight).abs() / 99;
    diff += (setup.engineMap - optimal.engineMap).abs() / 99;
    diff += (setup.brakeBalance - optimal.brakeBalance).abs() / 99;
    diff += (setup.transmission - optimal.transmission).abs() / 99;
    diff += (setup.suspension - optimal.suspension).abs() / 99;
    
    return 1.2 - (diff / 6); // 0.8-1.2
  }
  
  Setup _getOptimalSetup(Circuit circuit) {
    // Setup óptimo basado en características del circuito
    return Setup(
      frontWing: circuit.corners > 15 ? 70 : 40, // Más agarre si muchas curvas
      fairingHeight: circuit.longStraight > 1000 ? 30 : 60, // Bajo si rectas largas
      engineMap: 50,
      brakeBalance: circuit.bumps > 6 ? 60 : 40, // Más trasero si baches
      transmission: circuit.longStraight > 1000 ? 80 : 30, // Larga si rectas
      suspension: circuit.bumps > 6 ? 20 : 70, // Blanda si baches
    );
  }
  
  double _getWeatherMultiplier(Weather weather, TireType tires) {
    // Penalización si neumáticos incorrectos
    bool correctTires = (weather.current == WeatherState.sunny && tires == TireType.slick) ||
                       (weather.current == WeatherState.drizzle && tires == TireType.intermediate) ||
                       (weather.current == WeatherState.rain && tires == TireType.wet);
    
    if (!correctTires) return 1.3; // 30% más lento, peligroso
    
    // Multiplicadores base por clima
    Map<WeatherState, double> multipliers = {
      WeatherState.sunny: 1.0,
      WeatherState.cloudy: 1.02,
      WeatherState.foggy: 1.08,
      WeatherState.drizzle: 1.05,
      WeatherState.rain: 1.12,
      WeatherState.storm: 1.20,
    };
    
    return multipliers[weather.current] ?? 1.0;
  }
  
  // Consumo de combustible
  double calculateFuelConsumption(RaceEntry entry, Circuit circuit) {
    double base = circuit.length / 15; // L/km base
    
    // Factor motor
    Map<int, double> engineFactors = {1: 0.9, 2: 1.0, 3: 1.15};
    base *= engineFactors[entry.engineMap] ?? 1.0;
    
    // Factor peso (más peso = más consumo)
    double totalWeight = 157 + entry.pilot.weight + (entry.fuel * 0.75);
    base *= (1 + (totalWeight - 230) / 1000);
    
    // Factor agresividad
    base *= (1 + entry.riskLevel / 200);
    
    return base;
  }
  
  // Desgaste de neumáticos
  double calculateTireWear(RaceEntry entry, Circuit circuit, Weather weather) {
    double base = circuit.abrasiveness * 0.5;
    
    // Clima
    if (weather.current == WeatherState.sunny && weather.trackTemp > 40) base *= 1.5;
    if (weather.current == WeatherState.rain) base *= 0.6;
    
    // Setup
    if (entry.setup.suspension < 30) base *= 1.2; // Suspensión blanda = más desgaste
    
    // Estilo
    base *= (1 + entry.riskLevel / 100);
    
    return base;
  }
}
```

### Race Simulator (`/lib/services/race_simulator.dart`)

```dart
class RaceSimulator {
  PhysicsEngine physics = PhysicsEngine();
  bool isRunning = false;
  
  Stream<RaceState> simulate(RaceSession session) async* {
    isRunning = true;
    
    for (int lap = 1; lap <= session.totalLaps && isRunning; lap++) {
      session.currentLap = lap;
      
      // Evolución del clima cada 3 vueltas
      if (lap % 3 == 0) {
        session.weather = session.weather.evolve(session.circuit);
      }
      
      // Calcular tiempos para cada piloto
      for (var entry in session.entries) {
        // Actualizar combustible
        entry.fuelConsumption = physics.calculateFuelConsumption(entry, session.circuit);
        entry.fuel -= entry.fuelConsumption;
        
        // Actualizar neumáticos
        double wear = physics.calculateTireWear(entry, session.circuit, session.weather);
        entry.tireWear += wear;
        
        // Calcular tiempo de vuelta
        entry.lastLapTime = physics.calculateLapTime(entry, session.circuit, session.weather, lap);
        
        // Actualizar fatiga
        entry.pilot.fatigue += 2 + (entry.pilot.wingspan - 160) * 0.02;
        
        // Verificar abandono (sin gasolina)
        if (entry.fuel <= 0) {
          entry.lastLapTime = 999; // Abandono
        }
        
        // Verificar caída (riesgo + desgaste neumáticos + clima)
        double crashProbability = (entry.riskLevel / 1000) + 
                                  (entry.tireWear / 500) + 
                                  (session.weather.current == WeatherState.rain ? 0.05 : 0);
        if (Random().nextDouble() < crashProbability) {
          // Caída
          entry.lastLapTime += 15; // Pérdida de tiempo
          entry.pilot.injuries += 10;
          // Posible abandono si lesión grave
        }
      }
      
      // Ordenar por posición (distancia recorrida)
      session.entries.sort((a, b) => a.currentPosition.compareTo(b.currentPosition));
      
      yield RaceState(
        lap: lap,
        entries: session.entries,
        weather: session.weather,
        messages: _generateMessages(session),
      );
      
      await Future.delayed(Duration(seconds: 2)); // 2 segundos por vuelta simulada
    }
    
    isRunning = false;
  }
  
  void stop() {
    isRunning = false;
  }
  
  List<String> _generateMessages(RaceSession session) {
    List<String> messages = [];
    
    // Alertas de clima
    if (session.weather.current == WeatherState.rain && session.weather.trackTemp > 30) {
      messages.add("⚠️ Pista secándose - Considerar neumáticos slicks");
    }
    
    // Alertas de combustible
    for (var entry in session.entries) {
      if (entry.fuel < entry.fuelConsumption * 3) {
        messages.add("⛽ ${entry.pilot.name} bajo de combustible");
      }
    }
    
    return messages;
  }
}

class RaceState {
  int lap;
  List<RaceEntry> entries;
  Weather weather;
  List<String> messages;
  
  RaceState({
    required this.lap,
    required this.entries,
    required this.weather,
    required this.messages,
  });
}
```

### Monetization Service (`/lib/services/monetization.dart`)

```dart
class MonetizationService {
  bool isVip = false;
  DateTime? lastAdWatched;
  
  // Verificar si puede jugar (no-VIP necesitan ver anuncio cada 24h)
  bool canPlay() {
    if (isVip) return true;
    if (lastAdWatched == null) return false;
    return DateTime.now().difference(lastAdWatched!).inHours < 24;
  }
  
  void watchAd() {
    lastAdWatched = DateTime.now();
    // Mostrar anuncio video 30s
  }
  
  // Compras
  void buyVip() {
    isVip = true;
    // Procesar pago $4.99/mes o $39.99/año
  }
  
  void buySkin(String skinId) {
    // Precios: $0.99 - $2.99
  }
  
  void buyAnimation(String animId) {
    // Precios: $0.49 - $1.49
  }
  
  void buyTeamNameChange() {
    // $0.99
  }
  
  void donateDev() {
    // $1.99 - Insignia + skin exclusiva agradecimiento
  }
}
```

---

## 📱 PANTALLAS PRINCIPALES EN CÓDIGO (Dart/Flutter)

### Race Screen (`/lib/screens/race_screen.dart`)

```dart
class RaceScreen extends StatefulWidget {
  final RaceSession session;
  
  RaceScreen({required this.session});
  
  @override
  _RaceScreenState createState() => _RaceScreenState();
}

class _RaceScreenState extends State<RaceScreen> {
  RaceSimulator simulator = RaceSimulator();
  bool is3D = true; // Toggle 3D/2D
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${widget.session.circuit.name} - Vuelta ${widget.session.currentLap}/${widget.session.totalLaps}'),
        actions: [
          // Toggle 3D/2D
          IconButton(
            icon: Icon(is3D ? Icons.videogame_asset : Icons.map),
            onPressed: () => setState(() => is3D = !is3D),
          ),
          // Chat (todos pueden usar)
          IconButton(
            icon: Icon(Icons.chat),
            onPressed: () => _showChat(),
          ),
        ],
      ),
      body: Column(
        children: [
          // Widget de clima
          WeatherWidget(weather: widget.session.weather),
          
          // Vista de carrera (3D o 2D)
          Expanded(
            child: is3D 
              ? RaceView3D(session: widget.session)
              : RaceView2D(session: widget.session),
          ),
          
          // Controles de estrategia (solo para tu piloto)
          StrategyControls(
            onEngineMapChanged: (map) => _updateEngineMap(map),
            onRiskChanged: (risk) => _updateRisk(risk),
            onPitStop: () => _requestPitStop(),
          ),
          
          // Telemetría en tiempo real
          TelemetryWidget(entry: _getMyEntry()),
        ],
      ),
    );
  }
  
  void _updateEngineMap(int map) {
    // Cambio inmediato por radio
    setState(() {
      _getMyEntry().engineMap = map;
    });
  }
  
  void _updateRisk(int risk) {
    setState(() {
      _getMyEntry().riskLevel = risk;
    });
  }
  
  void _requestPitStop() {
    // Entrada a boxes en siguiente vuelta
    // Cambio de neumáticos (si llueve o desgaste >80%)
  }
  
  RaceEntry _getMyEntry() {
    // Retornar el entry del jugador actual
    return widget.session.entries.first;
  }
  
  void _showChat() {
    // Chat accesible para todos (VIP y no-VIP)
    showModalBottomSheet(
      context: context,
      builder: (context) => ChatWidget(session: widget.session),
    );
  }
}
```

### Setup Screen (`/lib/screens/setup_screen.dart`)

```dart
class SetupScreen extends StatefulWidget {
  final Circuit circuit;
  final Pilot pilot;
  final Weather weather;
  
  SetupScreen({required this.circuit, required this.pilot, required this.weather});
  
  @override
  _SetupScreenState createState() => _SetupScreenState();
}

class _SetupScreenState extends State<SetupScreen> {
  Setup setup = Setup();
  Map<String, String> feedback = {};
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Setup - ${widget.circuit.name}'),
      ),
      body: Column(
        children: [
          // Clima actual
          WeatherWidget(weather: widget.weather),
          
          // Características del circuito
          _buildCircuitInfo(),
          
          // Sliders de setup
          Expanded(
            child: ListView(
              children: [
                _buildSetupSlider('Alerón Delantero', 'frontWing', 
                  'Más agarre curvas lentas', 'Menos resistencia rectas'),
                _buildSetupSlider('Altura Carenado', 'fairingHeight',
                  'Más estabilidad', 'Más agilidad'),
                _buildSetupSlider('Mapa Motor', 'engineMap',
                  'Potencia máxima', 'Ahorro consumo'),
                _buildSetupSlider('Reparto Frenos', 'brakeBalance',
                  'Más trasera', 'Más delantera'),
                _buildSetupSlider('Transmisión', 'transmission',
                  'Velocidad punta', 'Aceleración'),
                _buildSetupSlider('Suspensión', 'suspension',
                  'Rígida (pistas lisas)', 'Blanda (baches)'),
              ],
            ),
          ),
          
          // Feedback del piloto
          _buildPilotFeedback(),
          
          // Botón confirmar
          ElevatedButton(
            onPressed: () => _confirmSetup(),
            child: Text('Confirmar Setup'),
          ),
        ],
      ),
    );
  }
  
  Widget _buildCircuitInfo() {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(8),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildFactorChip('Abrasividad', widget.circuit.abrasiveness),
            _buildFactorChip('Grip', widget.circuit.naturalGrip),
            _buildFactorChip('Baches', widget.circuit.bumps),
            _buildFactorChip('Adelant.', widget.circuit.overtakingZones),
          ],
        ),
      ),
    );
  }
  
  Widget _buildFactorChip(String label, int value) {
    Color color = value > 7 ? Colors.red : (value < 4 ? Colors.green : Colors.orange);
    return Chip(
      label: Text('$label: $value'),
      backgroundColor: color.withOpacity(0.3),
    );
  }
  
  Widget _buildSetupSlider(String label, String param, String highLabel, String lowLabel) {
    return Card(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Column(
          children: [
            Text(label, style: TextStyle(fontWeight: FontWeight.bold)),
            Row(
              children: [
                Expanded(child: Text(lowLabel, style: TextStyle(fontSize: 10))),
                Text('${_getValue(param)}', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                Expanded(child: Text(highLabel, style: TextStyle(fontSize: 10), textAlign: TextAlign.right)),
              ],
            ),
            Slider(
              value: _getValue(param).toDouble(),
              min: 1,
              max: 99,
              divisions: 98,
              onChanged: (value) => _updateParam(param, value.round()),
            ),
          ],
        ),
      ),
    );
  }
  
  int _getValue(String param) {
    switch (param) {
      case 'frontWing': return setup.frontWing;
      case 'fairingHeight': return setup.fairingHeight;
      case 'engineMap': return setup.engineMap;
      case 'brakeBalance': return setup.brakeBalance;
      case 'transmission': return setup.transmission;
      case 'suspension': return setup.suspension;
      default: return 50;
    }
  }
  
  void _updateParam(String param, int value) {
    setState(() {
      switch (param) {
        case 'frontWing': setup.frontWing = value; break;
        case 'fairingHeight': setup.fairingHeight = value; break;
        case 'engineMap': setup.engineMap = value; break;
        case 'brakeBalance': setup.brakeBalance = value; break;
        case 'transmission': setup.transmission = value; break;
        case 'suspension': setup.suspension = value; break;
      }
      // Actualizar feedback
      feedback = setup.getPilotFeedback(
        PhysicsEngine()._getOptimalSetup(widget.circuit),
        widget.pilot.technique,
      );
    });
  }
  
  Widget _buildPilotFeedback() {
    if (feedback.isEmpty) return SizedBox();
    
    return Card(
      color: Colors.blue.shade50,
      child: Padding(
        padding: EdgeInsets.all(8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('${widget.pilot.name} dice:', style: TextStyle(fontWeight: FontWeight.bold)),
            ...feedback.entries.map((e) => Text('• ${e.key}: ${e.value}')),
          ],
        ),
      ),
    );
  }
  
  void _confirmSetup() {
    Navigator.pop(context, setup);
  }
}
```

### Dashboard Screen (`/lib/screens/dashboard_screen.dart`)

```dart
class DashboardScreen extends StatefulWidget {
  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  late Player player;
  late Team team;
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Moto Pro Manager'),
        actions: [
          IconButton(icon: Icon(Icons.settings), onPressed: () => _openSettings()),
          IconButton(icon: Icon(Icons.logout), onPressed: () => _logout()),
        ],
      ),
      drawer: _buildDrawer(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Info del equipo
            _buildTeamHeader(),
            
            // Próxima carrera
            _buildNextRace(),
            
            // Pilotos
            _buildPilotsSection(),
            
            // Clasificación
            _buildStandingsSection(),
            
            // Noticias/Eventos
            _buildNewsSection(),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _goToGarage(),
        child: Icon(Icons.garage),
        tooltip: 'Ir al Garaje',
      ),
    );
  }
  
  Widget _buildTeamHeader() {
    return Card(
      margin: EdgeInsets.all(8),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Row(
          children: [
            CircleAvatar(
              radius: 30,
              backgroundColor: Color(int.parse(team.primaryColor.replaceFirst('#', '0xFF'))),
              child: Text(team.name[0], style: TextStyle(fontSize: 24, color: Colors.white)),
            ),
            SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(team.name, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  Text('Presupuesto: \$${_formatMoney(team.budget)}'),
                  Text('Liga: ${team.league} | Posición: ${team.position}º'),
                ],
              ),
            ),
            if (!player.isVip)
              ElevatedButton(
                onPressed: () => _showVipOffer(),
                child: Text('VIP'),
                style: ElevatedButton.styleFrom(backgroundColor: Colors.amber),
              ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildNextRace() {
    return Card(
      margin: EdgeInsets.all(8),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Próxima Carrera', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Circuito: ${team.nextRace.circuit.name}'),
                    Text('País: ${team.nextRace.circuit.country}'),
                    Text('Fecha: ${_formatDate(team.nextRace.date)}'),
                  ],
                ),
                ElevatedButton(
                  onPressed: () => _prepareRace(),
                  child: Text('Preparar'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildPilotsSection() {
    return Card(
      margin: EdgeInsets.all(8),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Pilotos', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                TextButton(
                  onPressed: () => _goToMarket(),
                  child: Text('Mercado'),
                ),
              ],
            ),
            ...team.pilots.map((pilot) => ListTile(
              leading: CircleAvatar(child: Text('#${pilot.number ?? pilot.id}')),
              title: Text(pilot.name),
              subtitle: Text('Edad: ${pilot.age} | Overall: ${_calculateOverall(pilot)}'),
              trailing: pilot.injuries > 0 
                ? Chip(label: Text('Lesionado'), backgroundColor: Colors.red.shade100)
                : null,
              onTap: () => _showPilotDetails(pilot),
            )),
          ],
        ),
      ),
    );
  }
  
  Widget _buildDrawer() {
    return Drawer(
      child: ListView(
        children: [
          DrawerHeader(
            decoration: BoxDecoration(color: Colors.blue),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(team.name, style: TextStyle(color: Colors.white, fontSize: 20)),
                Text('\$${_formatMoney(team.budget)}', style: TextStyle(color: Colors.white70)),
              ],
            ),
          ),
          ListTile(leading: Icon(Icons.home), title: Text('Paddock'), onTap: () => {}),
          ListTile(leading: Icon(Icons.garage), title: Text('Garaje'), onTap: () => _goToGarage()),
          ListTile(leading: Icon(Icons.person), title: Text('Pilotos'), onTap: () => _goToPilots()),
          ListTile(leading: Icon(Icons.shopping_cart), title: Text('Mercado'), onTap: () => _goToMarket()),
          ListTile(leading: Icon(Icons.emoji_events), title: Text('Clasificación'), onTap: () => _goToStandings()),
          ListTile(leading: Icon(Icons.settings), title: Text('Configuración'), onTap: () => _openSettings()),
          Divider(),
          if (!player.isVip)
            ListTile(
              leading: Icon(Icons.star, color: Colors.amber),
              title: Text('Hacerse VIP'),
              onTap: () => _showVipOffer(),
            ),
        ],
      ),
    );
  }
  
  int _calculateOverall(Pilot pilot) {
    return ((pilot.pureSpeed + pilot.consistency + pilot.braking + pilot.acceleration + 
             pilot.tireManagement + pilot.technique + pilot.experience + pilot.mental + 
             pilot.recovery + pilot.bravery) / 10).round();
  }
  
  String _formatMoney(int amount) {
    if (amount >= 1000000) return '${(amount / 1000000).toStringAsFixed(1)}M';
    if (amount >= 1000) return '${(amount / 1000).toStringAsFixed(0)}K';
    return amount.toString();
  }
  
  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }
  
  void _prepareRace() {
    // Navegar a pantalla de preparación
  }
  
  void _goToGarage() {
    // Navegar a garaje
  }
  
  void _goToMarket() {
    // Navegar a mercado
  }
  
  void _goToPilots() {
    // Navegar a pilotos
  }
  
  void _goToStandings() {
    // Navegar a clasificación
  }
  
  void _openSettings() {
    // Abrir configuración
  }
  
  void _logout() {
    // Cerrar sesión
  }
  
  void _showVipOffer() {
    // Mostrar oferta VIP
  }
  
  void _showPilotDetails(Pilot pilot) {
    // Mostrar detalles del piloto
  }
}
```

---

## ⚙️ CONFIGURACIÓN DEL PROYECTO

### pubspec.yaml

```yaml
name: motogp_manager
description: MotoGP Manager - Simulador de gestión de motociclismo

version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  
  # UI
  cupertino_icons: ^1.0.2
  flutter_bloc: ^8.1.3  # State management
  
  # Gráficos 3D
  flutter_unity_widget: ^2022.2.0  # Para vista 3D (Unity embebido)
  
  # Red
  dio: ^5.3.0  # HTTP client
  web_socket_channel: ^2.4.0  # Tiempo real
  
  # Local
  hive: ^2.2.3  # Base de datos local
  shared_preferences: ^2.2.0
  
  # Monetización
  google_mobile_ads: ^3.0.0  # Anuncios
  in_app_purchase: ^3.1.11  # Compras
  
  # Utilidades
  intl: ^0.18.1  # Fechas/horas

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
  
  assets:
    - assets/circuits/
    - assets/skins/
    - assets/sounds/
```

### Dependencias Explicadas

| Paquete | Versión | Uso |
|---------|---------|-----|
| `flutter_bloc` | ^8.1.3 | Gestión de estado (BLoC pattern) |
| `flutter_unity_widget` | ^2022.2.0 | Integración Unity para vista 3D |
| `dio` | ^5.3.0 | Cliente HTTP para API REST |
| `web_socket_channel` | ^2.4.0 | Comunicación tiempo real en carreras |
| `hive` | ^2.2.3 | Base de datos local (offline) |
| `shared_preferences` | ^2.2.0 | Preferencias de usuario |
| `google_mobile_ads` | ^3.0.0 | Anuncios para no-VIP |
| `in_app_purchase` | ^3.1.11 | Compras VIP, skins, etc. |
| `intl` | ^0.18.1 | Formateo de fechas/idiomas |

---

## 🌐 VERSIÓN WEB 100% PARA REPLIT

> **NOTA**: Esta sección contiene la especificación completa para crear una versión web del juego optimizada para Replit.

### Stack Tecnológico Web

| Componente | Tecnología |
|------------|------------|
| **Frontend** | HTML5 + CSS3 + JavaScript vanilla |
| **Backend** | Node.js + Express + Socket.io |
| **Base de datos** | PostgreSQL (persistente) + Redis (carreras en vivo) |
| **Gráficos** | Three.js (3D) + Canvas 2D (alternativo) |
| **Hosting** | Replit (web-only) |

### Estructura de Archivos Web

```
/motogp-manager
├── /public
│   ├── index.html (login/registro)
│   ├── dashboard.html (panel principal)
│   ├── garage.html (garaje y setup)
│   ├── race.html (carrera en vivo)
│   ├── market.html (mercado de pilotos)
│   ├── profile.html (perfil y estadísticas)
│   ├── /css
│   │   ├── main.css (estilos globales)
│   │   ├── race.css (interfaz carrera)
│   │   └── components.css (botones, cards, etc.)
│   ├── /js
│   │   ├── main.js (navegación, auth)
│   │   ├── physics.js (motor físico)
│   │   ├── race-simulator.js (simulación carrera)
│   │   ├── weather.js (sistema clima)
│   │   ├── ui-renderer.js (Three.js + Canvas)
│   │   └── api-client.js (comunicación servidor)
│   └── /assets
│       ├── /circuits (SVG de cada pista)
│       ├── /helmets (cascos personalizables)
│       ├── /skins (texturas motos)
│       └── /sounds (motores, ambiente)
├── /server
│   ├── index.js (entry point)
│   ├── /routes (API REST)
│   ├── /models (PostgreSQL schemas)
│   ├── /services (lógica negocio)
│   └── /sockets (tiempo real carreras)
└── .replit (configuración)
```

### Paleta de Colores Oficial

**Primarios:**
- Rojo MotoGP: `#E10600`
- Negro carbón: `#1A1A1A`
- Gris oscuro: `#2D2D2D`
- Gris medio: `#4A4A4A`
- Gris claro: `#B0B0B0`
- Blanco hueso: `#F5F5F5`

**Acentos:**
- Dorado VIP: `#FFD700`
- Plata: `#C0C0C0`
- Bronce: `#CD7F32`
- Verde éxito: `#00C851`
- Rojo alerta: `#FF4444`
- Azul info: `#33B5E5`
- Amarillo warning: `#FFBB33`

### Tipografías

| Uso | Fuente | Fallback |
|-----|--------|----------|
| Títulos | 'Orbitron', sans-serif | system-ui |
| Cuerpo | 'Roboto', sans-serif | system-ui |
| Datos/telemetría | 'Roboto Mono', monospace | monospace |

### Componentes UI

**Botón Primario:**
```css
background: #E10600;
color: white;
border-radius: 4px;
padding: 12px 24px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.5px;
/* Hover */
background: #B80500;
/* Active */
transform: scale(0.98);
transition: all 0.2s ease;
```

**Botón Secundario:**
```css
background: transparent;
border: 2px solid #E10600;
color: #E10600;
/* Hover */
background: rgba(225, 6, 0, 0.1);
```

**Card:**
```css
background: #2D2D2D;
border-radius: 8px;
padding: 20px;
box-shadow: 0 4px 6px rgba(0,0,0,0.3);
/* Hover */
transform: translateY(-2px);
transition: 0.3s ease;
```

**Input:**
```css
background: #2D2D2D;
border: 1px solid #4A4A4A;
border-radius: 4px;
color: white;
padding: 12px 16px;
/* Focus */
border-color: #E10600;
box-shadow: 0 0 0 3px rgba(225, 6, 0, 0.2);
```

**Navbar:**
```css
background: #1A1A1A;
height: 64px;
border-bottom: 3px solid #E10600;
position: fixed;
top: 0;
z-index: 1000;
```

### Pantallas Principales

#### 1. Login/Registro (index.html)
- Fondo: imagen desenfocada de moto con overlay negro 70%
- Card central: max-width 400px, centrada
- Tabs: Iniciar sesión / Registrarse (switch animado)
- Campos: Email, Contraseña, Nacionalidad (dropdown 20 países)
- Botón: "ENTRAR AL PADDOCK"
- Link: "¿Olvidaste contraseña?"
- Opción: "Continuar como Invitado" (limitado)

#### 2. Dashboard (dashboard.html)
**Layout:** Grid 12 columnas

**Panel izquierda (3 cols):**
- Card "MI EQUIPO": moto personalizada, nombre, posición, puntos
- Card "PILOTO TITULAR": foto, stats radar, forma física, fatiga
- Botón "GESTIONAR GARAJE"

**Panel centro (6 cols):**
- Card "PRÓXIMA CARRERA": circuito, clima, temperatura, fecha
- Mini mapa circuito interactivo (SVG)
- Tabla clasificación provisional
- Botón "ESTRATEGIA DE CARRERA"

**Panel derecha (3 cols):**
- Card "NOTIFICACIONES"
- Card "LIGAS"
- Card "ECONOMÍA"
- Banner VIP (si no lo es)

#### 3. Garaje (garage.html)
**Tabs superiores:** PILOTO | MOTO | SETUP | ESTRATEGIA | PERSONALIZACIÓN

**Tab PILOTO:**
- Foto grande piloto
- 10 atributos con barras progreso (colores: rojo <40, amarillo 40-70, verde 70-90, dorado >90)
- Medidas físicas: sliders con impacto mostrado
- Botón "ENTRENAR"

**Tab MOTO:**
- Vista 3D moto rotatoria (Three.js)
- Piezas: Motor, Chasis, Electrónica, Aerodinámica, Frenos, Suspensión
- Cada pieza: nivel 1-20, coste mejora, botón

**Tab SETUP:**
- 6 sliders verticales (1-99)
- Panel "FEEDBACK DEL PILOTO"
- Botón "RESET EMERGENCIA" ($100,000)
- Botón "GUARDAR SETUP" (slots: Seco, Mojado, Intermedio)

**Tab ESTRATEGIA:**
- Combustible: slider 18-24L
- Neumáticos: grid 3x2 (XS, S, M, H, W, EW)
- Mapas de motor: 3 botones
- Estrategia paradas

**Tab PERSONALIZACIÓN:**
- Selectores colores: 2 moto, 2 uniforme, 1 casco
- Input número moto (2-99)
- Nombre piloto y equipo
- Preview 3D tiempo real
- Botón "COMPRAR SKIN"

#### 4. Carrera en Vivo (race.html)
**Header flotante:**
- "VUELTA 14/27" | "POS 4º" | "GAP +2.3s"
- Clima actual + temperatura
- Cronómetro + botón CHAT + toggle 3D/2D

**Área principal (80% altura):**
- Modo 3D (Three.js): cámara sigue moto, 60fps
- Modo 2D (Canvas): vista cenital, iconos circulares
- Transición crossfade 0.3s

**Panel lateral derecho (20%):**
- Telemetría: RPM, velocidad, marcha, temperatura neumáticos, desgaste, combustible
- Alertas: mensajes en tiempo real
- Controles: slider riesgo, botones mapa motor, botón "BOXES"

**Footer:**
- Mini mapa circuito posiciones
- Timeline carrera

**Overlays de Decisión:**
- Cambio clima: "¿Entrar a cambiar neumáticos?"
- Caída delantero: "¿Atacar o conservar?"
- Bandera amarilla: "¿Respetar o aprovechar?"

#### 5. Mercado (market.html)
**Tabs:** CONTRATAR PILOTO | CONTRATAR STAFF | DESARROLLO MOTO | PATROCINADORES

**Contratar Piloto:**
- Filtros: categoría, edad, nacionalidad, precio
- Cards con foto, stats radar, salario, cláusula
- Modal detalle: historial lesiones, trayectoria
- Botón "NEGOCIAR"

**Contratar Staff:**
- Roles: Jefe Equipo, Ingeniero, Preparador Físico, Mecánico, Data Engineer, Fisioterapeuta
- Habilidades específicas, salarios, bonus

**Desarrollo Moto:**
- Árbol tecnológico visual: 6 ramas
- Costes escalonados

**Patrocinadores:**
- 3 slots: Principal, Secundario, Terciario
- Objetivos exigidos, bonuses

#### 6. Perfil (profile.html)
- Card usuario: avatar, nombre, nivel, fecha registro
- Stats globales: gráficos ELO, victorias por circuito
- Hall of Fame: pilotos retirados, trofeos
- Configuración: contraseña, email, notificaciones, idioma, gráficos, sonido

### Sistema de Circuitos (18 Vigentes + Históricos)

**Vigentes 2024:**
1. Losail (Qatar) - nocturno, 5.4km, 16 curvas
2. Portimão (Portugal) - montaña, 4.6km, 15 curvas
3. COTA (USA) - baches, 5.5km, 20 curvas
4. Jerez (España) - técnico, 4.4km, 13 curvas
5. Le Mans (Francia) - frenadas, 4.2km, 14 curvas
6. Mugello (Italia) - rápido, 5.2km, 14 curvas
7. Barcelona (España) - equilibrado, 4.7km, 16 curvas
8. Sachsenring (Alemania) - izquierdas, 3.7km, 13 curvas
9. Assen (Holanda) - fluido, 4.5km, 18 curvas
10. Red Bull Ring (Austria) - corto, 4.3km, 10 curvas
11. Silverstone (UK) - cambiante, 5.9km, 18 curvas
12. Misano (Italia) - plano, 4.2km, 16 curvas
13. Aragón (España) - altiplano, 5.1km, 17 curvas
14. Motegi (Japón) - frenadas, 4.8km, 14 curvas
15. Phillip Island (Australia) - costero, 4.5km, 12 curvas
16. Buriram (Tailandia) - calor, 4.6km, 12 curvas
17. Sepang (Malasia) - tormentas, 5.5km, 15 curvas
18. Valencia (España) - final, 4.0km, 14 curvas

**Históricos Épicos:**
19. Estoril (Portugal) - clásico
20. Istanbul Park (Turquía) - curva 8 legendaria
21. Brno (Rep. Checa) - bosque
22. Indianapolis GP (USA) - óvalo
23. Phillip Island Antiguo (Australia) - sin chicane
24. Río de Janeiro (Brasil) - playa
25. Jarama (España) - histórico

### Cascos Personalizables

**Base del casco (3D modelo simple):**
- Forma: Oval estándar, Oval agresivo (punta), Redondo clásico
- Tamaño: Proporcional a estatura del piloto (piloto bajo = casco visualmente más proporcionado)

**Zonas personalizables (5 áreas):**
1. **Cúpula** (parte superior): Color base + diseño (rayas, degradados, flag)
2. **Visera**: Color tintado (claro, oscuro, espejo iridiscente, amarillo lluvia)
3. **Laterales**: Gráficos principales (número, bandera, patrocinadores pequeños)
4. **Mandíbula**: Color secundario + diseño
5. **Alerón trasero** (spoiler): Color, algunos modelos tienen formas aerodinámicas

**Herramienta de diseño:**
- Selector de color RGB para cada zona
- Galería de patrones: rayas, chevrons, flames, camuflaje, geométrico, banderas nacionales
- Importar imagen propia (validación tamaño/formato)
- Preview 3D rotatorio en tiempo real
- Guardar diseños (3 slots gratis, +5 con VIP)

**Cascos especiales de pago ($0.49-$0.99):**
- Réplicas históricas: Rossi "Sun & Moon", Marquez "Ant", Lorenzo "Samurai", Stoner "Repsol", etc.
- Ediciones limitadas temporales (eventos reales MotoGP)
- Colaboraciones (artistas, marcas)

**Impacto en gameplay:** Ninguno, puramente cosmético. Pero:
- Cascos únicos son visibles en replays y fotos de podio
- En modo 3D se ve claramente el diseño desde cámara onboard
- En modo 2D icono del piloto usa colores del casco para identificación rápida

### Fórmula de Tiempo por Vuelta

```
TiempoBase = (LongitudCircuito / VelocidadMediaTeórica) * 3600

Ajustes multiplicativos (0.8-1.2):
1. Piloto físico: (195-altura) * 0.15 km/h bonus
2. Peso total: 1 + ((pesoPiloto + combustible*0.75 - 70) / 1000)
3. Setup eficiencia: 1.2 - (diferenciaSetupÓptimo / 6)
4. Clima: 1.0 (seco) a 1.3 (tormenta)
5. Neumáticos: 1 - (desgaste/200)
6. Motor: 0.98 (ataque), 1.0 (estándar), 1.03 (ahorro)
7. Fatiga: 1 + (fatiga/500)
8. Riesgo: 0.995 (alto) o +2s (error)
9. Drafting: 0.98 (si no líder)
10. Combustible: 1 + (litrosSobrantes * 0.001)

Variación aleatoria: ±0.3s
```

### Economía Detallada

**Ingresos mensuales:**
| Concepto | Rango |
|----------|-------|
| Sponsor principal | $500k-$5M |
| Sponsor secundario | $100k-$1M |
| Sponsor terciario | $50k-$500k |
| Premios carrera | 1º $100k, 2º $75k, 3º $50k... |
| Bonus objetivos | Podio $25k, Pole $15k, VR $10k |

**Gastos mensuales:**
| Concepto | Rango |
|----------|-------|
| Piloto titular | $200k-$3M |
| Pilotos reserva | $80k-$1.3M |
| Staff (6 roles) | $50k-$5M |
| Desarrollo moto | Variable |
| Reparaciones | $10k-$200k |
| Vueltas entrenamiento | $25k-$50k/vuelta |

### Sistema de Ligas

**Temporada:** 20 carreras de 25 disponibles (rota cada temporada)

**Frecuencia:** 2 carreras/semana (martes 20:00, sábado 20:00 CET)

**Sprint Race:** Antes de clasificación, 5 vueltas, puntos 12-9-7-6-5-4-3-2-1

### Monetización Web

**No-VIP:**
- Banner inferior 320x50 durante navegación
- Interstitial 30s antes de carrera (>24h desde último)
- Video reward opcional: 30s por $10,000 juego (máx 3/día)

**VIP ($4.99/mes):**
- Sin banners ni interstitiales
- Sin límite video rewards
- Estadísticas avanzadas
- 1-2 skins regalo

**Compras in-app (Stripe/PayPal):**
| Producto | Precio |
|----------|--------|
| Skins moto | $0.99-$2.99 |
| Animaciones podio | $0.49-$1.49 |
| Cascos especiales | $0.49-$0.99 |
| Cambio nombre equipo | $0.99 |
| Donación dev | $1.99 (insignia + skin) |

### Requisitos Técnicos Replit

- Node.js 18+
- PostgreSQL (Replit Database o external)
- Redis (Upstash o Replit Key-Value)
- Three.js desde CDN
- Socket.io tiempo real
- HTML5 Canvas fallback
- Service Worker offline básico

**Optimización:**
- Modelos 3D low-poly (<1000 vértices)
- Texturas 512x512 máximo
- Lazy loading circuitos
- Compresión Gzip

### Implementación por Fases

**FASE 1 (Semanas 1-2): Core**
1. Setup proyecto Replit
2. Auth básico
3. Modelo Piloto con física
4. 3 circuitos básicos
5. Setup simple (3 parámetros)
6. Simulación carrera básica

**FASE 2 (Semanas 3-4): Profundidad**
7. 6 parámetros setup
8. Sistema clima dinámico
9. Combustible y estrategia
10. Three.js integrado
11. Canvas 2D alternativa
12. Toggle 3D/2D

**FASE 3 (Semanas 5-6): Contenido**
13. Todos los circuitos
14. Cascos personalizables
15. Skins sistema
16. Mercado pilotos/staff
17. Economía completa

**FASE 4 (Semanas 7-8): Multiplayer y Monetización**
18. Ligas y temporadas
19. Carreras tiempo real Socket.io
20. Chat
21. Anuncios
22. Pagos Stripe
23. Sistema VIP

**FASE 5 (Semana 9): Pulido**
24. Bug fixing
25. Optimización
26. Tests usuarios
27. Deploy producción

### Entregables Esperados

**Código fuente completo:**
- README.md detallado
- .env.example
- Script SQL tablas PostgreSQL
- Seed data: pilotos, circuitos, equipos
- Documentación API endpoints
- Guía despliegue

**Funcionalidad 100%:**
- Registro/login
- Crear equipo, personalizar moto/colores/casco
- Setup 6 parámetros con feedback
- Entrenar piloto
- Sesiones (FP, Qualy, Carrera) con clima
- Simulación tiempo real (3D + 2D)
- Estrategia combustible, neumáticos, mapas
- Resultados, clasificaciones, economía
- Ligas multijugador
- Anuncios no-VIP
- Sistema compras

**Calidad mínima:**
- 60fps en modo 3D
- <3s carga inicial
- Sin errores consola críticos
- Responsive (móvil web funcional)

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

## 🗄️ NOTAS TÉCNICAS TIDB

### Formato SQL para ALTER TABLE

> **IMPORTANTE**: TiDB requiere usar paréntesis cuando se añaden múltiples columnas en un solo ALTER TABLE.

#### ❌ Formato INCORRECTO (no funciona en TiDB)
```sql
ALTER TABLE pilotos
ADD COLUMN velocidad_pura INT DEFAULT 50,
ADD COLUMN consistencia INT DEFAULT 50,
ADD COLUMN frenada INT DEFAULT 50;
```

#### ✅ Formato CORRECTO (funciona en TiDB)
```sql
ALTER TABLE pilotos
ADD COLUMN (
    velocidad_pura INT DEFAULT 50,
    consistencia INT DEFAULT 50,
    frenada INT DEFAULT 50
);
```

### SQL Completo para Expandir Tabla Pilotos

```sql
-- 1. Borrar pilotos existentes (opcional)
DELETE FROM pilotos;

-- 2. Añadir todas las columnas nuevas
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

---

## 🧭 SISTEMA DE NAVEGACIÓN Y UI

### Menú Hamburguesa

El menú hamburguesa tiene un estilo distintivo que refleja la identidad visual del juego:

| Estado | Fondo | Icono |
|--------|-------|-------|
| **Cerrado** | Círculo rojo (#e10600) | Líneas negras |
| **Abierto** | Círculo negro (#000) | Líneas rojas |

**Código CSS:**
```css
.hamburger {
    width: 40px;
    height: 40px;
    background: var(--red);
    border-radius: 50%;
}

.hamburger-line {
    background: #000;  /* Negro cuando cerrado */
}

.hamburger.active {
    background: #000;  /* Negro cuando abierto */
}

.hamburger.active .hamburger-line {
    background: var(--red);  /* Rojo cuando abierto */
}
```

### Estructura de Navegación

```
┌─────────────────────────────────────────┐
│  🏁 Paddock                             │
├─────────────────────────────────────────┤
│  🏍️ Garaje                              │
│     ├── 👤 Pilotos                      │
│     └── 🏍️ Moto                         │
├─────────────────────────────────────────┤
│  ⚙️ Configuración                       │
│  🚪 Cerrar Sesión                       │
└─────────────────────────────────────────┘
```

### Submenú de Pilotos

Si un equipo tiene más de un piloto, aparece un submenú de selección que muestra:
- Nombre del piloto
- Media de atributos (promedio de 10 atributos)
- Rol (Principal/Suplente/Test)

```
┌─────────────────────────────────────────┐
│  MIS PILOTOS                            │
├─────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │   (M)   │ │   (A)   │ │   (J)   │   │
│  │ Marc    │ │ Ana     │ │ Jorge   │   │
│  │ ⭐ 78   │ │ ⭐ 72   │ │ ⭐ 65   │   │
│  │Principal│ │Suplente │ │ Test    │   │
│  └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
```

**Cálculo de media:**
```javascript
const media = (velocidad_pura + consistencia + frenada + aceleracion +
               gestion_neumaticos + tecnica + experiencia + mental +
               recuperacion + valentia) / 10;
```

---

*Última actualización: Febrero 2025*
