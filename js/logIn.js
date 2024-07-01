import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
  set,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyAzRJMUA6qYsRrf-7NNi2KqvzPtaLZRSu0",
  authDomain: "tv-shows-a6dfc.firebaseapp.com",
  databaseURL:
    "https://tv-shows-a6dfc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tv-shows-a6dfc",
  storageBucket: "tv-shows-a6dfc.appspot.com",
  messagingSenderId: "950780821633",
  appId: "1:950780821633:web:6614119aa73d65008f8d80",
  measurementId: "G-BLCV05YBNK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
sessionStorage.setItem("issuccess2", false);
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("email_login");
const loginPassword = document.getElementById("login_pass");
const loginButton = document.getElementById("submit");
let Password_logIn_js = document.getElementById("Password_logIn");
let Email_login_div_js = document.getElementById("Email_login_div");
loginButton.addEventListener("click", async function (event) {
  event.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  const emailEncoded = email.replaceAll(".", "_"); // Encode email to match the database format
  const emailRef = ref(db, `AllUsers/${emailEncoded}`);
  const emailSnapshot = await get(emailRef);
  if (emailSnapshot.exists()) {
    const userData = emailSnapshot.val();
    if (userData.Password === password) {
      const firstName = userData.First_Name;
      sessionStorage.setItem("firstName", firstName); // Save first name in session storage
      sessionStorage.setItem("issuccess2", true);
      window.location.href = "../index.html";
    } else {
      Password_logIn_js.style.display = "inline";
      return;
    }
  } else {
    Email_login_div_js.style.display = "inline";
  }
});
