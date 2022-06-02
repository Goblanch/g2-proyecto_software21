import Ranking from "../classes/Ranking.js";
import Auth from "../classes/Auth.js";
import Partida from "../classes/Partida.js";

const estadisticas = {
TopJugadores: (req,res) => {
    const {token, top} = req.headers
    if(token && top){
    const a = new Auth()
    a.Validate(token, (respuesta) =>{ //valida que la petición sea realizada por un usuario
        if(respuesta.status){
            const r = new Ranking();
            r.getTopMejores(parseInt(top), (busqueda) => {
                if(busqueda.status) {
                    res.status(200).send({
                        status:true,
                        protocol:"success",
                        data: busqueda.data
                    })
                }else{
                    res.status(300).send({
                        status:false,
                        protocol:"err",
                        message:busqueda.message
                    })
                }
            })
        }else{
            res.status(300).send({
                status:false,
                protocol:"err",
                message: respuesta.message
            })
        }
    })
    }else{
        res.status(200).send({
            status:false,
            protocol:"err",
            message:"Por favor, rellena todos los campos"
        })
    }






},

        EstadisticaJugador: (req,res) => {
        const {token} = req.headers
        if(token){
        const a = new Auth();
        a.Validate(token, (respuesta) =>{ //valida que la petición sea realizada por un usuario
        if(respuesta.status){
            const p = new Partida();
            p.estadisticaUsuario(token,(estadistica)=>{
                if(estadistica.status) {
                    res.status(200).send({
                        status:true,
                        protocol:"success",
                        data: estadistica.data
                    })
                }else{
                    res.status(300).send({
                        status:false,
                        protocol:"err",
                        message:estadistica.message
                    })
                }


            }) 
        }
        else{
            res.status(300).send({
                status:false,
                protocol:"err",
                message: respuesta.message
            })
        }
        



        })
}






}
}
export default estadisticas;
