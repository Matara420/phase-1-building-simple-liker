const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");

// hide modal on page load
modal.classList.add("hidden");

document.querySelectorAll(".like-glyph").forEach((heart) => {
  heart.addEventListener("click", () => {
    mimicServerCall()
      .then(() => {
        if (heart.textContent === EMPTY_HEART) {
          heart.textContent = FULL_HEART;
          heart.classList.add("activated-heart");
        } else {
          heart.textContent = EMPTY_HEART;
          heart.classList.remove("activated-heart");
        }
      })
      .catch((error) => {
        modal.classList.remove("hidden");
        modalMessage.textContent = error;
        setTimeout(() => {
          modal.classList.add("hidden");
        }, 3000);
      });
  });
});

// pre-given mock server function
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
