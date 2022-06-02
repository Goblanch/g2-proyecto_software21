
import pool from '../db.js';

export default class Partida {
    estadisticaUsuario(token, callback) {
        let sql = "SELECT numAcierto FROM users WHERE token = ?"
        pool.query(sql, [token], (err, rows) => {

            if (err) { //En el caso de que haya un error interno al buscar en la base de datos
                console.log(err)
                callback({
                    status: false,
                    protocol: "err",
                    message: "Hubo un error con la base de datos"

                })
            } else if (rows.length <= 0) { //Si no devuelve ninguna fila al buscar en la base de datos, significa que no existe un usuario con esos parámetros que hemos buscado
                callback({
                    status: false,
                    protocol: "err",
                    message: "Credenciales erróneas"
                })
            } else { //Si no se cumple ninguno de los anteriores mensajes de error, devolverá los datos del usuario
                let porcentaje = parseInt(rows[0].numAcierto);
               porcentaje/=10;
                callback({
                    status: true,
                    protocol: "success",
                    data: {
                        numAcierto: porcentaje.toString(),
                        
                    }
                })
            }
        })
    }

}