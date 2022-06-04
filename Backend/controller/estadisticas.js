import Ranking from "../classes/Ranking.js";
import Auth from "../classes/Auth.js";
import Usuario from "../classes/Usuario.js";

const estadisticas = {
    TopJugadores: (req, res) => {
        const { token, top } = req.headers
        if (token && top) {
            const a = new Auth()
            a.Validate(token, (respuesta) => { //valida que la petición sea realizada por un usuario
                if (respuesta.status) {
                    const r = new Ranking();
                    r.getTopMejores(parseInt(top), (busqueda) => {
                        if (busqueda.status) {
                            res.status(200).send({
                                status: true,
                                protocol: "success",
                                data: busqueda.data
                            })
                        } else {
                            res.status(300).send({
                                status: false,
                                protocol: "err",
                                message: busqueda.message
                            })
                        }
                    })
                } else {
                    res.status(300).send({
                        status: false,
                        protocol: "err",
                        message: respuesta.message
                    })
                }
            })
        } else {
            res.status(200).send({
                status: false,
                protocol: "err",
                message: "Por favor, rellena todos los campos"
            })
        }
    },

    EstadisticaJugador: (req, res) => {
        const { token } = req.headers
        if (token) {
            const a = new Auth();
            a.Validate(token, (respuesta) => { //valida que la petición sea realizada por un usuario
                if (respuesta.status) {
                    const p = new Partida();
                    p.estadisticaUsuario(token, (estadistica) => {
                        if (estadistica.status) {
                            res.status(200).send({
                                status: true,
                                protocol: "success",
                                data: estadistica.data
                            })
                        } else {
                            res.status(300).send({
                                status: false,
                                protocol: "err",
                                message: estadistica.message
                            })
                        }


                    })
                }
                else {
                    res.status(300).send({
                        status: false,
                        protocol: "err",
                        message: respuesta.message
                    })
                }




            })
        }
    },
    PuntosGlobal: (req, res) => {

        const r = new Ranking();
        r.getPuntosGlobales((estadisticas) => {
            if (estadisticas.status) {
                res.status(200).send({
                    status: true,
                    protocol: "success",
                    data: estadisticas.data
                })
            } else {
                res.status(300).send({
                    status: false,
                    protocol: "err",
                    message: estadisticas.message
                })
            }
        })
    },

    EstadisticasUsuario: (req, res) => {

        const { user } = req.params;

        if (!user) {
            res.status(300).send({
                status: false,
                protocol: "err",
                message: "Debes indicar el usuario"
            })
        }else{

            const u = new Usuario();
            u.getEstadisticas(user, (estadisticas) => {
                if(estadisticas.status){
                    res.status(200).send({
                        status: true,
                        protocol: "success",
                        data: estadisticas.data
                    })
                }else{
                    res.status(300).send({
                        status: false,
                        protocol: "err",
                        message: estadisticas.message
                    })
                }
            })

        }

    }
}
export default estadisticas;