const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-Form")
const ourField = document.querySelector(".our-field")
let pointsLeft = document.querySelector(".points-needed")
let mistakesLeft = document.querySelector(".mistakes-allowed")
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message") 
const resetButton = document.querySelector(".reset-button1") 
let mistakeSound = new Audio('MistakeSound.mp3')
let successSound


let state = {
    score: 0,
    wrongAnswer: 0

}

function updateProblem() {
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
    ourForm.reset()
    ourField.focus()
}

updateProblem()

function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
    return {
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operator: ["+", "-", "x"][generateNumber(2)]
    }
}


ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    

    let correctAnswer
    const p = state.currentProblem;
    if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
    if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
    if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo


    if (parseInt(ourField.value, 10) === correctAnswer) {
        state.score++ 
        updateProblem()
        renderProgress()
        problemElement.classList.add("correct-animation")
        setTimeout(() => problemElement.classList.remove("correct-animation"), 331)

    } else {
        mistakeSound.play()
        state.wrongAnswer++ 
        renderProgress()
        problemElement.classList.add("animate-wrong")
        setTimeout(() => problemElement.classList.remove("animate-wrong"), 331)
    }
    checkLogic()
}

function checkLogic() {
    // if you won
    if (state.score == 10) {
        endMessage.textContent = "Congrats! You Won!"
        document.body.classList.add("overlay-is-open")
        setTimeout(() => resetButton.focus(), 331)
    }

    // if you lost
    if (state.wrongAnswer == 3) {
        endMessage.textContent = "HA HA HA You're Soooo Dumb"
        document.body.classList.add("overlay-is-open")
        setTimeout(() => resetButton.focus(), 331)
    }
}

resetButton.addEventListener("click", resetGame)


function resetGame() {
    document.body.classList.remove("overlay-is-open")
    updateProblem()
    state.score = 0;
    state.wrongAnswer = 0;
    progressBar.style.transform = `scaleX(.${state.score})`
    renderProgress()
    
}

function renderProgress() {
    // progress Bar
    progressBar.style.transform = `scaleX(.${state.score})`

    // Mistakes and Scores
    mistakesLeft.textContent = `${3 - state.wrongAnswer}`
    pointsLeft.textContent = `${10 - state.score}`
    
}