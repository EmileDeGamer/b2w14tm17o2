let game = document.getElementById("bord")
let answerUI = document.getElementById("answers")
let pinsUI = document.getElementById("pins")
let feedbackUI = document.getElementById("feedback")
let tries = 12
let gapsAmount = (4 * tries), answerAmount = 4, feedbackAmount = (4 * tries)
let gaps = [], answers = [], pins = [], feedback = []
let colors = ["red", "green", "blue", "yellow", "black", "white"]

setup()

function setup(){
    for (let i = 0; i < gapsAmount; i++) {
        let gap = document.createElement('img')
        gap.id = "gap"
        gap.style.width = "100%"
        gap.style.height = "100%"
        game.appendChild(gap)
        gaps.push(gap)
    }
    for (let i = 0; i < feedbackAmount; i++) {
        let gap = document.createElement('img')
        gap.id = "gap"
        gap.style.width = "100%"
        gap.style.height = "100%"
        feedbackUI.appendChild(gap)
        feedback.push(gap)
    }
    for (let i = 0; i < answerAmount; i++) {
        let gap = document.createElement('img')
        gap.id = "gap"
        gap.style.color = "white"
        gap.src = "./img/" + colors[Math.floor(Math.random() * colors.length)] + ".png"
        gap.style.width = "100%"
        gap.style.height = "100%"
        answerUI.appendChild(gap)
        answers.push(gap)
    }
    for (let i = 0; i < colors.length; i++) {
        let gap = document.createElement('img')
        gap.id = "gap"
        gap.style.color = "white"
        let color = colors[i]
        gap.alt = color
        gap.src = "./img/" + color + ".png"
        gap.style.width = "100%"
        gap.onclick = function(){choosePin(color)}
        gap.style.height = "100%"
        pinsUI.appendChild(gap)
        pins.push(gap)
    }
}

function choosePin(color){
    for (let i = 0; i < 4; i++) {
        gaps[i].onclick = function(){createPin(i, color)}
    }
}

function createPin(i, color){
    gaps[i].src = "./img/" + color + ".png"
}
