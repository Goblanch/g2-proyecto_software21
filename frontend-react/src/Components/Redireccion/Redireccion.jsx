import axios from 'axios';
export default function Redireccion() {


    const config = require("../../config.json");
    const API_URL = config.API_URL;


    if (window.localStorage.getItem("token")) {
        let data = {
            token: window.localStorage.getItem("token")
        }
        axios.post(`${API_URL}/validate-token`, data).then((res) => {

            if (res.data.status) {

                return window.location.href = "/app";
            }

        }).catch((err) => {
            window.localStorage.removeItem("token")
            console.log(err)
            return window.location.href = "/auth/login"
        });

    } else {

        return window.location.href = "/auth/login";
    }



}
