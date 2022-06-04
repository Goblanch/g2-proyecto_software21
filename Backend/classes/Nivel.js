'use strict'


import pool from '../db.js';
export default class Nivel {

    constructor(vidas) {
        this.Preguntas = [];
        this.error;
        this.getPreguntasPorDificultad(0, 5).then((valor) => { 
            this.Preguntas = this.Preguntas.concat(valor);
            this.getPreguntasPorDificultad(1, 3).then((valor) => { 
                this.Preguntas = this.Preguntas.concat(valor);
                this.getPreguntasPorDificultad(2, 2).then((valor) => { 
                    this.Preguntas = this.Preguntas.concat(valor) 
                }).catch((err) => this.error = err);
            }).catch((err) => this.error = err);
        }).catch((err) => this.error = err);
        
        this.vidas = vidas;
    }

    getPreguntasPorDificultad(num, limite) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT id, pregunta, opciones, inforRelevante FROM preguntas WHERE dificultad = ? AND disponible = 1 LIMIT ?";
            pool.query(sql, [num, limite], (err, rows) => {
                if (err) { reject(); console.log(err) }
                else {
                    if(rows.length < limite){
                        reject("No hay suficientes preguntas para crear el nivel")
                    }
                
                    resolve(rows)
                }

            })
        })

    }
    getError(){
        return this.error;
    }
    actualizarDisponibilidad(rows) {
       // let sql = "UPDATE perguntas SET disponible = ? WHERE id= ? OR id= ? OR id =? OR  id=? OR id=? OR id=? OR id=? OR id=? OR id=? OR id=?";

    }

    getPreguntas() {
        return this.Preguntas;
    }

    getNivelDiario() {
        return this;
    }

    getVidas() {
        return this.vidas;
    }


}


