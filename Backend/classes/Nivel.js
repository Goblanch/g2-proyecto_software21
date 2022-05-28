'use strict'

import Pregunta from './Pregunta.js';

export default class Nivel {

    constructor(Preguntas = [], numAciertos, numFallos, vidas) {
        this.Preguntas = Preguntas;
        this.numAciertos = numAciertos;
        this.numFallos = numFallos;
        this.vidas = vidas;
    }

    getNumAciertos() {
        return this.numAciertos;
    }

    getNumFallos() {
        return this.numFallos;
    }

    getVidas() {
        return this.vidas;
    }


}