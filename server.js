const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de la Base de Datos con Conexión Segura (SSL)
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    }
};

const db = mysql.createPool(dbConfig);

// --- CONFIGURACIÓN DE SESIONES EN TIDB ---
const sessionStore = new MySQLStore({
    expiration: 86400000, // 24 horas en milisegundos
    createDatabaseTable: true, // Crea la tabla automáticamente
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, db);

app.use(session({
    secret: process.env.SESSION_SECRET || 'moto-pro-manager-secret-key-2025',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: false, // Cambiado a false para debug
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Archivos estáticos DESPUÉS de configurar sesiones
// Configurar caché para archivos estáticos
app.use(express.static('.', {
    maxAge: '7d', // 7 días de caché por defecto
    etag: true,
    lastModified: true
}));

// Caché más largo para imágenes y fondos (1 año)
app.use('/fondos', express.static('fondos', {
    maxAge: '1y',
    etag: true,
    lastModified: true,
    immutable: true
}));

// Caché para imágenes estáticas
app.use('/logo.png', express.static('logo.png', {
    maxAge: '1y',
    etag: true,
    immutable: true
}));
app.use('/favicon.png', express.static('favicon.png', {
    maxAge: '1y',
    etag: true,
    immutable: true
}));

// --- MIDDLEWARE DE AUTENTICACIÓN ---
const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/index.html?error=login');
};


const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Tu clave SMTP de Brevo
    }
});

// --- FUNCIONES HELPER PARA RESPUESTAS HTML CON ESTILO ---

const generarPagina = (titulo, mensaje, tipo = 'info', textoBoton = 'VOLVER AL LOGIN', enlaceBoton = 'index.html', autoRedirect = null) => {
    const colores = {
        success: { icon: '✅', color: '#2ecc71' },
        error: { icon: '❌', color: '#e10600' },
        warning: { icon: '⚠️', color: '#f39c12' },
        info: { icon: 'ℹ️', color: '#3498db' }
    };
    const { icon, color } = colores[tipo] || colores.info;
    
    // Por defecto, los mensajes de éxito redirigen automáticamente
    const shouldAutoRedirect = autoRedirect !== null ? autoRedirect : (tipo === 'success');
    
    const redirectScript = shouldAutoRedirect ? `
    <script>
        let segundos = 10;
        const destino = '${enlaceBoton}';
        const contadorEl = document.getElementById('contador');
        
        function actualizarContador() {
            contadorEl.innerText = segundos;
            if (segundos <= 0) {
                window.location.href = destino;
            } else {
                segundos--;
                setTimeout(actualizarContador, 1000);
            }
        }
        actualizarContador();
    </script>` : '';

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titulo} | Moto Pro Manager</title>
        <link rel="icon" type="image/png" href="favicon.png">
        <link rel="stylesheet" href="style.css">
        <style>
            .message-box { text-align: center; }
            .message-box h2 { color: ${color}; }
            .message-icon { font-size: 48px; margin-bottom: 15px; }
            .message-text { font-size: 16px; color: #555; margin: 15px 0; line-height: 1.6; }
            .redirect-info { 
                margin-top: 20px; 
                padding: 12px; 
                background: #f8f9fa; 
                border-radius: 8px; 
                font-size: 14px; 
                color: #666; 
            }
            .redirect-info .count { 
                font-weight: bold; 
                color: #e10600; 
                font-size: 18px; 
            }
            .logo-serie { width: 200px; height: auto; margin-bottom: 15px; }
        </style>
    </head>
    <body>
        <div class="card message-box">
            <img src="logo.png" alt="Moto Pro Manager" class="logo-serie">
            <div class="message-icon">${icon}</div>
            <h2>${titulo}</h2>
            <p class="message-text">${mensaje}</p>
            <button onclick="window.location.href='${enlaceBoton}'" class="btn-rojo">${textoBoton}</button>
            ${shouldAutoRedirect ? `<div class="redirect-info">Serás redirigido en <span id="contador" class="count">10</span> segundos...</div>` : ''}
        </div>
        ${redirectScript}
    </body>
    </html>
    `;
};

const generarEmailHtml = (subtitulo, mensaje, textoBoton, link) => {
    return `
    <div style="background-color: #0d0d0d; color: #ffffff; font-family: Arial, sans-serif; padding: 40px 20px; text-align: center; border-radius: 8px; max-width: 500px; margin: auto; border: 3px solid #e10600;">
        <img src="https://moto-pro-manager.onrender.com/logo.png" alt="Moto Pro Manager" style="width: 200px; margin-bottom: 20px;">
        <hr style="border: none; border-top: 1px solid #333; margin: 20px auto; width: 80%;">
        <h2 style="color: #e10600; font-size: 18px; text-transform: uppercase;">${subtitulo}</h2>
        <p style="font-size: 15px; color: #cccccc; line-height: 1.5;">${mensaje}</p>
        <div style="margin-top: 25px;">
            <a href="${link}" style="background-color: #e10600; color: #ffffff; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block; text-transform: uppercase;">
                ${textoBoton}
            </a>
        </div>
        <p style="margin-top: 35px; font-size: 10px; color: #555;">&copy; 2026 Moto Pro Manager - Pole Position</p>
    </div>
    `;
};


// --- RUTA REGISTRO ---
app.post('/registro', async (req, res) => {
    const { username, escuderia, email, password, captchaToken } = req.body;
    try {
        const verify = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`);
        
        // Threshold estándar (0.5), pero permitir emails de confianza
        const TRUSTED_EMAILS = ['tmogeid@gmail.com']; // Añade más si necesitas
        const isTrusted = TRUSTED_EMAILS.includes(email.toLowerCase());
        const threshold = isTrusted ? 0.1 : 0.5;
        
        if (!verify.data.success || verify.data.score < threshold) {
            console.log(`reCAPTCHA score: ${verify.data.score}, email: ${email}, trusted: ${isTrusted}`);
            return res.redirect('/registro_form.html?error=captcha');
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.redirect('/registro_form.html?error=password');
        }
        const hash = await bcrypt.hash(password, 10);
        const token = crypto.randomBytes(32).toString('hex');

        await db.execute(
            'INSERT INTO users (username, escuderia, email, password, verification_code) VALUES (?, ?, ?, ?, ?)',
            [username, escuderia, email, hash, token]
        );

        const linkVerificacion = `https://${req.get('host')}/verify?token=${token}`;

        const htmlRegistro = generarEmailHtml(
            "🏁 ACTIVACIÓN DE ESCUDERÍA",
            `¡Hola <b>${username}</b>!<br>Tu equipo <b>${escuderia}</b> está listo para competir. Pulsa el botón para verificar tu cuenta y entrar en el box.`,
            "VERIFICAR MI CUENTA",
            linkVerificacion
        );

        await transporter.sendMail({
            from: '"Moto Pro Manager" <tmogeid@gmail.com>',
            to: email,
            subject: "🏁 Activa tu cuenta - Moto Pro Manager",
            html: htmlRegistro
        });

        res.send(generarPagina(
            '🏁 REGISTRO COMPLETADO',
            `¡Bienvenido <b>${username}</b>!<br>Hemos enviado un email de verificación a <b>${email}</b>.<br>Revisa tu bandeja de entrada para activar tu cuenta.`,
            'success',
            'IR AL LOGIN',
            'index.html'
        ));
    } catch (e) {
        console.error("ERROR DETECTADO:", e);
        res.status(500).send(generarPagina(
            'ERROR DEL SERVIDOR',
            `Ha ocurrido un error inesperado.<br><small style="color:#888;">${e.message}</small>`,
            'error',
            'REINTENTAR',
            'registro_form.html'
        ));
    }
});

// --- RUTA VERIFICAR ---
app.get('/verify', async (req, res) => {
    const { token } = req.query;
    try {
        const [u] = await db.execute('SELECT id, username FROM users WHERE verification_code = ?', [token]);
        if (u.length > 0) {
            await db.execute('UPDATE users SET is_verified = 1, verification_code = NULL WHERE id = ?', [u[0].id]);
            res.redirect('/index.html?verified=true');
        } else {
            res.status(400).send(generarPagina(
                'TOKEN INVÁLIDO',
                'Este enlace de verificación no es válido o ya ha sido utilizado.<br>Si necesitas un nuevo enlace, intenta registrarte de nuevo.',
                'error',
                'IR AL LOGIN',
                'index.html',
                true
            ));
        }
    } catch (e) {
        res.status(500).send(generarPagina(
            'ERROR DE VERIFICACIÓN',
            'No se pudo completar la verificación. Por favor, inténtalo más tarde.',
            'error'
        ));
    }
});

// --- RUTA LOGIN ---
app.post('/login', async (req, res) => {
    const { email, password, rememberMe, captchaToken, userLanguage } = req.body;
    try {
        // Verificar reCAPTCHA
        const verify = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`);
        const TRUSTED_EMAILS = ['tmogeid@gmail.com'];
        const isTrusted = TRUSTED_EMAILS.includes(email.toLowerCase());
        const threshold = isTrusted ? 0.1 : 0.5;
        
        if (!verify.data.success || verify.data.score < threshold) {
            console.log(`reCAPTCHA score: ${verify.data.score}, email: ${email}, trusted: ${isTrusted}`);
            return res.status(401).send(generarPagina(
                'VERIFICACIÓN FALLIDA',
                'No hemos podido verificar que eres humano. Inténtalo de nuevo.',
                'warning',
                'REINTENTAR',
                'index.html',
                true
            ));
        }
        
        // Buscar por email O por username
        const [u] = await db.execute(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [email, email]
        );
        
        if (u.length > 0 && await bcrypt.compare(password, u[0].password)) {
            if (!u[0].is_verified) {
                return res.status(401).send(generarPagina(
                    'CUENTA NO VERIFICADA',
                    `Debes verificar tu email antes de iniciar sesión.<br>Revisa tu bandeja de entrada o carpeta de spam.`,
                    'warning',
                    'VOLVER',
                    'index.html',
                    true
                ));
            }
            
            // GESTIÓN DE IDIOMA
            // Si el usuario no tiene idioma en BD y viene uno en el formulario (desde cookies), guardarlo
            let userLang = u[0].language;
            if (!userLang && userLanguage) {
                const validLangs = ['es', 'eslat', 'en', 'pt', 'fr', 'de', 'it', 'ru', 'zh', 'ja'];
                if (validLangs.includes(userLanguage)) {
                    userLang = userLanguage;
                    await db.execute('UPDATE users SET language = ? WHERE id = ?', [userLang, u[0].id]);
                    console.log(`[LOGIN] Guardado idioma inicial ${userLang} para usuario ${u[0].username}`);
                }
            }
            // Si ya tiene idioma en BD, usar ese (se actualizará la cookie en el frontend)
            
            // Configurar duración de sesión según rememberMe
            if (rememberMe === 'on') {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 días
            } else {
                req.session.cookie.maxAge = 24 * 60 * 60 * 1000; // 24 horas
            }
            
            // Guardar usuario en sesión
            req.session.userId = u[0].id;
            req.session.username = u[0].username;
            req.session.escuderia = u[0].escuderia;
            req.session.budget = u[0].budget || 0;
            req.session.language = userLang || 'es';
            
            // Guardar sesión y redirigir con HTML para asegurar que la cookie se establezca
            req.session.save((err) => {
                if (err) {
                    console.error("Error guardando sesión:", err);
                    return res.status(500).send(generarPagina(
                        'ERROR EN LOGIN',
                        'No se pudo iniciar sesión. Por favor, inténtalo más tarde.',
                        'error'
                    ));
                }
                
                // Enviar página HTML que redirige con JavaScript (asegura cookie establecida)
                res.send(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="refresh" content="1;url=/paddock">
                    <title>Accediendo... | Moto Pro Manager</title>
                    <link rel="icon" type="image/png" href="favicon.png">
                    <link rel="stylesheet" href="style.css">
                    <style>.logo-serie { width: 200px; height: auto; margin-bottom: 15px; }</style>
                </head>
                <body>
                    <div class="card message-box" style="text-align:center;">
                        <img src="logo.png" alt="Moto Pro Manager" class="logo-serie">
                        <h2 style="color:#2ecc71;">✅ ACCESO CONCEDIDO</h2>
                        <p>Bienvenido <b>${u[0].username}</b>!</p>
                        <p>Redirigiendo al Paddock...</p>
                        <div class="loader"></div>
                    </div>
                    <script>
                        // Guardar idioma del usuario en cookies
                        const userLang = '${userLang || 'es'}';
                        document.cookie = 'language=' + encodeURIComponent(userLang) + '; path=/; SameSite=Lax; max-age=31536000';
                        setTimeout(function() {
                            window.location.href = '/paddock';
                        }, 1000);
                    </script>
                </body>
                </html>
                `);
            });
        } else {
            res.status(401).send(generarPagina(
                'CREDENCIALES INCORRECTAS',
                'El email o la contraseña que has introducido no son correctos.<br>¿Has olvidado tu contraseña?',
                'error',
                'REINTENTAR',
                'index.html',
                true
            ));
        }
    } catch (e) {
        console.error("ERROR EN LOGIN:", e);
        res.status(500).send(generarPagina(
            'ERROR EN LOGIN',
            'No se pudo procesar el inicio de sesión. Por favor, inténtalo más tarde.',
            'error'
        ));
    }
});

// --- RUTA LOGOUT ---
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error("Error al cerrar sesión:", err);
        res.redirect('/index.html');
    });
});

// --- RUTA PADDOCK (protegida) ---
app.get('/paddock', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'paddock.html'));
});

// --- RUTA: CONFIGURACIÓN ---
app.get('/configuracion', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'configuracion.html'));
});

// --- RUTA: PILOTO ---
app.get('/piloto', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'piloto.html'));
});

// --- API: DATOS DEL PILOTO ---
app.get('/api/piloto', requireAuth, async (req, res) => {
    try {
        const [pilotos] = await db.execute(
            `SELECT
                id, nombre, numero, user_id, numero_updated_at,
                ritmo, concentracion, frenada, aceleracion,
                tecnica, experiencia, motivacion,
                recuperacion, agresividad, resistencia, talento,
                estatura, peso, envergadura,
                edad, fecha_nacimiento,
                lesion_tipo, lesion_inicio, lesion_duracion,
                entrenador_id, entrenamiento_atributo, entrenamiento_carreras_restantes,
                rol, estado, fatiga, avatar, created_at, updated_at
            FROM pilotos WHERE user_id = ?`,
            [req.session.userId]
        );
        if (pilotos.length > 0) {
            // Devolver array de pilotos (para soportar múltiples pilotos en el futuro)
            res.json(pilotos);
        } else {
            res.json({ error: 'Sin piloto' });
        }
    } catch (e) {
        console.error("ERROR OBTENIENDO PILOTO:", e);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// --- API: ACTUALIZAR NÚMERO DEL PILOTO ---
app.post('/api/update-piloto-numero', requireAuth, async (req, res) => {
    try {
        const { numero } = req.body;
        const userId = req.session.userId;

        // Validar número
        if (!numero || numero < 1 || numero > 99) {
            return res.status(400).json({ error: 'El número debe estar entre 1 y 99' });
        }

        // Verificar que el usuario tiene un piloto
        const [piloto] = await db.execute(
            'SELECT id, numero_updated_at FROM pilotos WHERE user_id = ?',
            [userId]
        );

        if (piloto.length === 0) {
            return res.status(404).json({ error: 'No tienes un piloto asignado' });
        }

        // Verificar restricción de 24 horas
        const lastUpdate = piloto[0].numero_updated_at;
        if (lastUpdate) {
            const lastUpdateDate = new Date(lastUpdate);
            const now = new Date();
            const diffHours = (now - lastUpdateDate) / (1000 * 60 * 60);
            
            if (diffHours < 24) {
                const hoursRemaining = Math.ceil(24 - diffHours);
                return res.status(400).json({ 
                    error: `Debes esperar ${hoursRemaining} horas para editar el número nuevamente` 
                });
            }
        }

        // Actualizar número y fecha de actualización
        await db.execute(
            'UPDATE pilotos SET numero = ?, numero_updated_at = NOW() WHERE user_id = ?',
            [numero, userId]
        );

        console.log(`[API] Número de piloto actualizado a ${numero} para usuario ${userId}`);
        res.json({ success: true, numero: numero });

    } catch (e) {
        console.error("ERROR ACTUALIZANDO NÚMERO PILOTO:", e);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// --- API: DATOS DEL USUARIO ---
app.get('/api/user-data', requireAuth, async (req, res) => {
    try {
        const [u] = await db.execute('SELECT id, username, email, escuderia, budget, language FROM users WHERE id = ?', [req.session.userId]);
        if (u.length > 0) {
            // Verificar si es admin (email específico)
            const ADMIN_EMAILS = ['tmogeid@gmail.com'];
            const isAdmin = ADMIN_EMAILS.includes(u[0].email.toLowerCase());
            
            console.log(`[API] user-data para usuario ${u[0].username}: language=${u[0].language}, isAdmin=${isAdmin}`);
            res.json({
                id: u[0].id,
                username: u[0].username,
                email: u[0].email,
                escuderia: u[0].escuderia,
                budget: u[0].budget || 0,
                language: u[0].language || 'es',
                isAdmin: isAdmin,
                notify_email: true,
                notify_races: true,
                notify_news: false
            });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (e) {
        console.error("ERROR OBTENIENDO DATOS:", e);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// --- API: VERIFICAR SI ES ADMIN ---
app.get('/api/is-admin', requireAuth, async (req, res) => {
    try {
        const [u] = await db.execute('SELECT email FROM users WHERE id = ?', [req.session.userId]);
        if (u.length > 0) {
            const ADMIN_EMAILS = ['tmogeid@gmail.com'];
            const isAdmin = ADMIN_EMAILS.includes(u[0].email.toLowerCase());
            res.json({ isAdmin });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (e) {
        console.error("ERROR VERIFICANDO ADMIN:", e);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// --- API ADMIN: AÑADIR CAMPO AVATAR A PILOTOS ---
app.post('/api/admin/ensure-avatar-column', requireAuth, async (req, res) => {
    try {
        // Verificar que es admin
        const [u] = await db.execute('SELECT email FROM users WHERE id = ?', [req.session.userId]);
        const ADMIN_EMAILS = ['tmogeid@gmail.com'];
        if (!ADMIN_EMAILS.includes(u[0]?.email.toLowerCase())) {
            return res.status(403).json({ error: 'No autorizado' });
        }
        
        // Intentar añadir la columna si no existe
        try {
            await db.execute('ALTER TABLE pilotos ADD COLUMN avatar LONGTEXT NULL');
            res.json({ success: true, message: 'Columna avatar añadida' });
        } catch (alterErr) {
            // Si la columna ya existe, ignorar el error
            if (alterErr.code === 'ER_DUP_FIELDNAME' || alterErr.message.includes('Duplicate column')) {
                res.json({ success: true, message: 'La columna avatar ya existe' });
            } else {
                throw alterErr;
            }
        }
    } catch (e) {
        console.error("ERROR AÑADIENDO COLUMNA AVATAR:", e);
        res.status(500).json({ error: 'Error del servidor: ' + e.message });
    }
});

// --- API ADMIN: GENERAR AVATARES PARA TODOS LOS PILOTOS ---
app.post('/api/admin/generate-avatars', requireAuth, async (req, res) => {
    try {
        // Verificar que es admin
        const [userCheck] = await db.execute('SELECT email FROM users WHERE id = ?', [req.session.userId]);
        const ADMIN_EMAILS = ['tmogeid@gmail.com'];
        if (!ADMIN_EMAILS.includes(userCheck[0]?.email.toLowerCase())) {
            return res.status(403).json({ error: 'No autorizado' });
        }
        
        // Asegurar que existe la columna avatar
        try {
            await db.execute('ALTER TABLE pilotos ADD COLUMN avatar LONGTEXT NULL');
        } catch (alterErr) {
            // Ignorar si ya existe
        }
        
        // Obtener todos los pilotos con sus datos
        const [pilotos] = await db.execute(`
            SELECT id, nombre, edad, peso 
            FROM pilotos
        `);
        
        if (pilotos.length === 0) {
            return res.json({ success: true, message: 'No hay pilotos para actualizar', updated: 0 });
        }
        
        // Generar y guardar avatar para cada piloto
        let updated = 0;
        const errors = [];
        
        for (const piloto of pilotos) {
            try {
                // Generar avatar como SVG con datos del piloto
                const avatarSvg = generateAvatarSvg(piloto.id, piloto.edad || 25, piloto.peso || 70);
                
                // Guardar en BD
                await db.execute(
                    'UPDATE pilotos SET avatar = ? WHERE id = ?',
                    [avatarSvg, piloto.id]
                );
                updated++;
            } catch (pilotoErr) {
                errors.push(`Piloto ${piloto.id} (${piloto.nombre}): ${pilotoErr.message}`);
            }
        }
        
        res.json({ 
            success: true, 
            message: `Avatares generados: ${updated}/${pilotos.length}`,
            updated,
            total: pilotos.length,
            errors: errors.length > 0 ? errors : undefined
        });
        
    } catch (e) {
        console.error("ERROR GENERANDO AVATARES:", e);
        res.status(500).json({ error: 'Error del servidor: ' + e.message });
    }
});

// --- FUNCIÓN: GENERAR AVATAR SVG ---
function generateAvatarSvg(pilotoId, edad, peso) {
    // Generador determinista basado en ID
    const seededRandom = (seed) => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    
    let seed = pilotoId * 1000;
    const rand = () => seededRandom(seed++);
    const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
    
    // Colores de piel
    const skinColors = ['#f5d0c5', '#e8beac', '#d4a574', '#c68642', '#8d5524', '#f1c27d', '#ffdbac', '#c9a66b'];
    const skinColor = skinColors[randInt(0, skinColors.length - 1)];
    
    // Colores de pelo según edad
    let hairColor;
    if (edad >= 50) {
        hairColor = rand() < 0.7 ? '#c0c0c0' : '#808080';
    } else if (edad >= 40) {
        hairColor = rand() < 0.4 ? '#808080' : '#3e2723';
    } else if (edad >= 30) {
        const youngColors = ['#3e2723', '#5d4037', '#4a3728', '#1a1a1a', '#8d5524'];
        hairColor = rand() < 0.15 ? '#808080' : youngColors[randInt(0, youngColors.length - 1)];
    } else {
        const youngColors = ['#3e2723', '#5d4037', '#4a3728', '#1a1a1a', '#8d5524', '#d4a574'];
        hairColor = youngColors[randInt(0, youngColors.length - 1)];
    }
    
    // Color de ojos
    const eyeColors = ['#4a3728', '#5d4037', '#3e2723', '#1a237e', '#0d47a1', '#2e7d32'];
    const eyeColor = eyeColors[randInt(0, eyeColors.length - 1)];
    
    // Forma de cara según peso
    const weightFactor = (peso - 70) / 30;
    const faceWidth = 45 + weightFactor * 5;
    const faceHeight = 55 - weightFactor * 3;
    
    // Calvicie según edad
    const baldProb = edad >= 45 ? 0.3 : (edad >= 35 ? 0.15 : 0.02);
    const isBald = rand() < baldProb;
    
    // Estilo de pelo
    const hairStyle = randInt(0, 4);
    
    // Gafas según edad
    const hasGlasses = edad >= 35 && rand() < (edad - 30) * 0.02;
    
    // Generar SVG
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
            <clipPath id="headClip">
                <circle cx="60" cy="55" r="48"/>
            </clipPath>
            <radialGradient id="skinGrad" cx="40%" cy="30%">
                <stop offset="0%" style="stop-color:${skinColor}"/>
                <stop offset="100%" style="stop-color:${adjustColor(skinColor, -20)}"/>
            </radialGradient>
        </defs>
        
        <!-- Cuello -->
        <ellipse cx="60" cy="110" rx="22" ry="12" fill="${adjustColor(skinColor, -15)}"/>
        
        <!-- Cabeza -->
        <ellipse cx="60" cy="55" rx="${faceWidth}" ry="${faceHeight}" fill="url(#skinGrad)"/>
        
        <!-- Orejas -->
        <ellipse cx="${60 - faceWidth - 3}" cy="55" rx="6" ry="10" fill="${skinColor}"/>
        <ellipse cx="${60 + faceWidth + 3}" cy="55" rx="6" ry="10" fill="${skinColor}"/>
        
        ${isBald && edad >= 35 ? `
            <!-- Pelo lateral (calvo) -->
            <ellipse cx="${60 - faceWidth + 5}" cy="35" rx="12" ry="18" fill="${hairColor}"/>
            <ellipse cx="${60 + faceWidth - 5}" cy="35" rx="12" ry="18" fill="${hairColor}"/>
        ` : `
            <!-- Pelo normal -->
            ${generateHairStyle(hairStyle, hairColor, faceWidth, faceHeight)}
        `}
        
        <!-- Cejas -->
        <rect x="${60 - 28}" y="40" width="16" height="3" rx="1.5" fill="#3e2723" transform="rotate(-5 ${60 - 20} 41)"/>
        <rect x="${60 + 12}" y="40" width="16" height="3" rx="1.5" fill="#3e2723" transform="rotate(5 ${60 + 20} 41)"/>
        
        <!-- Ojos -->
        <ellipse cx="${60 - 15}" cy="52" rx="9" ry="7" fill="white"/>
        <ellipse cx="${60 + 15}" cy="52" rx="9" ry="7" fill="white"/>
        <circle cx="${60 - 15}" cy="52" r="5" fill="${eyeColor}"/>
        <circle cx="${60 + 15}" cy="52" r="5" fill="${eyeColor}"/>
        <circle cx="${60 - 15}" cy="52" r="2" fill="black"/>
        <circle cx="${60 + 15}" cy="52" r="2" fill="black"/>
        <circle cx="${60 - 13}" cy="50" r="1.5" fill="white"/>
        <circle cx="${60 + 17}" cy="50" r="1.5" fill="white"/>
        
        <!-- Nariz -->
        <path d="M60 55 L56 70 Q60 73 64 70 L60 55" fill="${adjustColor(skinColor, -10)}"/>
        
        <!-- Boca -->
        <path d="M50 80 Q60 86 70 80" stroke="#c17f7f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        
        ${hasGlasses ? `
            <!-- Gafas -->
            <circle cx="${60 - 15}" cy="52" r="12" fill="none" stroke="#1a1a1a" stroke-width="2"/>
            <circle cx="${60 + 15}" cy="52" r="12" fill="none" stroke="#1a1a1a" stroke-width="2"/>
            <line x1="${60 - 3}" y1="52" x2="${60 + 3}" y2="52" stroke="#1a1a1a" stroke-width="2"/>
            <line x1="${60 - 27}" y1="52" x2="${60 - 35}" y2="48" stroke="#1a1a1a" stroke-width="2"/>
            <line x1="${60 + 27}" y1="52" x2="${60 + 35}" y2="48" stroke="#1a1a1a" stroke-width="2"/>
            <circle cx="${60 - 15}" cy="52" r="10" fill="rgba(135,206,235,0.15)"/>
            <circle cx="${60 + 15}" cy="52" r="10" fill="rgba(135,206,235,0.15)"/>
        ` : ''}
        
        <!-- Mejillas si tiene más peso -->
        ${peso > 80 ? `
            <ellipse cx="${60 - 30}" cy="68" rx="${8 + (peso - 80) * 0.3}" ry="6" fill="${adjustColor(skinColor, -5)}" opacity="0.5"/>
            <ellipse cx="${60 + 30}" cy="68" rx="${8 + (peso - 80) * 0.3}" ry="6" fill="${adjustColor(skinColor, -5)}" opacity="0.5"/>
        ` : ''}
    </svg>`;
    
    return svg;
}

// Función auxiliar para ajustar colores
function adjustColor(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Función auxiliar para generar estilo de pelo
function generateHairStyle(style, color, faceWidth, faceHeight) {
    const centerX = 60;
    const topY = 55 - faceHeight;
    
    switch(style) {
        case 0: // Pelo corto
            return `<ellipse cx="${centerX}" cy="${topY + 8}" rx="${faceWidth + 3}" ry="${faceHeight * 0.3}" fill="${color}"/>`;
        case 1: // Pelo con flequillo
            return `
                <ellipse cx="${centerX}" cy="${topY + 5}" rx="${faceWidth + 5}" ry="${faceHeight * 0.35}" fill="${color}"/>
                <rect x="${centerX - 25}" y="${topY + 5}" width="50" height="12" rx="6" fill="${color}"/>
            `;
        case 2: // Pelo hacia atrás
            return `<ellipse cx="${centerX}" cy="${topY + 3}" rx="${faceWidth}" ry="${faceHeight * 0.25}" fill="${color}"/>`;
        case 3: // Pelo lateral
            return `
                <ellipse cx="${centerX}" cy="${topY + 6}" rx="${faceWidth + 4}" ry="${faceHeight * 0.32}" fill="${color}"/>
                <rect x="${centerX - 30}" y="${topY + 3}" width="20" height="15" rx="4" fill="${color}" transform="rotate(-10 ${centerX - 20} ${topY + 10})"/>
            `;
        case 4: // Rapado
            return `<ellipse cx="${centerX}" cy="${topY + 8}" rx="${faceWidth - 2}" ry="${faceHeight * 0.15}" fill="${color}" opacity="0.7"/>`;
        default:
            return `<ellipse cx="${centerX}" cy="${topY + 8}" rx="${faceWidth + 2}" ry="${faceHeight * 0.28}" fill="${color}"/>`;
    }
}

// --- API: ACTUALIZAR IDIOMA DEL USUARIO ---
app.post('/api/update-language', requireAuth, async (req, res) => {
    try {
        const { language } = req.body;
        const validLangs = ['es', 'eslat', 'en', 'pt', 'fr', 'de', 'it', 'ru', 'zh', 'ja'];

        if (!language || !validLangs.includes(language)) {
            return res.status(400).json({ error: 'Idioma no válido' });
        }

        await db.execute(
            'UPDATE users SET language = ? WHERE id = ?',
            [language, req.session.userId]
        );

        res.json({ success: true, language });
    } catch (e) {
        console.error("ERROR ACTUALIZANDO IDIOMA:", e);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// --- API: ACTUALIZAR DATOS DE CUENTA ---
app.post('/api/update-account', requireAuth, async (req, res) => {
    try {
        const { username, email, escuderia, language } = req.body;
        const validLangs = ['es', 'eslat', 'en', 'pt', 'fr', 'de', 'it', 'ru', 'zh', 'ja'];

        console.log(`[API] update-account recibido: username=${username}, language=${language}`);

        if (!username || !email) {
            return res.status(400).json({ error: 'Nombre de usuario y email son obligatorios' });
        }

        // Verificar que el email no esté en uso por otro usuario
        const [existing] = await db.execute(
            'SELECT id FROM users WHERE email = ? AND id != ?',
            [email, req.session.userId]
        );
        if (existing.length > 0) {
            return res.status(400).json({ error: 'El email ya está en uso' });
        }

        // Verificar que el username no esté en uso por otro usuario
        const [existingUser] = await db.execute(
            'SELECT id FROM users WHERE username = ? AND id != ?',
            [username, req.session.userId]
        );
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
        }

        // Validar idioma
        const lang = validLangs.includes(language) ? language : 'es';
        console.log(`[API] Guardando idioma: ${lang} para usuario ${req.session.userId}`);

        await db.execute(
            'UPDATE users SET username = ?, email = ?, escuderia = ?, language = ? WHERE id = ?',
            [username, email, escuderia || null, lang, req.session.userId]
        );

        // Actualizar datos de sesión
        req.session.username = username;

        console.log(`[API] Cuenta actualizada correctamente. Idioma guardado: ${lang}`);
        res.json({ success: true, username, email, escuderia, language: lang });
    } catch (e) {
        console.error("ERROR ACTUALIZANDO CUENTA:", e);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// --- API: SOLICITAR CAMBIO DE CONTRASEÑA ---
app.post('/api/request-password-change', requireAuth, async (req, res) => {
    try {
        // Obtener email del usuario
        const [users] = await db.execute(
            'SELECT email, username FROM users WHERE id = ?',
            [req.session.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = users[0];

        // Generar token de reset
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpires = new Date(Date.now() + 3600000); // 1 hora

        await db.execute(
            'UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?',
            [resetToken, resetExpires, req.session.userId]
        );

        // Enviar email
        const resetLink = `https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:3000'}/password-reset?token=${resetToken}`;

        await transporter.sendMail({
            from: `"Moto Pro Manager" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Cambio de Contraseña - Moto Pro Manager',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
                    <img src="https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:3000'}/logo.png" alt="Moto Pro Manager" style="width: 200px; margin-bottom: 20px;">
                    <h2 style="color: #e10600;">Solicitud de Cambio de Contraseña</h2>
                    <p>Hola <strong>${user.username}</strong>,</p>
                    <p>Has solicitado cambiar tu contraseña. Haz clic en el siguiente enlace:</p>
                    <a href="${resetLink}" style="display: inline-block; background: #e10600; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">Cambiar Contraseña</a>
                    <p style="color: #666; font-size: 12px;">Este enlace expira en 1 hora.</p>
                </div>
            `
        });

        res.json({ success: true, message: 'Email enviado' });
    } catch (e) {
        console.error("ERROR SOLICITANDO CAMBIO PASSWORD:", e);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// --- RUTAS PASSWORD RESET --
app.get('/password-reset', (req, res) => {
    res.sendFile(path.join(__dirname, 'reset_password.html'));
});

app.post('/request-reset', async (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000);
    const [result] = await db.execute('UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?', [token, expires, email]);

    if (result.affectedRows > 0) {
        const linkReset = `https://${req.get('host')}/password-reset?token=${token}`;

        const htmlReset = generarEmailHtml(
            "🔑 RECUPERAR ACCESO",
            `Has solicitado restablecer la contraseña de tu cuenta.<br>Si no has sido tú, ignora este mensaje. Si quieres continuar, pulsa el botón de abajo.`,
            "CAMBIAR CONTRASEÑA",
            linkReset
        );

        await transporter.sendMail({
            from: '"Moto Pro Manager" <tmogeid@gmail.com>',
            to: email,
            subject: "🔑 Recuperar Contraseña - Moto Pro Manager",
            html: htmlReset
        });
    }
    res.send(generarPagina(
        '📧 EMAIL ENVIADO',
        `Si el email <b>${email}</b> está registrado, recibirás instrucciones para restablecer tu contraseña.<br>Revisa también la carpeta de spam.`,
        'success',
        'VOLVER AL LOGIN',
        'index.html'
    ));
});

app.post('/execute-reset', async (req, res) => {
    const { token, password } = req.body;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.redirect(`/password-reset?token=${token}&error=password`);
    }
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.execute('UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ? AND reset_expires > NOW()', [hash, token]);
    if (result.affectedRows > 0) {
        res.send(generarPagina(
            '✅ CONTRASEÑA ACTUALIZADA',
            'Tu contraseña ha sido actualizada correctamente.<br>Ya puedes iniciar sesión con tu nueva contraseña.',
            'success',
            'IR AL LOGIN',
            'index.html'
        ));
    } else {
        res.status(400).send(generarPagina(
            'ENLACE EXPIRADO',
            'Este enlace de recuperación ha expirado o no es válido.<br>Solicita uno nuevo si necesitas cambiar tu contraseña.',
            'error',
            'SOLICITAR NUEVO',
            'forgot_password.html'
        ));
    }
});

// Keep-alive para Render
setInterval(() => { axios.get(`https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:3000'}/`).catch(() => {}); }, 600000);

app.listen(process.env.PORT || 3000, () => console.log("Servidor Online 🏁"));
