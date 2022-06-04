'use strict'

import pool from '../db.js';

export default class Ranking {

    getTopMejores(limite, callback){
        let sql = 'SELECT user,numAcierto FROM users ORDER BY numAcierto DESC LIMIT ?';
        pool.query(sql, [limite], (err,rows) => { //devuelve el top jugadores
            if (err) {
                console.log(err);
                callback({
                    status:false,
                    protocol: "err",
                    message: "Hubo un error con la base de datos"
                })
            }else{
                console.log(JSON.stringify(rows))
                callback({
                    status:true,
                    protocol:"err",
                    data: rows
                })
            }
        })
    }
    
    getPuntosGlobales(callback) {

        let sql = "SELECT user,numAcierto FROM users";
        pool.query(sql, [], (err, rows) => {

            if(err) return callback({
                status: false,
                protocol: "err",
                message: "Hubo un error con la base de datos"
            })

            callback({
                status: true,
                protocol: "success",
                data: rows
            })

        })

    }

}