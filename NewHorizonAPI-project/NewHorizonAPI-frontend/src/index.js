document.addEventListener('DOMContentLoaded', init)

const BASE_URL = 'http://[::1]:3000';

//AppID=2418140275145306
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

function init() {
    formLogin()
    loginButton.addEventListener("click", checkCred)
    signupBUtton.addEventListener("click", newUser)
}

function formLogin() {
    fetch(`${BASE_URL}/`)
        .then(response => response.json())
        .then(parsedResponse => console.log(parsedResponse));
}

function checkCred() {
    fetch(`${BASE_URL}/login`)
        .then(response => response.json())

}

//const loginForm = document.getElementById("login-form");
//const loginButton = document.getElementById("login-form-submit");
//const loginErrorMsg = document.getElementById("login-error-msg");

//loginButton.addEventListener("click", (e) => {
//    e.preventDefault();
//    const username = loginForm.username.value;
//   const password = loginForm.password.value;
//
//    if (username === "belson" && password === "rick") {
//        alert("You have successfully logged in.");
//        location.reload();
//    } else {
//        loginErrorMsg.style.opacity = 1;
//    }
//})