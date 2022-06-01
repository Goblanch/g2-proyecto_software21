import axios from 'axios';

const config = require("../../config.json");
const API_URL = config.API_URL;

export default function tokenValidation(token) {

    let info;

    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/validate-token`, {token: token}).then((res) => {

            info = res.data;
            resolve(info);
    
        }).catch((err) => {
            reject(false)
        });
    });

}