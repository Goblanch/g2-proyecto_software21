'use strict';

import express from 'express';
import UserController from '../controller/usuarios.js';
import PreguntaController from '../controller/preguntas.js';
import EstadisticasController from '../controller/estadisticas.js';

const router = express.Router();

// Rutas `GET`
router.get("/check-status", UserController.CheckStatus);
router.get('/ranking', EstadisticasController.TopJugadores);
router.post("/validate-token", UserController.Validate);


//Rutas POST
router.post("/login", UserController.Login);
router.post("/register", UserController.Register);
router.post("/add-pregunta", PreguntaController.AddPregunta);
router.post("/delete-pregunta", PreguntaController.DeletePregunta);

export default router;