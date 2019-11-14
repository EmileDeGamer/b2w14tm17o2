let game = document.getElementById("bord")
let answerUI = document.getElementById("answers")
let pinsUI = document.getElementById("pins")
let feedbackUI = document.getElementById("feedback")
let statsUI = document.getElementById("stats")
let check = document.getElementById("check")
let tries = 12
let gapsAmount = (4 * tries), answerAmount = 4, feedbackAmount = (4 * tries)
let gaps = [], answers = [], pins = [], feedback = [], answerColors = [], gapColors = [], stats = []
let colors = ["red", "green", "blue", "yellow", "black", "white"]
let selectedColor
let tempColors = []
let tempFinal = []

setup()

function setup(){
    answerUI.style.display = "none"
    check.innerHTML = "Check"
    check.onclick = function(){checkColors()}
    for (let i = 0; i < answerAmount; i++) {
        gapColors[i] = ""
        tempFinal[i] = "false"
    }
    for (let i = 0; i < 1; i++) {
        let gap = document.createElement('img')
        gap.id = "gap"
        gap.style.width = "100%"
        gap.style.height = "100%"
        statsUI.appendChild(gap)
        stats.push(gap)
    }
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
        let color = colors[Math.floor(Math.random() * colors.length)]
        gap.src = "./img/" + color + ".png"
        gap.style.width = "100%"
        gap.style.height = "100%"
        answerUI.appendChild(gap)
        answers.push(gap)
        answerColors.push(color)
        tempColors.push(color)
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
    selectedColor = color
    stats[0].src = "./img/" + color + ".png"
    for (let i = 0; i < 4; i++) {
        gaps[i].onclick = function(){createPin(i, color)}
    }
}

function setGaps(i, color){
    for (let i = 0; i < 4; i++) {
        gaps[i].onclick = function(){createPin(i, color)}
    }
}

function createPin(i, color){
    gapColors.splice(i, 1, color)
    gaps[i].src = "./img/" + color + ".png"
}

function checkColors(){
    if (gapColors[0] !== "" && gapColors[1] !== "" && gapColors[2] !== "" && gapColors[3] !== ""){
        continueCheck()
    }
}

function continueCheck(){
    tries--
    let counter = 0
    if (JSON.stringify(tempColors) === JSON.stringify(gapColors)){
        answerUI.style.display = "grid"
        alert("Gewonnen! :D")
        location.reload()
    }
    for (let i = 0; i < 4; i++) {
        if (gapColors[i] == tempColors[i]){
            tempColors[i] = ""
            feedback[counter].src = "./img/black.png"
            counter++
            tempFinal[i]= "true"
        }
    }
    for (let i = 0; i < 4; i++) {
        if (tempColors.includes(gapColors[i]) && gapColors[i] !== tempColors[i] && tempFinal[i] !== "true"){
            let item = tempColors.indexOf(gapColors[i])
            tempColors.splice(item, 1, "")
            feedback[counter].src = "./img/white.png"
            counter++
            tempFinal[i] = "true"
        }
    }
    for (let i = 0; i < 4; i++) {
        gaps[i].onclick = null
    }
    for (let i = 0; i < 4; i++) {
        tempColors[i] = answerColors[i]
        if (tries >= 1){
            gaps.shift()
            feedback.shift()
        }
        tempFinal[i] = "false"
        gapColors[i] = ""
    }
    if (tries == 0){
        alert("Verloren! :( Kleurcode:" + answerColors)
        location.reload()
    }
    stats[0].src = ""
}
