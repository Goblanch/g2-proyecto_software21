'use strict'
export default class Pregunta {

    constructor(pregunta = null, opciones = [], respuestaCorrecta = null, inforRelevante = null, dificultad = null) {
        if (pregunta && opciones && respuestaCorrecta && inforRelevante && dificultad) {
            this.pregunta = pregunta;
            this.opciones = opciones;
            this.respuestaCorrecta = respuestaCorrecta;
            this.inforRelevante = inforRelevante;
            this.dificultad = dificultad;
        }

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

    setId(id){
        this.id=id;
    }

}