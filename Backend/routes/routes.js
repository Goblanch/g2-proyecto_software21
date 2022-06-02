'use strict';

import express from 'express';
import UserController from '../controller/usuarios.js';
import PreguntaController from '../controller/preguntas.js';
import EstadisticasController from '../controller/estadisticas.js';

const router = express.Router();

// Rutas `GET`
router.get("/check-status", UserController.CheckStatus);
router.get('/ranking', EstadisticasController.TopJugadores);
router.get('/nivel-diario', PreguntaController.ConstruirNivel);
router.get('/estadistica', EstadisticasController.EstadisticaJugador);


//Rutas POST
router.post("/login", UserController.Login);
router.post("/register", UserController.Register);
router.post("/add-pregunta", PreguntaController.AddPregunta);
router.post("/delete-pregunta", PreguntaController.DeletePregunta);
router.post("/validate-token", UserController.Validate);
router.post("/validar-pregunta", PreguntaController.ValidarPregunta);
router.post('/preguntas', PreguntaController.DevolverPreguntas);
router.post('/pregunta-id', PreguntaController.PreguntaPorID);

export default router;
