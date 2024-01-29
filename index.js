var letters = document.querySelector(".written-letters");
const bodyTag = document.body;
letters.innerHTML = "";

var gameover = false;
var multiplier = 1;
var points = 0;
var wins = 0;
var loss = 0;
var ratio = 0;

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
	{ name: "Joy", tip: "Feeling of great happiness" },
	{ name: "Peace", tip: "State of tranquility" },
	{ name: "Hope", tip: "Optimistic expectation" },
	{ name: "Smile", tip: "Facial expression of happiness" },
	{ name: "Dream", tip: "Series of thoughts during sleep" },
	{ name: "Laugh", tip: "Expressing amusement" },
	{ name: "Friend", tip: "Companion with mutual affection" },
	{ name: "Sun", tip: "Source of light and warmth" },
	{ name: "Moon", tip: "Natural satellite of Earth" },
	{ name: "Star", tip: "Luminous celestial body" },
	{ name: "Ocean", tip: "Vast body of saltwater" },
	{ name: "Tree", tip: "Tall plant with a trunk" },
	{ name: "Book", tip: "Written or printed work" },
	{ name: "Music", tip: "Art form of sound expression" },
	{ name: "Color", tip: "Visual perception" },
	{ name: "Love", tip: "Strong affection or deep romantic feeling" },
	{ name: "Nature", tip: "Physical world and everything in it" },
	{ name: "Cloud", tip: "Visible mass of water droplets" },
	{ name: "Rainbow", tip: "Meteorological phenomenon" },
	{ name: "Butterfly", tip: "Insect with colorful wings" },
	{ name: "Abraham", tip: "Patriarch and father of many nations" },
	{ name: "Sarah", tip: "Wife of Abraham and mother of Isaac" },
	{ name: "Moses", tip: "Prophet and leader who received the Ten Commandments" },
	{ name: "David", tip: "Shepherd, musician, and second king of Israel" },
	{ name: "Solomon", tip: "Son of David, known for wisdom and building the temple" },
	{ name: "Ruth", tip: "Faithful daughter-in-law and great-grandmother of David" },
	{ name: "Samson", tip: "Judge known for strength and long hair" },
	{ name: "Delilah", tip: "Woman who betrayed Samson by cutting his hair" },
	{ name: "Esther", tip: "Jewish queen who saved her people from genocide" },
	{ name: "Mordecai", tip: "Uncle and guardian of Esther" },
	{ name: "Job", tip: "Righteous man who faced great suffering" },
	{ name: "Naomi", tip: "Mother-in-law of Ruth" },
	{ name: "Boaz", tip: "Kinsman of Ruth and eventual husband" },
	{ name: "Elijah", tip: "Prophet who confronted Baal prophets on Mount Carmel" },
	{ name: "Elisha", tip: "Prophet and successor of Elijah" },
	{ name: "Mary", tip: "Mother of Jesus" },
	{ name: "Joseph", tip: "Husband of Mary and earthly father of Jesus" },
	{ name: "John", tip: "Disciple of Jesus, also known as the beloved disciple" },
	{ name: "Peter", tip: "Disciple and leader of the apostles" },
	{ name: "Paul", tip: "Apostle and prolific writer of the New Testament" },
];

var randomName = "";
var randomTip = "";
const header = document.getElementsByTagName("h1")[0];
var insertLetters = document.querySelector(".letters");
const multiplierHTML = document.querySelector(".multiplier");

function getRandomWord() {
	let randomIndex = Math.floor(Math.random() * hangwordsList.length);
	let randomWord = hangwordsList[randomIndex];

	randomName = randomWord.name.toUpperCase();
	randomTip = randomWord.tip;

	/* console.log("Random Word: " + randomName); */
	console.log("Tip: " + randomTip);

	// Assuming you have a randomTip variable
	header.textContent = randomTip;

	for (let i = 0; i < randomName.length; i++) {
		let html = `<span></span>`;
		insertLetters.insertAdjacentHTML("beforeend", html);
	}
}

getRandomWord();

const winsHTML = document.querySelector(".wins span");
const lossHTML = document.querySelector(".loss span");
const ratioHTML = document.querySelector(".ratio span");
const pointsHTML = document.querySelector(".points span");

function checkWin() {
	// Get all spans inside insertLetters
	const spans = insertLetters.querySelectorAll("span");

	// Check if all spans have the class "active"
	const allActive = Array.from(spans).every((span) => span.classList.contains("active"));

	const computedStyle = window.getComputedStyle(body);
	const isBodyVisible = computedStyle.display !== "none";

	console.log("isBodyVisible:", isBodyVisible);

	if (allActive) {
		multiplier += 1;
		multiplierHTML.innerHTML = "x" + multiplier;
		console.log("You win!");
		addSound("win");
		wins += 1;
		winsHTML.innerHTML = wins;
		let numberOfSpans = letters.children.length;
		console.log(numberOfSpans);
		// Calculate points based on the length of the word and deduct 100 points for each span
		let newPoints = (randomName.length - numberOfSpans + randomName.length) * 100 * multiplier;
		console.log(randomName.length);
		console.log(newPoints);
		points += newPoints;
		pointsHTML.innerHTML = points;
		updateRatio();
		setTimeout(() => {
			resetGame();
		}, 400);

		// Add your win logic here
	} else if (isBodyVisible) {
		multiplier = 1;
		multiplierHTML.innerHTML = "";
		console.log("Game over!");
		gameover = true;
		addSound("loss");
		setTimeout(function () {
			let allAudio = document.querySelectorAll("audio");
			allAudio.forEach((audioElement) => audioElement.remove());
		}, 2500);

		loss += 1;
		lossHTML.innerHTML = loss;
		updateRatio();
		setTimeout(() => {
			gameover = false;
			resetGame();
		}, 2500);
		// Add your game over logic here
	} else {
		console.log("Not all letters are active yet.");
	}
}

function updateRatio() {
	let newRatio = wins / loss;
	ratioHTML.innerHTML = newRatio.toFixed(2);
}

const audioKey = document.getElementById("audio-key");
let audioNo = 0;

function addSound(soundfile) {
	audioNo += 1;
	let audioName = "audio-key" + audioNo;
	let audio = `<audio id="${audioName}">\
				<source src="sound/${soundfile}.mp3" type="audio/mpeg" />\
			</audio>`;
	document.body.insertAdjacentHTML("beforeend", audio);
	let newElement = document.getElementById(audioName);
	newElement.play();

	let timeout = 800;

	if (soundfile === "win" || soundfile === "loss") {
		timeout = 5000;
	}

	setTimeout(function () {
		newElement.remove();
	}, timeout);
}

document.addEventListener("keydown", (e) => {
	e.preventDefault();

	if (!gameover) {
		addSound("key");
		if (/^[a-zA-Z ]$/.test(e.key)) {
			let letter = e.key.toUpperCase();

			if (!writtenLetters.includes(letter)) {
				console.log("New letter:", letter);
				const newLetter = `<span>${letter}</span>`;
				letters.insertAdjacentHTML("beforeend", newLetter);
				writtenLetters.push(letter);
				if (randomName.includes(letter)) {
					addSound("correct");
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
					addSound("wrong");
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
	}
});

function resetGame() {
	audioNo = 0;

	letters.innerHTML = "";
	writtenLetters = [];
	ground.style.display = "none";
	head.style.display = "none";
	legs.style.display = "none";
	arms.style.display = "none";
	scaffold.style.display = "none";
	hbody.style.display = "none";
	hangmanArray = ["ground", "head", "scaffold", "arms", "legs", "body"];
	insertLetters.innerHTML = "";
	bodyTag.style.background =
		"radial-gradient(circle, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 100%)";
	getRandomWord();
}
