'use strict'

import pool from '../db.js';

export default class Ranking {

    getTopMejores(limite, callback){
        let sql = 'SELECT user FROM users ORDER BY id DESC LIMIT ?';
        pool.query(sql, [limite], (err,rows) => { //devuelve el top jugadores
            if (err) {
                console.log(err);
                callback({
                    status:false,
                    protocol: "err",
                    message: "Hubo un error con la base de datos"
                })
            }else{
                callback({
                    status:true,
                    protocol:"success",
                    data: rows
                })
            }
        })
    }

}
