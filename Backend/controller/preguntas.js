import Auth from "../classes/Auth.js";
import Pregunta from "../classes/Pregunta.js";
import Admin from "../classes/Admin.js";
import Nivel from "../classes/Nivel.js";
import Usuario from "../classes/Usuario.js";

const PreguntaController = {
    AddPregunta: (req, res) => {
        const { pregunta, opciones, respuestaCorrecta, inforRelevante, dificultad, token } = req.body;
        
        const a = new Auth();
        a.Admin(token, (esAdmin) => {
            if (esAdmin.status) {
                let a = new Admin();

                if (pregunta && opciones && respuestaCorrecta && inforRelevante && dificultad) {
                    const p = new Pregunta(pregunta, JSON.stringify(opciones), respuestaCorrecta, inforRelevante, dificultad);
                    a.addPregunta(p, (respuesta) => {
                        if (respuesta.status) {
                            res.status(200).send({
                                status: true,
                                protocol: "success",
                                message: "Pregunta añadida",
                                id: respuesta.data
                            })
                        } else {
                            res.status(300).send({
                                status: false,
                                protocol: "err",
                                message: respuesta.message
                            })
                        }
                    });
                } else {
                    res.status(300).send({
                        status: false,
                        protocol: "err",
                        message: "Debe rellenar todos los campos"
                    });
                }

            } else {
                res.status(300).send({
                    status: false,
                    protocol: "err",
                    message: "El usuario no es administrador"
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
                res.status(300).send({
                    status: false,
                    protocol: "err",
                    message: "El usuario no es administrador"
                })
            }
        })

    },
    ConstruirNivel: (req, res) => {
        const { token } = req.headers;
        const a = new Auth();
        a.Validate(token, (respuesta) => {
            if (respuesta.status) {
                const n = new Nivel(3);
                setTimeout(() => { //Tiempo de espera entes de enviar la respuesta para que la promesa se pueda cumplir
                    res.status(200).send({
                        status: true,
                        protocol: "success",
                        data: n.getNivelDiario()
                    })
                }, 500);

                const u = new Usuario();
                u.intentoDiario(token);

            } else {
                res.status(300).send({
                    status: false,
                    protocol: "err",
                    message: "Token incorrecto"
                })
            }
        })
    },
    ValidarPregunta: (req, res) => {
        const { id, token, respuestaUsuario } = req.body;
        const a = new Auth();
        a.Validate(token, (respuesta) => {
            if (respuesta.status) {
                const p = new Pregunta(null, null, null, null, null, id, respuestaUsuario);
                p.validarPregunta((correcta) => {
                    if (correcta.status) {
                        const u = new Usuario();
                        u.sumarAcierto(token);
                        res.status(200).send({
                            status: true,
                            protocol: "success",
                            message: "Respuesta correcta"
                        })
                    } else {
                        res.status(300).send({
                            status: false,
                            protocol: "err",
                            message: correcta.message
                        })
                    }
                })
            } else {
                res.status(300).send({
                    status: false,
                    protocol: "err",
                    message: "Token incorrecto"
                })
            }
        })
    },
    DevolverPreguntas: (req, res) => {
        const { token } = req.body;
        const a = new Auth();
        
        a.Admin(token, (respuesta) => {
            if (respuesta.status) {
                const p = new Pregunta();
                p.devolverPreguntas((preguntas) => {
                    if (preguntas.status) {
                        res.status(200).send({
                            status: true,
                            protocol: "success",
                            data: preguntas.data
                        })
                    } else {
                        res.status(300).send({
                            status: false,
                            protocol: "err",
                            message: preguntas.message
                        })
                    }
                })
            } else {
                res.status(300).send({
                    status: false,
                    protocol: "err",
                    message: "Token incorrecto"
                });
            }

        })
    },
    PreguntaPorID: (req, res) => {
        const {token, id} = req.body;
        const a = new Auth();
        
        a.Admin(token, (respuesta) => {
            if (respuesta.status) {
                const p = new Pregunta();
                p.getPreguntaPorId(id,(pregunta) => {
                    if (pregunta.status) {
                        res.status(200).send({
                            status: true,
                            protocol: "success",
                            data: pregunta.data
                        })
                    } else {
                        res.status(300).send({
                            status: false,
                            protocol: "err",
                            message: pregunta.message
                        })
                    }
                })
            } else {
                res.status(300).send({
                    status: false,
                    protocol: "err",
                    message: "Token incorrecto"
                });
            }

        })
    }
}

export default PreguntaController;
