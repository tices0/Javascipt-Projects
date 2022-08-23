var play = false
var currentRound = 0
var roundsSet = false
var oneRound = false

var userChoice 
var compChoice
var choices = ['rock', 'paper', 'scissors']

var roundWinner
var userScore = 0
var compScore = 0

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
userScoreHTML = document.querySelector('.user-score')
compScoreHTML = document.querySelector('.comp-score')

compChoiceHTML = document.querySelector('.comp-choice')
winMoveHTML = document.querySelector('.win-move')
loseMoveHTML = document.querySelector('.lose-move')
beatsHTML = document.querySelector('.beats')
resultHTML = document.querySelector('.result')

winnerHTML = document.querySelector('.winner')

options = document.querySelectorAll('.option')

playAgainBtn = document.querySelector('.play-again')

// event listenets

form.addEventListener('submit', () => {
    play = true
    console.log('form submitted')
    roundsInput = document.querySelector('#rounds-input').value
    console.log(roundsInput, 'rounds')
    if (roundsInput == 1) {
        oneRound = true
    }
    rounds()
})

options.forEach(option => {
    option.addEventListener('click', () => {
        if (play === true) {
            userChoice = option.dataset.choice
            console.log(userChoice, 'user choicee')

            // comp choice
            let random = Math.floor(Math.random() * 3)
            compChoice = choices[random]
            console.log(compChoice, 'comp choice')

            changeScreen('response')
        }
    })
})

playAgainBtn.addEventListener('click', () => {
    if (play === false) {
        compScore = 0
        userScore = 0
        roundsSet = false
        currentRound = 0
        oneRound = false

        title.style.display = 'block'
        scoreboard.style.display = 'none'

        screens.forEach(s => {
        s.classList.remove('show')
        s.classList.remove('show-flex')
        })

        form.classList.add('show')
        document.querySelector('#rounds-input').value = ''

        currentRoundHTML.innerHTML = '~'
        totalRoundsHTML.innerHTML = '~'

        changeScore()
    }
})

// functions

function rounds() {
    if (play === true) {
        currentRound++
        console.log('round', currentRound)
        if (currentRound < roundsInput) {
            console.log('before final round')
            currentRoundHTML.innerHTML = currentRound.toString()
            console.log(currentRoundHTML.innerHTML, 'current round html')
        } else {
            console.log('final round')
            currentRoundHTML.innerHTML = 'final'

            if (currentRound > roundsInput) {
                play = false
                return changeScreen('game over')
            }
        }

        if (oneRound === true) {
            currentRoundHTML.innerHTML = 'final'
            console.log('one round only')
        }

        if (roundsSet === false) {
            totalRoundsHTML.innerHTML = roundsInput.toString()
            roundsSet = true
            showScore()
        }
        
        changeScreen('pick')
    }
}

function changeScreen(screen) {
    screens.forEach(s => {
        s.classList.remove('show')
    })
    if (screen === 'pick') {
        pick.classList.add('show')
        console.log('show pick')
    } else if (screen === 'response') {
        console.log('show response')
        response.classList.add('show')
        setResponse()
    } else {
        console.log('show game over')
        endScreen.classList.add('show-flex')
        play = false
        winner()
    }
}

function setResponse() {
    // logic of winning and losing using compChoice and userChoice
    if (userChoice == 'rock') {
        if (compChoice == 'scissors') {
            roundWinner = 'user'
            userScore++
        } else if (compChoice == 'paper') {
            roundWinner = 'comp'
            compScore++
        } else {
            roundWinner = null
        }
    } else if (userChoice == 'scissors') {
        if (compChoice == 'paper') {
            roundWinner = 'user'
            userScore++
        } else if (compChoice == 'rock') {
            roundWinner = 'comp'
            compScore++
        } else {
            roundWinner = null
        }
    } else {
        if (compChoice == 'rock') {
            roundWinner = 'user'
            userScore++
        } else if (compChoice == 'scissors') {
            roundWinner = 'comp'
            compScore++
        } else {
            roundWinner = null
        }
    }
    console.log(userScore, 'user score')
    console.log(compScore, 'comp score')
    console.log(roundWinner, 'round winner')

    responseScreen()
    changeScore()

    setTimeout(() => {
        rounds()
    }, 2000)
    
    // change response screen
}

function showScore() {
    scoreboard.style.display = 'block'
    title.style.display = 'none'
}

function changeScore() {
    userScoreHTML.innerHTML = userScore.toString()
    compScoreHTML.innerHTML = compScore.toString()
}

function responseScreen() {
    compChoiceHTML.innerHTML = compChoice.charAt(0).toUpperCase() + compChoice.slice(1)
    beatsHTML.innerHTML = 'beats'
    if (roundWinner === 'user') {
        winMoveHTML.innerHTML = userChoice.charAt(0).toUpperCase() + userChoice.slice(1)
        loseMoveHTML.innerHTML = compChoice.charAt(0).toUpperCase() + compChoice.slice(1)
        resultHTML.innerHTML = 'You win!'
    } else if (roundWinner === 'comp') {
        winMoveHTML.innerHTML = compChoice.charAt(0).toUpperCase() + compChoice.slice(1)
        loseMoveHTML.innerHTML = userChoice.charAt(0).toUpperCase() + userChoice.slice(1)
        resultHTML.innerHTML = 'You lose!'
    } else {
        winMoveHTML.innerHTML = ''
        loseMoveHTML.innerHTML = ''
        beatsHTML.innerHTML = ''
        resultHTML.innerHTML = 'DRAW'
    }
}

function winner() {
    if (userScore > compScore) {
        winnerHTML.innerHTML = 'You won!'
    } else if (userScore < compScore) {
        winnerHTML.innerHTML = 'You lost :('
    } else {
        winnerHTML.innerHTML = 'DRAW'
    }
}