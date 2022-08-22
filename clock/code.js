const clock = document.querySelector('.time');
var interval = setInterval(time, 1000);

function time() {
    current = new Date();
    now = current.toLocaleTimeString();
    clock.innerHTML = now
}
