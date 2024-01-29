const letters = document.querySelector(".written-letters");
const bodyTag = document.body;
letters.innerHTML = "";

let writtenLetters = [];

let hangmanArray = ["ground", "head", "scaffold", "arms", "legs", "body"];

const ground = document.getElementById("ground");
const head = document.getElementById("head");
const legs = document.getElementById("arms");
const arms = document.getElementById("legs");
const scaffold = document.getElementById("scaffold");
const hbody = document.getElementById("body");

const hangwordsList = ["Banana", "Constipated", "Destruction", "Darkness", "Living", "Waters"];
const hangwords = hangwordsList.map((word) => word.toUpperCase());
const hangword = hangwords[Math.floor(Math.random() * hangwords.length)];
// console.log(hangword);

const insertLetters = document.querySelector(".letters");

for (let i = 0; i < hangword.length; i++) {
	let html = `<span></span>`;
	insertLetters.insertAdjacentHTML("beforeend", html);
}

function checkWin() {
	// Get all spans inside insertLetters
	const spans = insertLetters.querySelectorAll("span");

	// Check if all spans have the class "active"
	const allActive = Array.from(spans).every((span) => span.classList.contains("active"));

	const computedStyle = window.getComputedStyle(body);
	const isBodyVisible = computedStyle.display !== "none";

	console.log("isBodyVisible:", isBodyVisible);

	if (allActive) {
		alert("You won!");
		console.log("You win!");
		setTimeout(() => {
			location.reload();
		}, 1000);
		// Add your win logic here
	} else if (isBodyVisible) {
		alert("Game over!");
		console.log("Game over!");
		setTimeout(() => {
			location.reload();
		}, 1000);
		// Add your game over logic here
	} else {
		console.log("Not all letters are active yet.");
	}
}

document.addEventListener("keydown", (e) => {
	e.preventDefault();

	if (/^[a-zA-Z ]$/.test(e.key)) {
		let letter = e.key.toUpperCase();

		if (!writtenLetters.includes(letter)) {
			console.log("New letter:", letter);
			const newLetter = `<span>${letter}</span>`;
			letters.insertAdjacentHTML("beforeend", newLetter);
			writtenLetters.push(letter);
			if (hangword.includes(letter)) {
				console.log("Letter is included...");
				// Find all indices where the inputLetter occurs in the hangword
				const indices = [];
				for (let i = 0; i < hangword.length; i++) {
					if (hangword[i] === letter) {
						indices.push(i);
					}
				}

				// Update the spans at the identified indices
				indices.forEach((index) => {
					const spanAtIndex = insertLetters.children[index];
					if (spanAtIndex) {
						spanAtIndex.textContent = letter;
						spanAtIndex.classList.add("active");
					}
				});
			} else {
				const hangedman = document.querySelector(".hangman");
				hangedman.classList.add("shake");
				setTimeout(() => {
					hangedman.classList.remove("shake");
				}, 300);
				if (hangmanArray[0] === "ground") {
					ground.style.display = "block";
					hangmanArray.shift();
					bodyTag.style.background =
						"radial-gradient(circle, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%)";
				} else if (hangmanArray[0] === "head") {
					head.style.display = "block";
					bodyTag.style.background =
						"radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 100%)";
					hangmanArray.shift();
				} else if (hangmanArray[0] === "scaffold") {
					bodyTag.style.background =
						"radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 90%)";
					scaffold.style.display = "block";
					hangmanArray.shift();
				} else if (hangmanArray[0] === "arms") {
					arms.style.display = "block";
					bodyTag.style.background =
						"radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 80%)";
					hangmanArray.shift();
				} else if (hangmanArray[0] === "legs") {
					legs.style.display = "block";
					bodyTag.style.background =
						"radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 70%)";
					hangmanArray.shift();
				} else if (hangmanArray[0] === "body") {
					hbody.style.display = "block";
					bodyTag.style.background =
						"radial-gradient(circle, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 60%)";
					hangmanArray.shift();
				}
			}
			checkWin();
		}
	} else {
		console.log("Letter already written:", letter);
	}
});
