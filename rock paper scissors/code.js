var play = false
var currentRound = 1
var roundsSet = false

var userChoice 
var compChoice
var choices = ['rock', 'paper', 'scissors']

// html variables
currentRoundHTML = document.querySelector('#round')
totalRoundsHTML = document.querySelector('#rounds')
var roundsInput

screens = document.querySelectorAll('.screen')
pick = document.querySelector('.pick')
response = document.querySelector('.response')
endScreen = document.querySelector('.end')
form = document.querySelector('form')

title = document.querySelector('.title')
scoreboard = document.querySelector('.score-board')

options = document.querySelectorAll('.option')

// event listenets

form.addEventListener('submit', () => {
    play = true
    console.log('form submitted')
    roundsInput = document.querySelector('#rounds-input').value
    console.log(roundsInput, 'rounds')
    rounds()
})

options.forEach(option => {
    option.addEventListener('click', () => {
        if (play === true) {
            console.log('clicked')
            userChoice = option.dataset.choice
            console.log(userChoice)

            // comp choice
            let random = Math.floor(Math.random() * 3)
            compChoice = choices[random]

            changeScreen('response')
        }
    })
})

// functions

function rounds() {
    if (play === true) {
        currentRoundHTML.innerHTML = currentRound.toString()
        console.log(currentRoundHTML, 'current round')
        if (roundsSet === false) {
            totalRoundsHTML.innerHTML = roundsInput.toString()
            console.log(totalRoundsHTML, 'total rounds')
            roundsSet = true
        }
    }
    changeScreen('pick')
    showScore()
}

function changeScreen(screen) {
    console.log('on screen change')
    screens.forEach(s => {
        s.classList.remove('show')
    })
    if (screen === 'pick') {
        pick.classList.add('show')
        console.log('show pick')
    } else if (screen = 'response') {
        console.log('show response')
        response.classList.add('show')
        setResponse()
    } else {
        console.log('show game over')
        endScreen.classList.add('show')
        play = false
    }
}

function setResponse() {
    
}

function showScore() {
    scoreboard.style.display = 'block'
    title.style.display = 'none'
}