const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const menu = "MENU" + "\n" + "[ 1 ] - Trocar de usuário." + "\n" + "[ 2 ] - Jogar novamente." + "\n" + "[ 3 ] - Sair." + "\n" + "Digite a opção desejada."

const characters = [
    "anita",
    "anita-descricao",
    "chica",
    "chica-descricao",
    "chiquinha",
    "chiquinha-descricao",
    "getulio",
    "getulio-descricao",
    "machado",
    "machado-descricao",
    "marechal",
    "marechal-descricao",
    "pedro",
    "pedro-descricao",
    "quiteria",
    "quiteria-descricao",
    "tarsila",
    "tarsila-descricao",
    "zumbi",
    "zumbi-descricao"
];

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className;
    return element;
}

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll(".disabled-card")

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        setTimeout(() => {
            alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos.`);
            let opcao = prompt(menu);
            if (opcao == 1) {
                window.location = "../index.html"
            } else if (opcao == 2) {
                window.location = "../pages/game.html"
            } else {
                window.location = "https://google.com";
            }
        }, 300)
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard = "";
            secondCard = "";
        }, 500)
    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes("reveal-card")) {
        return;
    }

    if (firstCard === "") {
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
    } else if (secondCard === "") {
        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCard = (character) => {
    const card = createElement("div", "card")
    const front = createElement("div", "face front")
    const back = createElement("div", "face back")

    front.style.backgroundImage = `url("/img/${character}.png")`;

    card.appendChild(front);
    card.appendChild(back);

    var nomeCharacter = character.split("-");

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character", nomeCharacter[0])

    return card;
}

const loadGame = () => {
    const shuffledCharacters = characters.sort(() => Math.random() - 0.5);

    shuffledCharacters.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000)
}

function tabClose() {
    var tab = window.open(window.location, "_top");
    tab.close();
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem("player");
    startTimer();
    loadGame();
}