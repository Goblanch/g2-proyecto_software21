import Ranking from "../classes/Ranking.js";
import Auth from "../classes/Auth.js";

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
}
}
export default estadisticas;