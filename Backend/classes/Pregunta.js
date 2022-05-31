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
    

    validarPregunta(callback) {
        let sql = "SELECT * FROM preguntas WHERE id = ? AND respuestaCorrecta = ?";
        pool.query(sql, [this.id, this.respuesta], (err, rows) => {
            if (err) {
                console.log(err);
                callback({
                    status:false,
                    protocol:"err",
                    message:"Hubo un error con la base de datos"
                })
            }else if(rows.length <=0){
                callback({
                    status:false,
                    protocol:"err",
                    message:"La respuesta es incorrecta"
                })
            }else{
                callback({
                    status:true,
                    protocol:"success"
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
