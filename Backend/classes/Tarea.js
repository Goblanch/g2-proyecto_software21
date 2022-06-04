import schedule from "node-schedule"
import pool from "../db.js"

export default class Tarea{
    constructor(){
        this.intentoDiario();
        this.reiniciarAcierto();

    }

    intentoDiario(){
        schedule.scheduleJob("0 0 * * *", () => {
            let sql ="UPDATE users SET intentoDiario = ?";
            pool.query(sql, [true], (err) => {
                if (err){
                    console.log(err);
                    return
                }
            })
        })
    }
    reiniciarAcierto(){
        schedule.scheduleJob("0 0 * * *", () => {
            let sql ="UPDATE users SET numAcierto = ?";
            pool.query(sql, [0], (err) => {
                if (err){
                    console.log(err);
                    return
                }
            })
        })
    }
}