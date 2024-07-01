const firstName = sessionStorage.getItem("firstName");
document.addEventListener("DOMContentLoaded", function () {
  const Log_In_js = document.getElementById("Log_In");
  const Logo_user_2 = document.getElementById("Logo_user_2");
  if (!firstName) {
    window.location.href = "../pages/logIn.html";
  }
  if (firstName) {
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

document.addEventListener("DOMContentLoaded", function () {
  const Log_In_js = document.getElementById("Log_In");
  const Logo_user_2 = document.getElementById("Logo_user_2");
  if (!firstName) {
    window.location.href = "../pages/logIn.html";
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




function retrieveData() {
    const item = JSON.parse(sessionStorage.getItem('movie')); 
    const userId = sessionStorage.getItem("id");
    
       if (!item) {
       console.error("No movie data found in sessionStorage");
       return;
     }
 
   let containerD = document.getElementById("containermoviedetails");
   containerD.innerHTML = '';
 
   
     let newDiv = document.createElement('div');
     newDiv.classList.add('user-card');
 
     newDiv.innerHTML = `
       <div class="movie-poster">
         <img src="${item.image}" alt="Movie Poster" class="imgposter">
         <button class="play-button">▶</button>
       </div>
       <div class="movie-info">
         <h1 class="h1namemovie">${item.name}</h1>
         <div class="iconsposter">
           <i class="fa fa-bookmark"></i>
           <i class="fa fa-heart"></i>
           <i class="fa fa-share"></i>
           <span class="rating">:star: ${item.rating} | 350k</span>
         </div>
       </div>
       <div class="detailsmovie">
         <div class="details">
           <span class="spandetails">${item.premiered}</span>
           <span class="spandetails">PG-13</span>
           <span class="spandetails">2h 10m</span>
           <span class="spandetails">${item.genres.join(', ')}</span>
         </div>
         <div class="credits">
           <p class="discussioovie">${item.summary}</p>
    
         </div>
       </div>
     `;
 
     containerD.appendChild(newDiv);
   
 }
 
 retrieveData(); 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
  update,
  push,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
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
const db = getDatabase(app);
const userId = sessionStorage.getItem("id");
const movieId = JSON.parse(sessionStorage.getItem("movie")).id;

document.addEventListener("DOMContentLoaded", async function () {
  const submitButton = document.getElementById("submit-comment");
  const commentInput = document.getElementById("comment-input");
  const commentsContainer = document.getElementById("cont");



  async function fetchAndDisplayComments() {
    commentsContainer.innerHTML = ""; // Clear previous comments
    try {
      const snapshot = await get(child(ref(db), `comments/${movieId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const keys = Object.keys(data);
        keys.forEach(key => {
          const commentData = data[key];
          const commentElement = document.createElement("div");
          commentElement.className = "comment";
          commentElement.id = key;
          commentElement.style.width = "100%";
          commentElement.style.height = "auto";
          commentElement.innerHTML = `
              <div class="userinf" id="userComment-${key}">
                  <div class="coomentsDD">
                      <img class="userimg" src="../images/profile-circle-icon-512x512-zxne30hp.png" alt="User Image">
                      <p class="user-name1">${commentData.firstName}</p>
                      <p class="commentslorem2">${commentData.comment}</p>
                      <button class="reply-button" id="reply-${key}">Reply</button>
                  </div>
                  ${
                    commentData.userId === userId
                      ? `
                  <div class="EditDel">
                      <button class="edit-comment1" id="edit-${key}">Edit</button>
                      <button class="delete-comment1" id="delete-${key}">Delete</button>
                  </div>

                  
                  `
                      : ""
                  }
              </div >
              <div class="replies" id="replies-${key}"></div>
              <div class="reply-section" id="reply-section-${key}" style="display: none;">
                  <textarea class="reply-input" id="reply-input-${key}" placeholder="Leave a reply..."></textarea>
                  <button class="submit-reply" id="submit-reply-${key}">Submit Reply</button>
              </div>
          `;
         

          console.log(commentData)
          commentsContainer.appendChild(commentElement);

          // Attach event listeners for reply button
          document
            .getElementById(`reply-${key}`)
            .addEventListener("click", () => {
              document.getElementById(`reply-section-${key}`).style.display =
                "block";
            });

          // Attach event listener for submit reply button
          document
            .getElementById(`submit-reply-${key}`)
            .addEventListener("click", async () => {
              const replyInput = document
                .getElementById(`reply-input-${key}`)
                .value.trim();
              if (!replyInput) return;
              try {
                const newReplyRef = push(
                  ref(db, `comments/${movieId}/${key}/replies`)
                );
                await set(newReplyRef, {
                  reply: replyInput,
                  userId: userId,

                });
                alert("Reply added successfully");
                fetchAndDisplayComments(); // Update UI after adding reply
              } catch (error) {
                console.error("Error adding reply: ", error);
              }
            });

          // Attach event listeners for edit and delete buttons
          if (commentData.userId === userId) {
            document
              .getElementById(`delete-${key}`)
              .addEventListener("click", async () => {
                await remove(ref(db, `comments/${movieId}/${key}`));
                document.getElementById(`userComment-${key}`).remove();
                location.reload()

              }); 


            document
              .getElementById(`edit-${key}`)
              .addEventListener("click", async () => {
                const newComment = prompt("Enter new comment");
                if (newComment) {
                  await update(ref(db, `comments/${movieId}/${key}`), {
                    comment: newComment,
                  });
                  document.querySelector(
                    `#userComment-${key} .commentslorem2`
                  ).textContent = newComment;
                }
              }); 
          }

          // Fetch and display replies
          if (commentData.replies) {
            const replyKeys = Object.keys(commentData.replies);
            const repliesContainer = document.getElementById(`replies-${key}`);
            replyKeys.forEach(replyKey => {
              const replyData = commentData.replies[replyKey];
              const replyElement = document.createElement("div");
              replyElement.className = "reply";
              replyElement.id = replyKey;
              replyElement.innerHTML = `
                  <div class="userinf">
                      <img class="userimg" src="../images/profile-circle-icon-512x512-zxne30hp.png" alt="User Image">
                      <p class="user-name1">${firstName}</p>
                      <p class="commentslorem2">${replyData.reply}</p>
                  </div>
              `;

              repliesContainer.appendChild(replyElement);

            });
          }

        });

      } else {
        console.log("No comments found");
      }
    } catch (error) {
      console.error("Error getting comments:", error);
    }
  }

  submitButton.addEventListener("click", async function (e) {
    e.preventDefault();
    const comment = commentInput.value.trim();
    if (!comment) return;

    try {
      const newCommentRef = push(ref(db, `comments/${movieId}`));
      await set(newCommentRef, {
        comment: comment,
        userId: userId,
        movieId: movieId,
        firstName : firstName
      });
      alert("Comment added successfully");
      fetchAndDisplayComments(); // Update UI after adding comment
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  });
   
  fetchAndDisplayComments(); // Initial fetch and display of comments
});
