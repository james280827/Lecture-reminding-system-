import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
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

}


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



const lecturesCollection = collection(db, "lectures");


const lectureForm = document.getElementById("lectureForm");


lectureForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const subject =
        document.getElementById("subject").value;

    const instructor =
        document.getElementById("instructor").value;

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;

    const room =
        document.getElementById("room").value;

    const description =
        document.getElementById("description").value;


    try {

        await addDoc(lecturesCollection, {

            subject: subject,

            instructor: instructor,

            date: date,

            time: time,

            room: room,

            description: description,

            createdAt: new Date()

        });


        alert("Lecture successfully added!");


        lectureForm.reset();


        loadLectures();


    } catch (error) {

        console.error("Error adding lecture:", error);

        alert("Failed to add lecture.");

    }

});


async function loadLectures() {

    const lectureList =
        document.getElementById("lectureList");


    lectureList.innerHTML = "";


    try {

        const snapshot =
            await getDocs(lecturesCollection);


        let lectures = [];


        snapshot.forEach(function(document) {

            lectures.push({

                id: document.id,

                ...document.data()

            });

        });

        lectures.sort(function(a, b) {

            const dateA =
                new Date(`${a.date}T${a.time}`);

            const dateB =
                new Date(`${b.date}T${b.time}`);

            return dateA - dateB;

        });


        if (lectures.length === 0) {

            lectureList.innerHTML = `
                <div class="empty-message">
                    No lectures added yet.
                </div>
            `;

        }


        lectures.forEach(function(lecture) {

            createLectureCard(lecture);

        });


        updateStatistics(lectures);


    } catch (error) {

        console.error("Error loading lectures:", error);

        lectureList.innerHTML = `
            <div class="empty-message">
                Unable to load lectures.
            </div>
        `;

    }

}


function createLectureCard(lecture) {

    const lectureList =
        document.getElementById("lectureList");


    const card =
        document.createElement("div");


    card.className = "lecture-card";


    card.innerHTML = `

        <h3>
            📚 ${lecture.subject}
        </h3>

        <div class="lecture-info">

            <p>
                👨‍🏫 <strong>Instructor:</strong>
                ${lecture.instructor}
            </p>

            <p>
                📅 <strong>Date:</strong>
                ${lecture.date}
            </p>

            <p>
                ⏰ <strong>Time:</strong>
                ${lecture.time}
            </p>

            <p>
                🏫 <strong>Room:</strong>
                ${lecture.room}
            </p>

            <p>
                📝 <strong>Description:</strong>
                ${lecture.description || "None"}
            </p>

        </div>

        <button
            class="delete-btn"
            onclick="deleteLecture('${lecture.id}')"
        >
            🗑️ Delete
        </button>

    `;


    lectureList.appendChild(card);

}


window.deleteLecture = async function(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this lecture?");


    if (!confirmDelete) {

        return;

    }


    try {

        await deleteDoc(
            doc(db, "lectures", id)
        );


        alert("Lecture deleted.");


        loadLectures();


    } catch (error) {

        console.error("Error deleting lecture:", error);

        alert("Failed to delete lecture.");

    }

};



function updateStatistics(lectures) {

    const total =
        lectures.length;


    const today =
        new Date().toISOString().split("T")[0];


    const todayCount =
        lectures.filter(function(lecture) {

            return lecture.date === today;

        }).length;


    const now =
        new Date();


    const upcomingCount =
        lectures.filter(function(lecture) {

            const lectureDate =
                new Date(`${lecture.date}T${lecture.time}`);

            return lectureDate > now;

        }).length;


    document.getElementById("totalLectures").textContent =
        total;


    document.getElementById("todayLectures").textContent =
        todayCount;


    document.getElementById("upcomingLectures").textContent =
        upcomingCount;

}


loadLectures();
