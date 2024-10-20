// Placeholder for exercise data
function comprobar() {
    const respuestaUsuario = document.getElementById("inputRespuestaUsuario").value.toLowerCase();

    if (respuestaUsuario === respuesta) {
        document.querySelector(".feedback").innerHTML = "<p>ZORIONAK! " + pregunta + " " + respuestaUsuario + " da!</p><img src='./ondo.png' width = '64', height = '64' alt='Ondo'>";
    } else {
        document.querySelector(".feedback").innerHTML = "<p><span class='incorrecto'>" + respuestaUsuario + "</span> ez da " + pregunta + ". " + pregunta + ", <b>" + respuesta + "</b> da.</p><img src='./txarra.png' width = '64', height = '64' alt='Txarra'>";
    }
}
// Add event listener for Enter key press
const inputField = document.getElementById("inputRespuestaUsuario");
if(inputField){
    inputField.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            comprobar();
        }
    });
}

function comprobarOrden() {
    const orderedWords = document.querySelectorAll(".ordered-words button");
    const correctOrder = respuesta.split(" ");
    let respuestaUsuario = ""

    let isCorrect = true;
    for (let i = 0; i < orderedWords.length; i++) {
        respuestaUsuario += orderedWords[i].textContent + " ";
        if (orderedWords[i].textContent !== correctOrder[i]) {
            isCorrect = false;
            break;
        }
    }
    

    if (isCorrect) {
        document.querySelector(".feedback").innerHTML = "<p>ZORIONAK! " + pregunta + ". " + respuestaUsuario + " da!</p><img src='./ondo.png' width = '64', height = '64' alt='Ondo'>";
    } else {
        respuestaUsuario = "";
        for (let i = 0; i < orderedWords.length; i++) {
            respuestaUsuario += orderedWords[i].textContent + " ";
        }
        document.querySelector(".feedback").innerHTML = "<p>Ez da <span class='incorrecto'>" + respuestaUsuario.slice(0,-1) + "</span>. Errepikatu, mesedez.</p><img src='./txarra.png' width = '64', height = '64' alt='Txarra'>";
    }
}

function generateExercise(question, answer) {
    const questionElement = document.querySelector(".question");
    questionElement.textContent = question;

    const answerWords = answer.split(" ");
    const disorderedWords = shuffleArray(answerWords);

    const orderedWordsDiv = document.querySelector(".ordered-words");
    const disorderedWordsDiv = document.querySelector(".disordered-words");

    disorderedWords.forEach(word => {
        const button = document.createElement("button");
        button.textContent = word;
        button.addEventListener("click", () => moveWord(button));
        disorderedWordsDiv.appendChild(button);
    });
}

function moveWord(wordElement) {
    const orderedWordsDiv = document.querySelector(".ordered-words");
    const disorderedWordsDiv = document.querySelector(".disordered-words");

    if (orderedWordsDiv.contains(wordElement)) {
        disorderedWordsDiv.appendChild(wordElement);
    } else {
        orderedWordsDiv.appendChild(wordElement);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Example usage:
const pregunta = document.getElementById("pregResp").getAttribute("pregunta");
const respuesta = document.getElementById("pregResp").getAttribute("respuesta");

generateExercise(pregunta, respuesta);