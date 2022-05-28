'use strict';

// Importando módulos
import express from 'express';
import cors from 'cors';

// Importando rutas
import rutas from './routes/routes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// CORS solución error privacy policy
app.use(cors())

// Prefijo para la ruta
app.use('/api/v1', rutas)

app.listen(PORT, () => {

    console.log(`RESTFUL API corriendo en: http://localhost:${PORT}/api/v1/`);

});
