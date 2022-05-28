'use strict'
import pool from '../db.js'
import Usuario from './Usuario.js'

export default class Admin extends Usuario {

    deletePregunta(id, callback) {
        let sql = "DELETE FROM preguntas WHERE id =? ";
        pool.query(sql, [id], (err, rows) => {
            if (err) return callback({ status: false, protocol: "err", message: "Hubo un error con la base de datos" });
            if (rows.affectedRows === 0) {
                callback({ status: false, protocol: "err", message: "La ID de la pregunta no es valida" });
            } else {
                callback({ status: true, protocol: "success", message: "Pregunta eliminada" });
            }

        })
    }

    addPregunta(Pregunta, callback) {
        let sql = "INSERT INTO preguntas (pregunta, opciones, respuestaCorrecta, inforRelevante, dificultad) VALUES (?, ?, ?, ?, ?)";
        pool.query(sql, [Pregunta.getPregunta(), Pregunta.getOpciones(), Pregunta.getRespuestaCorrecta(), Pregunta.getInforRelevante(), Pregunta.getDificultad()], (err, rows) => {
            if (err) {
                console.log(err);
                callback({ status: false, protocol: "err", message: "Hubo un error con la base de datos" });
            }else if(rows.affectedRows === 1){
                callback({ status: true, protocol: "success", data:rows.insertId });
            }else{
                callback({status: false, protocol: "err", message:"No se ha añadido la pregunta"})
            }
        })
    }

    getValoracion() {

    }
}