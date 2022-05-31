'use strict';

import crypto from 'crypto';
import pool from '../db.js';
export default class Usuario {

    constructor(user = null, password = null) { //Constructor de la clase Usuario, si no le pasas parámetros usará el valor null por defecto
        this.user = user;
        this.password = password;
        if (user && password) { //Si le pasas usuario y contraseña, intenteará generar un token y encriptar la contraseña
            this.token = this.generateToken(); 
            this.encryptedPwd = this.encryptPassword(); //Encripta la contraseña del usuario
        }
    }

    intentoDiario(token) {
        let sql = "UPDATE users SET intentoDiario = false WHERE token = ?";
        pool.query(sql, [token], (err) => {
            if(err) return console.log(err);
        })
    }

    generateToken() {
        let shasum = crypto.createHash("sha1"); //Método para encriptar
        shasum.update(this.user + this.password); //Genera un token encriptando el nombre de usuario + la contraseña para que así no se repita ninguno ya que todos los nombres son diferentes
        return shasum.digest('hex'); //Devuelve el valor en hexadecimal
    }

    encryptPassword() { //Encriptar la contraseña
        let shasum = crypto.createHash("sha1");
        shasum.update(this.password); //Encripta solo la contraseña
        return shasum.digest('hex');
    }

    getUser() {
        return this.user;
    }

    getToken() {
        return this.token;
    }

    getEncryptedPwd() {
        return this.encryptedPwd;
    }
    getPassword(){
        return this.password;
    }
    
    
}
