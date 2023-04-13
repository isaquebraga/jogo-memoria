const input = document.querySelector(".input");
const form = document.querySelector(".login-form");

const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("player", input.value);
    window.location = "pages/game.html"
}

form.addEventListener("submit", handleSubmit);