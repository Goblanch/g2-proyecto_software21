
const loginForm = document.querySelector("section.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("section .signup-link a");
const botonRegistro = document.getElementById("registrar-boton");
const botonLogin = document.getElementById("login-boton");

//Animaciones
signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
   
});

loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    
    
});
signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});
const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}
window.onload = () => {
    fetch('http://localhost:3000/api/v1/validate-token', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            token: window.localStorage.getItem("token")
        })
    })
        .then(res => res.json())
        .then(respuesta => {
            
            if (respuesta.status) {
                location.href = "/index.html";

            } 
        })
    }
    


//Evento login
botonLogin.addEventListener('click',() => {
    let password = document.querySelector(".password-value-login");
    let user = document.querySelector(".user-value-login");
    fetch('http://localhost:3000/api/v1/login',{
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                user: user.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data);
        })
})

botonRegistro.addEventListener('click', () => {
    let confirmar = document.querySelector(".confirm-password-value");
    let password = document.querySelector(".password-value-register");
    let user = document.querySelector(".user-value-register");

    if(confirmar.value!=password.value) return alertBox("Las contraseñas no coinciden");
    if(!confirmar.value || !password.value) return alertBox("Debes introducir una contraseña")
    fetch('http://localhost:3000/api/v1/register', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            user: user.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(respuesta => {
        validateData(respuesta);
    })
});

const validateData = (respuesta) => {    
    if(!respuesta.status){
        alertBox(respuesta.message);
    } else{
        window.localStorage.setItem("user", respuesta.data.user);
        window.localStorage.setItem("token", respuesta.data.token);
        window.localStorage.setItem("rank", respuesta.data.rank);
        location.href = 'http://localhost/index.html';
    }
}
