import Auth from "../classes/Auth.js";
import Pregunta from "../classes/Pregunta.js";
import Admin from "../classes/Admin.js";

const PreguntaController = {
    AddPregunta: (req, res) => {
        const { pregunta, opciones, respuestaCorrecta, inforRelevante, dificultad, token } = req.body;
        const a = new Auth();
        a.Admin(token, (esAdmin) => {
            if (esAdmin.status) {
                let a = new Admin();

                if (pregunta && opciones && respuestaCorrecta && inforRelevante && dificultad) {
                    const p = new Pregunta(pregunta, opciones, respuestaCorrecta, inforRelevante, dificultad);
                    a.addPregunta(p, (respuesta) => {
                        if(respuesta.status){
                            res.status(200).send({
                                status:true,
                                protocol:"success",
                                message:"Pregunta añadida"
                            })
                        }else{
                            res.status(300).send({
                                status:false,
                                protocol:"err",
                                message:respuesta.message
                            })
                        }
                    });
                }else{
                    res.status(300).send({
                        status:false,
                        protocol:"err",
                        message:"Debe rellenar todos los campos"
                    });
                }

            }else{
                res.status(300).send({
                    status:false,
                    protocol:"err",
                    message:"El usuario no es administrador"
                });
            }
        })




    },
    DeletePregunta: (req, res) => {
        const { id, token } = req.body;
        const a = new Auth();
        a.Admin(token, (respuesta) => {
            if (respuesta.status) {
                let a = new Admin();
                a.deletePregunta(id, (result) => {
                    if (result.status) {
                        res.status(200).send({
                            status: true,
                            protocol: "success",
                            message: "Pregunta eliminada"
                        })
                    } else {
                        res.status(300).send({
                            status: false,
                            protocol: "err",
                            message: result.message
                        })
                    }
                });
            } else {
                res.status(500).send({
                    status: false,
                    protocol: "err",
                    message: "El usuario no es administrador"
                })
            }
        })

    }

}

export default PreguntaController;