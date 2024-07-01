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

sessionStorage.setItem("issuccess", false);

let Signup_form_id_js = document.getElementById("Signup_form_id");

let Password_Singup = document.getElementById("Password_Singup");
let Passward_p_div_js = document.getElementById("Passward_p_div");
let characters_Passward_p_js = document.getElementById("characters_Passward_p");
let Capital_Passward_p_js = document.getElementById("Capital_Passward_p");
let Number_Passward_p_js = document.getElementById("Number_Passward_p");
let Special_Characters_p_js = document.getElementById("Special_Characters_p");
let Email_p_div_js = document.getElementById("Email_p_div");
let Sumbit_SingUp_js = document.getElementById("Sumbit_SingUp");
let You_are_registered_js = document.getElementById("You_are_registered");
Password_Singup.addEventListener("input", function checkPassword() {
  let Verification_Password = Signup_form_id_js.Password_Singup.value;
  Passward_p_div_js.style.display = "inline";
  if (/[A-Za-z\d@$!%*?&]{8,}/.test(Verification_Password)) {
    characters_Passward_p_js.style.color = "green";
  } else {
    characters_Passward_p_js.style.color = "";
  }
  if (/[A-Z]/.test(Verification_Password)) {
    Capital_Passward_p_js.style.color = "green";
  } else {
    Capital_Passward_p_js.style.color = "";
  }
  if (/\d/.test(Verification_Password)) {
    Number_Passward_p_js.style.color = "green";
  } else {
    Number_Passward_p_js.style.color = "";
  }
  if (/(?=.*[@$!%*?&])/.test(Verification_Password)) {
    Special_Characters_p_js.style.color = "green";
  } else {
    Special_Characters_p_js.style.color = "";
  }
});

Sumbit_SingUp_js.addEventListener("click", async function (Sing_Up_Form) {
  Sing_Up_Form.preventDefault();
  let First_Name_js = document.getElementById("First_Name").value;
  let Last_Name_js = document.getElementById("Last_Name").value;
  let Data_js = document.getElementById("date").value;
  let Email_js = document.getElementById("Email").value;
  let Password_Singup_js = document.getElementById("Password_Singup").value;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email_js)) {
    Email_p_div_js.style.display = "none";
  } else {
    Email_p_div_js.style.display = "inline";
    return;
  }
  if (
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      Password_Singup_js
    )
  ) {
  } else {
    return;
  }

  let emailEncoded = Email_js.replaceAll(".", "_"); // استبدال . بـ _ حتة يعمل
  let emailRef = ref(db, `AllUsers/${emailEncoded}`);
  let emailSnapshot = await get(emailRef);
  if (emailSnapshot.exists()) {
    You_are_registered_js.style.display = "flex";
    return;
  }

  await set(emailRef, {
    First_Name: First_Name_js,
    Last_Name: Last_Name_js,
    Data: Data_js,
    Email: Email_js,
    Password: Password_Singup_js,
  });
  const firstName = First_Name_js;
  sessionStorage.setItem("firstName", firstName);
  sessionStorage.setItem("issuccess", true);
  sessionStorage.setItem("id", emailEncoded);
  window.location.href = "../index.html";
});
