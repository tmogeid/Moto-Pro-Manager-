# INSTRUCCIONES PARA REINICIO DE SESIÓN

## Token de GitHub
```
[TOKEN GUARDADO EN SECRETO - Pedir al usuario si es necesario]
```

## Repositorio
```
https://github.com/tmogeid/Moto-Pro-Manager-
```

## Instrucciones al Reiniciar
1. Clonar el repositorio
2. Leer minuciosamente todos los archivos .md
3. **AVISAR INMEDIATAMENTE al usuario que se ha reiniciado la sesión** (ej: "🔄 Sesión reiniciada")
4. Al final de cada mensaje, informar de los tokens gastados en total de la **nueva sesión** (sin sumar tokens de sesiones anteriores). Formato: `Tokens: [contador real] (estimación: ~X)`
5. Guardar estas instrucciones para futuros reinicios
6. **Al final de la sesión, preparar un resumen detallado para el mensaje de reinicio** (problemas, cambios, commits, estado final)

---

## Historial de Sesiones

### Sesión 1-2 (Febrero 2025)
**Cambios principales realizados:**

#### Atributos Renombrados:
| Antes | Después |
|-------|---------|
| Velocidad pura | Ritmo |
| Consistencia | Concentración |
| Mental | Motivación |
| Valentía | Agresividad |
| Gestión neumáticos | Eliminado (fusionado con Técnica y Experiencia) |
| - | Talento (nuevo) |

#### Atributos Finales (10):
1. **Ritmo** - Mantener tiempos consistentes durante carrera | -5/temp tras 28
2. **Concentración** - Evitar errores. Fórmula: `(100-C)/10 ±1` | -3/temp tras 30
3. **Frenada** - Frenar tarde, adelantar en frenada | -4/temp tras 29
4. **Aceleración** - Salida de curvas, tracción | -6/temp tras 27
5. **Técnica** - Setup + neumáticos + desgaste piezas (-10% máx) | No baja
6. **Experiencia** - Circuitos + accidentes + neumáticos + desgaste piezas (-10% máx) | -1/temp siempre (-3 si no corre)
7. **Motivación** - `Mot/10` = bonus a todos (excepto Téc y Exp) | -10/temp
8. **Recuperación** - Volver de lesiones antes | -10/temp tras 29
9. **Agresividad** - Arriesgar + autonomía decisiones | -3/temp tras 28
10. **Talento** - Primera curva, adelantamiento, bloqueo, lluvia | -5/temp tras 31

#### Atributos Físicos:
- **Estatura**: 155-210cm (Base 175cm)
  - Velocidad punta: `(175 - estatura) × 0.2 km/h`
  - Estabilidad: `(estatura - 175) × 0.08%`
  - Riesgo caída: `(175 - estatura) × 0.15%` (negativo = más estable)

- **Peso**: 55-100kg (Base 70kg)
  - Aceleración: `(70 - peso) × 0.5%`
  - Frenada: `(70 - peso) × 0.3%`
  - Control: `(peso - 70) × 0.2%`

- **Envergadura**: `Estatura + random(-10 a +15cm)` (Base 170cm)
  - Control curvas: `(Envergadura - 170) × 0.15%`
  - Fatiga brazos: `(Envergadura - 170) × 0.4%`

#### Desgaste de Piezas:
```
Reducción = (Técnica × 0.10%) + (Experiencia × 0.10%)
Máximo combinado: -20%
```

#### Archivos Actualizados:
- server.js (columnas BD)
- piloto.html (atributosInfo)
- CONTEXT.md
- GAMES_REFERENCE.md
- 10 locale files (es, en, pt, fr, de, it, ru, zh, ja, eslat)

#### Cambios en Navegación:
- "Sede" → "Garaje"
- Submenú Garaje: Pilotos, Moto
- Menú hamburguesa: círculo rojo + icono negro (invierte al abrir)

### Sesión 3 (Febrero 2025)
**Resumen:**
- Solucionado error "no pilots" (server.js no tenía push)
- Corregido repositorio corrupto (package.json era de Next.js)
- Limpiado repositorio: 369 MB → 67 MB
- Eliminada muestra de rol en piloto.html
- Ordenamiento de pilotos por media en lugar de rol
- Añadido caché HTTP para archivos estáticos
- Creado preload-fondos.js para precargar imágenes
- Añadido aviso obligatorio al reiniciar sesión

---

## ⚠️ ERRORES COMETIDOS Y LECCIONES APRENDIDAS

### Sesión de Febrero 2025

#### Error 1: Olvidar hacer git push
**Problema:** Se modificaron archivos localmente pero NO se hizo push a GitHub. Render seguía usando código antiguo.
**Síntoma:** Los logs de Render mostraban errores de columnas antiguas (`velocidad_pura`, `consistencia`, etc.) aunque localmente el código estaba actualizado.
**Solución:** SIEMPRE verificar con `git status` y hacer `git add . && git commit -m "mensaje" && git push origin main` después de cada cambio importante.
**Lección:** Verificar que el push fue exitoso ANTES de decir "está hecho".

#### Error 2: Push a rama incorrecta
**Problema:** Se hizo push a `master` pero Render está configurado para usar `main`.
**Síntoma:** El push aparecía exitoso pero Render no detectaba cambios.
**Solución:** Verificar qué rama usa Render (`main` en este caso) y hacer push a esa rama específica:
```bash
git push origin main --force  # si es necesario sobrescribir
```

#### Error 3: No verificar el resultado real
**Problema:** Se asumió que los cambios estaban en producción sin verificar los logs.
**Síntoma:** Usuario reportaba que seguía igual, pero no se revisaron los logs hasta que lo pidió.
**Solución:** Después de cada deploy, verificar los logs de Render para confirmar que el nuevo código está funcionando.

#### Error 4: Asumir que el usuario ejecutó SQL que no ejecutó
**Problema:** Se asumió que el usuario había ejecutado el ALTER TABLE en TiDB cuando no lo había hecho.
**Lección:** Preguntar explícitamente si ejecutaron comandos SQL antes de asumir que la base de datos está actualizada.

#### Error 5: Corromper el repositorio con force push incorrecto
**Problema:** Se hizo force push desde un repositorio incorrecto que contenía archivos del entorno de Super Z, sobrescribiendo el historial correcto.
**Síntoma:** Render daba error "Cannot find module server.js" porque el package.json era de Next.js, no de Moto Pro.
**Solución:** Resetear al último commit correcto (`git reset --hard <commit>`) y rehacer los cambios necesarios.
**Lección:** NUNCA hacer force push sin verificar que el repositorio local es el correcto y tiene el contenido adecuado.

---

## 📋 FLUJO OBLIGATORIO PARA CAMBIOS

### Antes de hacer cambios:
1. `git status` - Ver estado actual
2. `git pull origin main` - Traer cambios remotos
3. `pwd` - Verificar que estás en el directorio correcto

### Después de hacer cambios:
1. `git status` - Verificar qué archivos cambiaron
2. `git add .` - Añadir todos los cambios
3. `git commit -m "Mensaje descriptivo"` - Commitear
4. `git push origin main` - **Push a MAIN, no master**
5. Verificar en Render que el deploy se completó
6. Verificar logs de Render para confirmar que funciona

### Comando rápido:
```bash
git status && git add . && git commit -m "mensaje" && git push origin main
```

---

## 🔧 CONFIGURACIÓN DE RENDER

- **Rama conectada:** `main`
- **Auto-deploy:** Activado (después de push)
- **Comando start:** `node server.js`
- **Puerto:** Definido por Render (process.env.PORT)

---

## 🗄️ ESTADO ACTUAL DE LA BASE DE DATOS

### Tabla `pilotos` - Columnas:
- id, nombre, numero, user_id, numero_updated_at
- ritmo, concentracion, frenada, aceleracion
- tecnica, experiencia, motivacion
- recuperacion, agresividad, talento
- estatura, peso, envergadura
- edad, fecha_nacimiento
- lesion_tipo, lesion_inicio, lesion_duracion
- entrenador_id, entrenamiento_atributo, entrenamiento_carreras_restantes
- rol, estado, created_at, updated_at

### ⚠️ IMPORTANTE:
- Los pilotos del usuario se borraron (causa desconocida)
- Usuario necesita insertar nuevo piloto manualmente si no tiene

---

## 🎯 TAREAS PENDIENTES

- [ ] Insertar pilotos para el usuario
- [ ] Verificar que la página piloto.html funciona correctamente
- [ ] Confirmar que no se muestra el "rol" en ningún lado (ya implementado)
