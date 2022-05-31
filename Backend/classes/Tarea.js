import schedule from "node-schedule"
import pool from "../db.js"

export default class Tarea{
    constructor(){
        this.intentoDiario();

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
}