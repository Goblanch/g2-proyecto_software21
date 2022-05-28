const inicio= document.getElementById('inicio');
const addPregunta = document.getElementById('add');
const removePregunta = document.getElementById('remove');

window.onload = () => {
    if (!window.localStorage.getItem("token")) {
        location.href = "/auth.html";
    } else {
        fetch('http://localhost:3000/api/v1/validate-token', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                token: window.localStorage.getItem("token")
            })
        })
            .then(res => res.json())
            .then(respuesta => {

                if (!respuesta.status) {
                    window.localStorage.removeItem("token");
                    location.href = "/auth.html";

                } else {
                    window.localStorage.setItem("rank", respuesta.data.rank)
                    window.localStorage.setItem("user", respuesta.data.user)
                    console.log(window.localStorage.getItem("rank"))
                    if (window.localStorage.getItem("rank") == 0) {
                        console.log("xd")
                        location.href = "/auth.html";
                    }
                }
            })
    }
}


inicio.onclick = () => {
    location.href = '/index.html';
}