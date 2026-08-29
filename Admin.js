import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


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

const db = getFirestore(app);


const lectureForm =
    document.getElementById("lectureForm");

const lectureList =
    document.getElementById("lectureList");

const totalLectures =
    document.getElementById("totalLectures");

const upcomingLectures =
    document.getElementById("upcomingLectures");

const logoutBtn =
    document.getElementById("logoutBtn");


/* CHECK LOGIN */

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

    }

});


/* ADD LECTURE */

lectureForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const subject =
        document.getElementById("subject").value.trim();

    const instructor =
        document.getElementById("instructor").value.trim();

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;

    const room =
        document.getElementById("room").value.trim();

    const description =
        document.getElementById("description").value.trim();


    try {

        await addDoc(
            collection(db, "lectures"),
            {
                subject: subject,
                instructor: instructor,
                date: date,
                time: time,
                room: room,
                description: description,
                createdAt: new Date()
            }
        );


        alert("Lecture added successfully!");


        lectureForm.reset();


        loadLectures();


    } catch (error) {

        console.error(error);

        alert(
            "Error adding lecture: " +
            error.message
        );

    }

});


/* LOAD LECTURES */

async function loadLectures() {

    lectureList.innerHTML =
        '<div class="empty-message">Loading lectures...</div>';


    try {

        const lectureQuery =
            query(
                collection(db, "lectures"),
                orderBy("date", "asc")
            );


        const snapshot =
            await getDocs(lectureQuery);


        lectureList.innerHTML = "";


        let total = 0;

        let upcoming = 0;


        const today =
            new Date().toISOString().split("T")[0];


        snapshot.forEach((lectureDoc) => {

            total++;


            const data =
                lectureDoc.data();


            if (data.date >= today) {

                upcoming++;

            }


            const card =
                document.createElement("div");


            card.className =
                "lecture-card";


            card.innerHTML = `

                <h3>
                    ${data.subject}
                </h3>

                <div class="lecture-info">

                    <div>
                        👨‍🏫 Instructor:
                        ${data.instructor}
                    </div>

                    <div>
                        📅 Date:
                        ${data.date}
                    </div>

                    <div>
                        🕐 Time:
                        ${data.time}
                    </div>

                    <div>
                        🏫 Room:
                        ${data.room}
                    </div>

                    <div>
                        📝 Description:
                        ${data.description || "None"}
                    </div>

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteLecture('${lectureDoc.id}')"
                >
                    🗑️ Delete
                </button>

            `;


            lectureList.appendChild(card);

        });


        if (total === 0) {

            lectureList.innerHTML =
                '<div class="empty-message">No lectures found.</div>';

        }


        totalLectures.textContent =
            total;


        upcomingLectures.textContent =
            upcoming;


    } catch (error) {

        console.error(error);

        lectureList.innerHTML =
            '<div class="empty-message">Unable to load lectures.</div>';

    }

}


/* DELETE LECTURE */

window.deleteLecture = async function(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this lecture?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        await deleteDoc(
            doc(db, "lectures", id)
        );


        alert("Lecture deleted successfully!");


        loadLectures();


    } catch (error) {

        console.error(error);

        alert(
            "Error deleting lecture: " +
            error.message
        );

    }

};


/* LOGOUT */

logoutBtn.addEventListener("click", async function() {

    try {

        await signOut(auth);

        window.location.href =
            "login.html";

    } catch (error) {

        console.error(error);

    }

});


/* LOAD DATA */

loadLectures();
