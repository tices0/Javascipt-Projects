var tasks = [];

// localStorage.removeItem("tasksKey");

// task html element
const form = document.querySelector("form");
const formInput = document.querySelector(".task-input");
const formSubmit = document.querySelector(".submit");

const tasksHTML = document.querySelector(".tasks");
var taskLi = document.querySelectorAll(".task");

var deleteHTML = document.querySelectorAll(".delete");
var checkboxHTML = document.querySelectorAll(".box");

// =================

if (localStorage.getItem("tasksKey")) {
	console.log("taken from local storage");
	tasks = JSON.parse(localStorage.getItem("tasksKey"));
	localStorage.setItem("oneTask", oneTask);

	if (tasks.length > 0) {
		tasksHTML.classList.add("background");
	}
	resetList();

	taskLi = document.querySelectorAll(".task");
	checkDone();

	deleteHTML = document.querySelectorAll(".delete");
	checkboxHTML = document.querySelectorAll(".box");

	deleteBtn();
	done();
}

console.log(tasks);

var oneTask = false;

// objects
function Task(task) {
	this.task = task;
	this.done = false;
}

// event listeners
form.addEventListener("submit", () => {
	if (formInput && formInput.value && formInput.value.trim().length !== 0) {
		console.log("form submitted");
		tasks[tasks.length] = new Task(formInput.value);
		console.log(tasks);
		formInput.value = "";
		addItem();

		localStorage.setItem("tasksKey", JSON.stringify(tasks));

		if (oneTask === false) {
			oneTask = true;
			tasksHTML.classList.add("background");
		}

		deleteHTML = document.querySelectorAll(".delete");
		checkboxHTML = document.querySelectorAll(".box");
		taskLi = document.querySelectorAll(".task");

		deleteBtn();
		done();
	}
});

// functions

function addItem() {
	let task = tasks[tasks.length - 1];
	tasksHTML.insertAdjacentHTML(
		"beforeend",
		`
            <li class="task">
                <div class="left">
                    <input type="checkbox" class="box" />
                    <p class="content">${task.task}</p>
                </div>
                <button class="btn delete">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </li>
        `,
	);
}

function deleteBtn() {
	deleteHTML.forEach(btn => {
		btn.addEventListener("click", () => {
			console.log("delete");
			btn.parentElement.style.display = "none";
			let p = btn.parentElement.querySelector(".content");

			tasks.forEach(item => {
				if (item.task === p.innerHTML) {
					let index = tasks.indexOf(item);
					if (index !== -1) {
						console.log("removed from list");
						tasks.splice(index, 1);
					}
				}
			});

			if (tasks.length < 1) {
				console.log("remove background");
				tasksHTML.classList.remove("background");
				oneTask = false;
			}

			localStorage.setItem("tasksKey", JSON.stringify(tasks));
		});
	});
}

function done() {
	checkboxHTML.forEach(box => {
		box.addEventListener("click", () => {
			console.log("done");
			let p = box.parentElement.querySelector(".content");
			p.classList.toggle("strike");

			tasks.forEach(item => {
				if (item.task === p.innerHTML) {
					if (item.done) item.done = false;
					else item.done = true;
					console.log(item);
				}
			});

			localStorage.setItem("tasksKey", JSON.stringify(tasks));
		});
	});
}

function resetList() {
	tasks.forEach(task => {
		tasksHTML.insertAdjacentHTML(
			"beforeend",
			`
                <li class="task">
                    <div class="left">
                        <input type="checkbox" class="box" />
                        <p class="content">${task.task}</p>
                    </div>
                    <button class="btn delete">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </li>
            `,
		);
	});
}

function checkDone() {
	tasks.forEach(task => {
		taskLi.forEach(li => {
			let p = li.querySelector(".content");
			let box = li.querySelector(".box");
			if (p.innerHTML === task.task && task.done === true) {
				p.classList.add("strike");
				box.checked = true;
			}
		});
	});
}
