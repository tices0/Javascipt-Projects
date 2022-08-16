btnsHTML = document.querySelector('#btns')

operators = ['+', '-', '&#215', '&#247']
ids = ['+', '-', '*', '/']

for (let i = 3; i > -1; i--) {
    btnsHTML.insertAdjacentHTML(
        'afterbegin',
        `<input type="button" value="${operators[i]}" id='${ids[i]}' class="btn operator">`
    )
}

for (let i = 1; i < 10; i++) {
    btnsHTML.insertAdjacentHTML(
        'beforeend',
        `<input type="button" value="${i}" class="btn number">`
    )
}

btnsHTML.insertAdjacentHTML(
    'beforeend',
    `<input type="button" value="0" class="btn number zero">
    <input type="button" value="." class="btn number">
    <input type="button" value="AC" class="btn" id='AC'>
    `
)

// Operations

btns = document.querySelectorAll('.btn')

var operation = []
var restart = false
var lastIsNum
var lastIsDot
var normal

btns.forEach(btn => {
    console.log('for loop works')
    btn.addEventListener('click', () => {
        // change color
        normal = btn.style.backgroundColor
        btn.style.backgroundColor = '#add8e6'
        setTimeout(() => {
            console.log('interval ended')
            btn.style.backgroundColor = normal
        }, 150)

        // remove red border
        document.querySelector('.screen').style.border = 'none'

        // reset after = btn clicked
        if (answered === true) {
            answered = false
            reset()
        }
        // reset restart variable
        restart = false
        console.log('clicked')

        // checks what btn was clicked
        if (btn.classList.contains('number')) {
            operation.push(btn.value)
            lastIsNum = true
            if (btn.value === '.') {
                lastIsDot = true
            } else {
                lastIsDot = false
            }
        } else if (btn.classList.contains('operator')) {
            operation.push(btn.id)
            btnId = btn.id
            sign = btn.value
            lastIsNum = false
        } else if (btn.id == 'AC') {
            // reset screen
            lastIsNum = false
            operation = []
            restart = true
        } else {
            // show answer
            console.log('equal')
            return answer()
        }

        console.log(operation)
        if (restart !== true) {
            // continue as usual
            return question()
        } else {
            // clear screen
            return clear()
        }
    })
})

// Functions

var calculation
var questionHTML = document.querySelector('.question')
var answerHTML = document.querySelector('.answer')
var index = null
var listIndex = null
var copy = []

function question() {
    if (operation.length === 1 && (lastIsNum === false || lastIsDot === true)) {
        temp = operation[operation.length - 1]
        operation = ['0']
        operation.push(temp)
    }


    // actual calculation
    calculation = operation.join('')
    console.log(calculation)
    questionHTML.innerHTML = calculation

    show_answer()
}

var no_equal = false
var answered = false

function show_answer() {
    // check if last input was a number
    if (parseInt(operation[operation.length - 1]) || operation[operation.length - 1] == 0) {
        // console.log(eval(calculation), 'eval')
        answerHTML.innerHTML = eval(calculation)
        answerHTML.style.opacity = 100
        console.log('---')
        no_equal = false
        // console.log('last value was a number')
    }
    else {
        // console.log('cannot find answer')
        no_equal = true
    }
}

function clear() {
    operation = []
    calculation = null
    questionHTML.innerHTML = 0
    answerHTML.style.opacity = 0
}

function answer() {
    if (no_equal) {
        document.querySelector('.screen').style.border = '3px solid red'
    } else {
        if (operation.length > 0) {
            questionHTML.style.display = 'none'
            answerHTML.style.fontSize = '25px'
            answerHTML.style.paddingBottom = '18px'
            answered = true
            operation = []
            operation.push(eval(calculation))
            // calculation = eval(calculation)
            // console.log(operation, calculation)
        } else {
            operation = ['0']
        }
    }
}

function reset() {
    questionHTML.style.display = 'block'
    answerHTML.style.fontSize = '16px'
    answerHTML.style.paddingBottom = '0'
}