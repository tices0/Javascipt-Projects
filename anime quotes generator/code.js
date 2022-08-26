const icons = document.querySelectorAll("nav i");
const nav = document.querySelector("nav");
const main = document.querySelector("main");
const searchInput = document.querySelector(".search");
const form = document.querySelector("form");

var animes = document.querySelectorAll(".anime-container");

// event listeners

icons.forEach(icon => {
	// hover event listener
	icon.addEventListener("mouseenter", () => {
		nav.dataset.content = icon.dataset.icon;
	});
	icon.addEventListener("mouseleave", () => {
		nav.dataset.content = "";
	});
	// click event listener
	icon.addEventListener("click", () => {
		if (icon.dataset.icon === "random") {
			oneRandom();
		} else if (icon.dataset.icon === "random 10") {
			tenRandom();
		} else {
			allAnimes();
		}
	});
});

searchInput.addEventListener("input", () => {
	if (searchInput.value.length > 2) {
		searchAnimes();
	}
});

form.addEventListener("submit", () => {
	console.log("form submitted");
	let value = searchInput.value;
	byTitle(value);
	byCharacter(value);
	console.log(value);
});

// initial fetch for quote

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "1884fa5cb6msh32387de0225517ep16bbaejsndb7fa5daace2",
		"X-RapidAPI-Host": "anime-quotes1.p.rapidapi.com",
	},
};

// fetch("https://anime-quotes1.p.rapidapi.com/api/random", options)
// 	.then(response => response.json())
// 	.then(response => {
// 		console.log(response);
// 		main.innerHTML = `<div class="single">
//             <div class="inner">
//                 <h3>${response.anime}</h3>
//                 <p>
//                     ${response.quote}
//                 </p>
//                 <h4>~ ${response.character} ~</h4>
//             </div>
//         </div>
//         `;
// 	})
// 	.catch(err => console.error(err));

// functions

function oneRandom() {
	fetch("https://anime-quotes1.p.rapidapi.com/api/random", options)
		.then(response => response.json())
		.then(response => {
			console.log(response);
			main.innerHTML = `<div class="single">
        <div class="inner">
            <h3>${response.anime}</h3>
            <p>
                ${response.quote}
            </p>
            <h4>~ ${response.character} ~</h4>
        </div>
    </div>
    `;
			main.style.display = "flex";
			main.style.justifyContent = "center";
			main.style.alignItems = "center";
		})
		.catch(err => console.error(err));
}

function tenRandom() {
	fetch("https://anime-quotes1.p.rapidapi.com/api/quotes", options)
		.then(response => response.json())
		.then(response => {
			console.log(response);

			main.innerHTML = "";
			response.forEach(anime => {
				main.insertAdjacentHTML(
					"beforeend",
					`<div class="single">
                        <div class="inner">
                            <h3>${anime.anime}</h3>
                            <p>
                                ${anime.quote}
                            </p>
                            <h4>~ ${anime.character} ~</h4>
                        </div>
                    </div>
                    `,
				);
			});
			main.style.display = "grid";
			main.style.gridTemplateColumns = "1fr 1fr";
			main.style.gap = "2rem";
		})
		.catch(err => console.error(err));
}

function allAnimes() {
	fetch("https://anime-quotes1.p.rapidapi.com/api/available/anime", options)
		.then(response => response.json())
		.then(response => {
			console.log(response);

			main.innerHTML = "";
			response.forEach(anime => {
				main.insertAdjacentHTML(
					"beforeend",
					`<div class="anime-container">
                    <p class="anime">${anime}</p>
                </div>`,
				);
			});
			main.classList.add("anime-grid");

			animes = document.querySelectorAll(".anime-container");
			animes.forEach(anime => {
				let title = anime.querySelector(".anime");
				anime.addEventListener("click", () => byTitle(title.innerHTML));
			});
		})
		.catch(err => console.error(err));
}

function byTitle(title) {
	fetch(
		`https://anime-quotes1.p.rapidapi.com/api/quotes/anime?title=${title}`,
		options,
	)
		.then(response => response.json())
		.then(response => {
			console.log(response);
			main.innerHTML = "";
			response.forEach(anime => {
				main.insertAdjacentHTML(
					"beforeend",
					`<div class="single">
                        <div class="inner">
                            <h3>${anime.anime}</h3>
                            <p>
                                ${anime.quote}
                            </p>
                            <h4>~ ${anime.character} ~</h4>
                        </div>
                    </div>
                    `,
				);
			});
			main.style.display = "grid";
			main.style.gridTemplateColumns = "1fr 1fr";
		})
		.catch(err => console.error(err));
}

function byCharacter(character) {
	fetch(
		`https://anime-quotes1.p.rapidapi.com/api/quotes/character?name=${character}`,
		options,
	)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
}

function searchAnimes(value) {
	fetch("https://anime-quotes1.p.rapidapi.com/api/available/anime", options)
		.then(response => response.json())
		.then(response => {
			console.log(response);

			response.forEach(anime => {
				if (anime.includes(value)) {
				}
			});

			// let animeList;
			// animeList.forEach(anime => {
			// 	let title = anime.querySelector(".anime");
			// 	anime.addEventListener("click", () => byTitle(title.innerHTML));
			// });
		})
		.catch(err => console.error(err));
}
