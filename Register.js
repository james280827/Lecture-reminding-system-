import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyBnNF2uBoPjeAViV0m4nQTcvZf68P0VhRY",
    
    authDomain: "lecture-reminding-system-7f741.firebaseapp.com",
    
    projectId:  "lecture-reminding-system-7f741",
    
    storageBucket: "lecture-reminding-system-7f741.firebasestorage.app",
    
    messagingSenderId:   "431486255131",
   
    appId: "1:431486255131:web:868f66796fd91709f438be",
    
    measurementId: "G-GJ27NGXF51"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");


registerForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        return;
    }

    message.textContent = "Creating account...";

    try {

        await createUserWithEmailAndPassword(auth, email, password);

        message.textContent = "Account created successfully!";

        setTimeout(function() {
            window.location.href = "index.html";
        }, 1000);

    } catch (error) {

        console.error(error);

        if (error.code === "auth/email-already-in-use") {
            message.textContent = "Email is already registered.";
        } 
        else if (error.code === "auth/weak-password") {
            message.textContent = "Password must be at least 6 characters.";
        } 
        else {
            message.textContent = "Registration failed.";
        }

    }

});
                 
