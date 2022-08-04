const num = document.querySelector('h2')
const btns = document.querySelectorAll('.btn')

let count = 0

btns.forEach(i => {
    i.addEventListener('click', () => {
        if (i.classList.contains('increase')) {
            count++
        } else if (i.classList.contains('decrease')) {
            count--
        } else {
            count = 0
        }
        num.innerHTML = count
    })

})

