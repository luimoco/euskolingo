//Importar preguntas
import {preguntas} from "./preguntas.js";

// Ejercicio de tipo escribir
function generateExerciseEscribir(question) {
    const questionElement = document.querySelector(".question");
    questionElement.textContent = question;
}

function comprobar() {
    let respuestaUsuario = document.getElementById("inputRespuestaUsuario").value.toLowerCase();
    let respuestaFormat = respuesta.toLowerCase()
    // Remove punctuation characters
    respuestaUsuario = respuestaUsuario.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()/?]/g,"");
    respuestaFormat = respuestaFormat.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()/?]/g,"");
    // Trim leading and trailing spaces
    respuestaUsuario = respuestaUsuario.trim();
    respuestaFormat = respuestaFormat.trim();
    const correctAnswers = respuestaFormat.split("|");
    let isCorrect = false;
    for (const correctAnswer of correctAnswers) {
        if (respuestaUsuario === correctAnswer.trim()) {
            isCorrect = true;
            break;
        }
    }
    if (isCorrect) {
        document.querySelector(".feedback").innerHTML = "<p>ZORIONAK! " + pregunta + " <span class='correcto'>" + respuesta.replace(/\|/g, "</span> edo <span class='correcto'>") + "</span> da!" + "</p><img src='./ondo.png' width = '64', height = '64' alt='Ondo'>";
    } else {
        document.querySelector(".feedback").innerHTML = "<p><span class='incorrecto'>" + respuestaUsuario + "</span> ez da " + pregunta + ". " + pregunta + ", <span class='correcto'><b>" + respuesta.replace(/\|/g, "</span></b> edo <b><span class='correcto'>") + "</b></span> da.</p><img src='./txarra.png' width = '64', height = '64' alt='Txarra'>";
    }
}

/////////////////////////////////////////////////////////////////////////////////
//Ejercicio de tipo ordenar frase
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
        document.querySelector(".feedback").innerHTML = "<p>Ez da <span class='incorrecto'>" + respuestaUsuario.slice(0,-1) + "</span>.</p><p>" + pregunta + ". " + respuesta + " da!</p><img src='./txarra.png' width = '64', height = '64' alt='Txarra'>";
    }
}

function generateExerciseOrdenar(question, answer) {
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

//////////////////////MAIN//////////////////////////////
const MIN_EXERCISE_NUMBER = 1;
const MAX_EXERCISE_NUMBER = 410;
const randomNum = Math.floor(Math.random() * (MAX_EXERCISE_NUMBER - MIN_EXERCISE_NUMBER + 1)) + MIN_EXERCISE_NUMBER;

const pregunta = preguntas[randomNum - 1].P;
let respuesta = preguntas[randomNum - 1].R;
let tipo = preguntas[randomNum - 1].T;
let clase = preguntas[randomNum - 1].C; // Get the class from the preguntas array

document.querySelector(".class-label").innerHTML = "Klase " + clase;
if (tipo == "O") {
    document.querySelector(".tipoPregunta").innerHTML = "Erantzun";
    document.querySelector(".preguntaTipo").innerHTML = "<div class='ordered-words'></div><div class='disordered-words'></div>";
    generateExerciseOrdenar(pregunta, respuesta);
} else if (tipo == "E") {
    document.querySelector(".tipoPregunta").innerHTML = "Hiztegia";
    document.querySelector(".preguntaTipo").innerHTML = "<input type='text' id='inputRespuestaUsuario' placeholder='...'></input>";
    generateExerciseEscribir(pregunta);
    // Funcionalidad para poder usar enter en los ejercicios de tipo Escritura
    const inputField = document.getElementById("inputRespuestaUsuario");
    if(inputField){
        inputField.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                comprobar();
            }
        });
    }
}

let buttonClicked = false; // Variable to track if the button has been clicked

function checkAndChangeButton() {
    if (!buttonClicked) {
        if (tipo == "O") {
            comprobarOrden();
        } else if (tipo == "E") {
            comprobar();
        }        
        buttonClicked = true;
        const checkButton = document.getElementById("checkButton");
        checkButton.textContent = "Hurrengo galdera";
    } else {
        cargaNuevaPregunta();
    }
}

function cargaNuevaPregunta() {
    window.location.href='galderak.html'
}

// Attach the event listener outside the function
const checkButton = document.getElementById("checkButton");
if (checkButton) {
    checkButton.addEventListener("click", checkAndChangeButton);
}
