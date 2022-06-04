'use strict';

import pool from '../db.js';
import Usuario from './Usuario.js';
export default class Auth {

    constructor(usuario = null) { //Constructor de la clase Auth, si no le pasas parámetros usará el valor null por defecto
        if (usuario) { //Si le pasas un usuario como parámetro 
            this.user = new Usuario(usuario.getUser(), usuario.getPassword())
        }
    }



    login(callback) {
        let sql = "SELECT * FROM users WHERE user = ? AND password = ?"
        pool.query(sql, [this.user.getUser(), this.user.getEncryptedPwd()], (err, rows) => { //Consulta a la base de datos
            //Como la contraseña está encriptada, lo que hace es encriptar la contraseña que le envía el usuario al iniciar sesión con la que hay guardada en la base de datos
            //y las compara. Si son iguales, siempre se va a generar lo mismo cuando las encriptes.

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
                callback({
                    status: true,
                    protocol: "success",
                    data: {
                        user: rows[0].user,
                        token: rows[0].token,
                        rank: rows[0].rank.toString()
                    }
                })
            }
        });

    }

    Register(callback) { //Lo que hace este método es registrar al usuario y devolver la respuesta mediante un callback, es decir, callback es realmente una funcíon y lo que hace es llamarla
        //pasándole como parámetro un objeto con la respuesta (estado, protocolo y datos del usuario o mensaje de error)
        //luego en el archivo controller.js recoge ese objeto proveniente del callback y lo evalúa

        let sqlBusqueda = "SELECT * FROM users WHERE user = ?"; //Antes de registrar un usuario, busca primero si ya existe el usuario
        pool.query(sqlBusqueda, [this.user.getUser()], (err, rows) => { //el primer parámetro es la sentencia SQL, el segundo los datos y el tercero la respuesta
            if (err) return callback({ status: false, protocol: "err", message: "Hubo un error al registrarse" }); //Devuelve error si hay algún problema interno con la base de datos
            if (rows.length <= 0) { //Si no existe el usuario, lo intenta registrar
                let sql = "INSERT INTO users (user, password, token) VALUES (?, ?, ?)";
                pool.query(sql, [this.user.getUser(), this.user.getEncryptedPwd(), this.user.getToken()], (err) => {
                    if (err) { //Si ocurre un error interno con la base de datos
                        console.log(err);
                        callback({ status: false, protocol: "err", message: "Hubo un error al registrarse" });
                    } else { //Si no hay ningún error, se ha registrado correctamente y le devuelve al usuario su token generado
                        callback({ status: true, protocol: "success", data: { token: this.user.getToken(), user: this.user.getUser(), rank: 0 } })
                    }
                })
            } else { //Si existe el usuario devuelve este error
                callback({ status: false, protocol: "err", message: "Ese nombre de usuario ya ha sido registrado" })
            }
        })

    }

    Validate(token, callback) { //Función para validar un token

        let sqlBusqueda = "SELECT * FROM users WHERE token = ?"; //búsqueda en la base de datos
        pool.query(sqlBusqueda, [token], (err, rows) => {
            if (err) { //Error con la base de datos
                console.log(err)
                callback({ status: false, protocol: "err", message: "Error con la base de datos" });
            }else if (rows.length <= 0) { //Si no encuentra nada en la base de datos
                callback({ status: false, protocol: "err", message: "Token incorrecto" });
            } else {//Si encuentra el token en la base de datos
                callback({ status: true, protocol: "success", data: { user: rows[0].user, token: rows[0].token, rank: rows[0].rank.toString(), intentoDiario: rows[0].intentoDiario } });
            }
        });
    }

    Admin(token, callback) {

        let sqlBusqueda = "SELECT * FROM users WHERE token = ?"; //búsqueda en la base de datos
        pool.query(sqlBusqueda, [token], (err, rows) => {
            if (err) { //Error con la base de datos
                console.log(err)
                callback({ status: false, protocol: "err", message: "Error con la base de datos" });
            }
            if (rows.length <= 0 || rows[0].rank === 0) { //Si no encuentra nada en la base de datos
                callback({ status: false, protocol: "err", message: "Token incorrecto" });
            } else {//Si encuentra el token en la base de datos
                callback({ status: true, protocol: "success" });
            }
        });
    }

    actualizarContrasena(user, nuevaContrasena, nuevoToken, callback) {

        let sql = "UPDATE users SET password = ?, token = ? WHERE user = ?";
        pool.query(sql, [nuevaContrasena, nuevoToken, user], (err) => {
            if (err) return callback({
                status: false,
                protocol: "err",
                message: "Hubo un error con la base de datos"
            })
            callback({
                status: true,
                protocol: "success",
                token: nuevoToken
            })

        })

    }


}