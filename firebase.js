// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_DOMAIN",
    databaseURL: "YOUR_DB_URL",
    projectId: "YOUR_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

window.login = function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";

        loadBookings();
    })
    .catch(() => alert("Login Failed ❌"));
};

function loadBookings() {
    const bookingsRef = ref(db, "bookings");

    onValue(bookingsRef, (snapshot) => {
        let data = snapshot.val();
        let list = document.getElementById("list");
        list.innerHTML = "";

        for (let id in data) {
            let item = data[id];
            let li = `<li>${item.name} - ${item.phone} - ${item.date} ${item.time}</li>`;
            list.innerHTML += li;
        }
    });
}
