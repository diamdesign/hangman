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

const hangwordsList = [
	{ name: "Banana", tip: "A yellow fruit" },
	{ name: "Constipated", tip: "An uncomfortable feeling" },
	{ name: "Destruction", tip: "Causing severe damage or harm." },
	{ name: "Darkness", tip: "Absence of light" },
	{ name: "Living", tip: "Excisting" },
	{ name: "Waters", tip: "Wet" },
	{ name: "Elephant", tip: "A large mammal with tusks and a trunk" },
	{ name: "Computer", tip: "Electronic device for processing data" },
	{ name: "Adventure", tip: "An exciting or daring experience" },
	{ name: "Mountain", tip: "A large landform" },
	{ name: "Whisper", tip: "Soft-spoken words" },
	{ name: "Sunshine", tip: "Radiant light from the sun" },
	{ name: "Giraffe", tip: "Tall African mammal with a long neck" },
	{ name: "Sapphire", tip: "A precious blue gemstone" },
	{ name: "Marathon", tip: "A long-distance running race" },
	{ name: "Firefly", tip: "Bioluminescent insect" },
	{ name: "Voyage", tip: "A long journey or trip" },
	{ name: "Silhouette", tip: "Outline of a person or object" },
	{ name: "Jazz", tip: "Musical genre with improvisation" },
	{ name: "Galaxy", tip: "A vast system of stars" },
	{ name: "Champion", tip: "Winner or top performer" },
	{ name: "Cinnamon", tip: "A spice with a sweet flavor" },
	{ name: "Cinnamon", tip: "Sweet spice" },
	{ name: "Majestic", tip: "Grand and impressive" },
	{ name: "Celestial", tip: "Relating to the sky or outer space" },
	{ name: "Mystical", tip: "Enigmatic and magical" },
	{ name: "Infinity", tip: "Endless or limitless" },
	{ name: "Serenade", tip: "Musical expression of love" },
	{ name: "Cascade", tip: "Waterfall or series of stages" },
	{ name: "Aurora", tip: "Natural light display in the sky" },
	{ name: "Blossom", tip: "Flower or period of growth" },
	{ name: "Tranquil", tip: "Peaceful and calm" },
	{ name: "Radiant", tip: "Glowing with brightness" },
	{ name: "Harmony", tip: "Unity and balance" },
	{ name: "Eclipse", tip: "Partial or total blocking of light" },
	{ name: "Quasar", tip: "Astronomical object emitting large amounts of energy" },
	{ name: "Sculpture", tip: "Art of carving or molding" },
	{ name: "Luminous", tip: "Bright and shining" },
	{ name: "Symphony", tip: "Orchestral composition" },
	{ name: "Glisten", tip: "Shine with a sparkling light" },
	{ name: "Pinnacle", tip: "Highest point or achievement" },
];

const randomIndex = Math.floor(Math.random() * hangwordsList.length);
const randomWord = hangwordsList[randomIndex];

const randomName = randomWord.name.toUpperCase();
const randomTip = randomWord.tip;

/* console.log("Random Word: " + randomName); */
console.log("Tip: " + randomTip);

const header = document.getElementsByTagName("h1")[0]; // Access the first h1 element

// Assuming you have a randomTip variable
header.textContent = randomTip;

const insertLetters = document.querySelector(".letters");

for (let i = 0; i < randomName.length; i++) {
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
			if (randomName.includes(letter)) {
				console.log("Letter is included...");
				// Find all indices where the inputLetter occurs in the hangword
				const indices = [];
				for (let i = 0; i < randomName.length; i++) {
					if (randomName[i] === letter) {
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
