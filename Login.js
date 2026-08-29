import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {

    apiKey: "AIzaSyBnNF2uBoPjeAViV0m4nQTcvZf68P0VhRY",

    authDomain: "lecture-reminding-system-7f741.firebaseapp.com",

    projectId: "lecture-reminding-system-7f741",

    storageBucket: "lecture-reminding-system-7f741.firebasestorage.app",

    messagingSenderId: "431486255131",

    appId: "1:431486255131:web:868f66796fd91709f438be",

    measurementId: "G-GJ27NGXF51"

};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


const loginForm =
    document.getElementById("loginForm");

const message =
    document.getElementById("message");


loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    message.textContent = "Logging in...";


    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        message.textContent =
            "Login successful!";


        window.location.href =
            "index.html";


    } catch (error) {

        console.error(error);


        if (error.code === "auth/invalid-credential") {

            message.textContent =
                "Incorrect email or password.";

        } else if (error.code === "auth/user-not-found") {

            message.textContent =
                "Account does not exist.";

        } else if (error.code === "auth/wrong-password") {

            message.textContent =
                "Incorrect password.";

        } else {

            message.textContent =
                "Login failed. Please try again.";

        }

    }

});


const showPassword =
    document.getElementById("showPassword");

const password =
    document.getElementById("password");


showPassword.addEventListener("click", function() {

    if (password.type === "password") {

        password.type = "text";

        showPassword.textContent = "🙈";

    } else {

        password.type = "password";

        showPassword.textContent = "👁️";

    }

});
