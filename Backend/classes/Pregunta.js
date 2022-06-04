'use strict'
import pool from '../db.js';

export default class Pregunta {

    constructor(pregunta = null, opciones = [], respuestaCorrecta = null, inforRelevante = null, dificultad = null, id, respuesta) {
        if (pregunta && opciones && respuestaCorrecta && inforRelevante && dificultad) {
            this.pregunta = pregunta;
            this.opciones = opciones;
            this.respuestaCorrecta = respuestaCorrecta;
            this.inforRelevante = inforRelevante;
            this.dificultad = dificultad;
        }
        if(id && respuesta){
            this.id = id;
            this.respuesta = respuesta;
        }

    }
    getPreguntaPorId(id, callback) {
        let sql = "SELECT * FROM preguntas WHERE id =?";
        pool.query(sql, [id], (err, rows) => {
            if(err) {console.log(err); callback({status:false,protocol:"err", message:"Hubo un error con la base de datos"});}
            callback({status:true, protocol:"success", data:rows})
        })
    }

    devolverPreguntas(callback) {
        let sql = "SELECT id, pregunta, opciones, respuestaCorrecta, inforRelevante, dificultad FROM preguntas";
        pool.query(sql, [], (err, rows) => {
            if(err) {console.log(err); callback({status:false,protocol:"err", message:"Hubo un error con la base de datos"});}
            callback({status:true, protocol:"success", data:rows})
        })
    }

    validarPregunta(callback) {
        let sql = "SELECT * FROM preguntas WHERE id = ?";
        pool.query(sql, [this.id, this.respuesta], (err, rows) => {
            if (err) {
                console.log(err);
                callback({
                    status:false,
                    protocol:"err",
                    message:"Hubo un error con la base de datos"
                })
            } else{
                callback({
                    status:true,
                    protocol:"success",
                    respuesta: rows[0].respuestaCorrecta
                })
            }
        })
    }

    getRespuestaCorrecta() {
        return this.respuestaCorrecta;
    }

    getPregunta() {
        return this.pregunta;
    }

    getValoracion() {
        return this.valoracion;
    }

    getDificultad() {
        return this.dificultad;
    }

    getOpciones() { //Array
        return this.opciones;
    }

    getInforRelevante() {
        return this.inforRelevante;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

}