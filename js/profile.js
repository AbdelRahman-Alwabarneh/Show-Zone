const FirstName = sessionStorage.getItem("firstName");
document.addEventListener("DOMContentLoaded", function () {
  const Log_In_js = document.getElementById("Log_In");
  const Logo_user_2 = document.getElementById("Logo_user_2");
  if (!FirstName) {
    window.location.href = "../pages/logIn.html";
  }
  if (FirstName) {
    if (Log_In_js) Log_In_js.style.display = "none";
    if (Logo_user_2) Logo_user_2.style.display = "inline";
    }
  

  if (Log_Out_user) {
    Log_Out_user.addEventListener("click", function () {
      // إزالة بيانات المستخدم من sessionStorage
      sessionStorage.removeItem("firstName");
      sessionStorage.removeItem("issuccess");
      sessionStorage.removeItem("issuccess2");
      sessionStorage.removeItem("movie");

      // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
      window.location.href = "../pages/logIn.html";
    });
  }
});

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

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const updateFirstName = document.getElementById("updateFirstName");
const updateLastName = document.getElementById("updateLastName");
const updateEmail = document.getElementById("updateEmail");
const updatePassword = document.getElementById("updatePassword");
const saveChanges = document.getElementById("saveChanges");
const emailRef = ref(db, `AllUsers/${sessionStorage.getItem("id")}`);
const emailSnapshot = await get(emailRef);

if (emailSnapshot.exists()) {
  const userData = emailSnapshot.val();
  firstName.value = userData.First_Name;
  lastName.value = userData.Last_Name;
  email.value = userData.Email;
  password.value = userData.Password;
}

updateFirstName.addEventListener("click", () => {
  firstName.disabled = false;
});

updateLastName.addEventListener("click", () => {
  lastName.disabled = false;
});

updateEmail.addEventListener("click", () => {
  email.disabled = false;
});

updatePassword.addEventListener("click", () => {
  password.disabled = false;
});

saveChanges.addEventListener("click", () => {
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const emailValue = email.value;
  const passwordValue = password.value;

  update(ref(db, `AllUsers/${sessionStorage.getItem("id")}`), {
    First_Name: firstNameValue,
    Last_Name: lastNameValue,
    Email: emailValue,
    Password: passwordValue,
  });

  firstName.disabled = true;
  lastName.disabled = true;
  email.disabled = true;
  password.disabled = true;
});
