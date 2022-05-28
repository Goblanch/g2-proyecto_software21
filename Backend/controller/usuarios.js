'use strict';

import Auth from "../classes/Auth.js";
import Usuario from "../classes/Usuario.js";

const UserController = {

    CheckStatus: (req, res) => { //Petición para saber si la API responde correctamente (no ha crasheado)
        res.status(200).send({
            status: "success",
            message: "La API funciona correctamente"
        });
    },

    Login: (req, res) => {

        // Sacamos del body la variable usuario y contraseña
        let { user, password } = req.body;

        // Inicializamos el objeto Usuario.
        const u = new Usuario(user, password);
        const a= new Auth(u); //Creamos un objeto de tipo Auth en el que le damos como parámetro el usuario para poder autenticarlo

        a.login((validado) => { //analizamos la respuesta recibida al iniciar sesión con ese usuario
            if (validado.status) {

                res.status(200).send({ //Si el estado es true, envía un objeto como respuesta con los datos del usuario y el estado
                    status: true,
                    protocol: "success",
                    data: validado.data
                });
    
            } else {
                res.status(300).send({ //Si el estado es false, envía un objeto como respuesta con el mensaje de error y el estado
                    status: false,
                    protocol: "err",
                    message: validado.message
                });
    
            }

        });
        
    },
    Register: (req, res) => {
        //Comprueba que la petición enviada tenga un nombre y una contraseña
        let { user, password } = req.body;
        if (user && password) {
            //Crea un objeto usuario con ese nombre y contraseña
            const u = new Usuario(user, password);
            const a= new Auth(u);
            a.Register((respuesta) => { //Utiliza el método Register para registrar al usuario y analiza la respuesta recibida desde callback
                if (!respuesta.status) {

                    res.status(300).send({ //Si el estado de la respuesta es false, suelta un mensaje de error y envía el mensaje de error al usuario
                        status: false,
                        protocol: "err",
                        message: respuesta.message
                    });

                } else {
                    res.status(200).send({ //Si el estado es true, le genera un token al usuario y se lo envía para guardarlo en LocalStorage
                        status: true,
                        protocol: "success",
                        data: respuesta.data
                    });
                }
            });

        } else {
            res.status(300).send({ //Si la petición no incluye un usuario y/o contraseña, le manda un mensaje de error al usuario
                status: false,
                protocol: "err",
                message: "Debe introducir el usuario y contraseña"
            });
        }

    }, 

    Validate: (req, res) => { //Función para validar un token
        let {token} = req.headers; //Saca la variable token de la petición
       
        const a= new Auth();//Crea un objeto Auth sin ningún parámetro para poder usar el método de validar
        
       a.Validate(token, (exist) => { //Comprueba si el token es válido y le manda la respuesta a la variable exists
           
        if(exist.status){  //Si el estado es true, manda al usuario un mensaje de que la sesión es válida
            res.status(200).send({
                status: true,
                protocol: "success",
                message: "Logueado",
                data: exist.data
            });
           }else{
            res.status(300).send({ //Si el token no es válido, manda un mensaje de error al usuario
                status: false,
                protocol: "err",
                message: exist.message
            });
           }
       });
      
    }

}

export default UserController;