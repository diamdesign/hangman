var letters = document.querySelector(".written-letters");
const bodyTag = document.body;
const musicTag = document.querySelector("#music");
const pTag = document.querySelector("p");

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
	{ name: "River", tip: "Flowing watercourse" },
	{ name: "Cloud", tip: "Collection of water vapor in the sky" },
	{ name: "Music", tip: "Art form with sound and rhythm" },
	{ name: "Smile", tip: "Facial expression of happiness" },
	{ name: "Mountain", tip: "Elevated landform with a peak" },
	{ name: "Bird", tip: "Feathered, winged animal" },
	{ name: "Dance", tip: "Rhythmic movement to music" },
	{ name: "Candle", tip: "Wax object with a wick for lighting" },
	{ name: "Color", tip: "Visual perception created by light" },
	{ name: "Rain", tip: "Precipitation in liquid form from clouds" },
	{ name: "Home", tip: "Place of residence" },
	{ name: "Time", tip: "Measurement of events and intervals" },
	{ name: "Food", tip: "Edible substances for nourishment" },
	{ name: "Love", tip: "Deep affection or strong emotional attachment" },
	{ name: "City", tip: "Large human settlement" },
	{ name: "Key", tip: "Device for opening locks" },
	{ name: "Fish", tip: "Aquatic animal with gills and fins" },
	{ name: "Door", tip: "Entryway or barrier with hinges" },
	{ name: "Mountain", tip: "Elevated landform with a peak" },
	{ name: "Road", tip: "Path for vehicles or pedestrians" },
	{ name: "Lively", tip: "Full of life and energy" },
	{ name: "Harmony", tip: "A pleasing arrangement of parts" },
	{ name: "Gentle", tip: "Kind and mild in temperament" },
	{ name: "Mirthful", tip: "Full of joy and laughter" },
	{ name: "Serene", tip: "Calm and peaceful" },
	{ name: "Amiable", tip: "Friendly and pleasant" },
	{ name: "Radiant", tip: "Shining brightly" },
	{ name: "Tranquil", tip: "Calm and quiet" },
	{ name: "Dazzling", tip: "Brilliantly impressive" },
	{ name: "Vivid", tip: "Bright and distinct" },
	{ name: "Graceful", tip: "Elegant and refined in movement" },
	{ name: "Charming", tip: "Pleasant and attractive" },
	{ name: "Cordial", tip: "Warm and friendly" },
	{ name: "Jubilant", tip: "Exultantly joyful" },
	{ name: "Pleasant", tip: "Enjoyable and agreeable" },
	{ name: "Soothing", tip: "Calming and comforting" },
	{ name: "Delightful", tip: "Highly pleasing" },
	{ name: "Wholesome", tip: "Conducive to good health" },
	{ name: "Cheerful", tip: "Full of good spirits" },
	{ name: "Amicable", tip: "Characterized by friendliness" },
	{ name: "Elephant", tip: "Large land mammal with a trunk" },
	{ name: "Dolphin", tip: "Marine mammal known for its intelligence" },
	{ name: "Kangaroo", tip: "Marsupial with powerful hind legs" },
	{ name: "Giraffe", tip: "Tall, long-necked herbivorous mammal" },
	{ name: "Panda", tip: "Bear native to China, known for its black and white fur" },
	{ name: "Tiger", tip: "Large cat with distinctive orange coat and black stripes" },
	{ name: "Lion", tip: "Large, carnivorous feline with a majestic mane" },
	{ name: "Cheetah", tip: "Fastest land animal with spotted coat" },
	{ name: "Gorilla", tip: "Large, powerful primate with dark fur" },
	{ name: "Horse", tip: "Domesticated hoofed mammal often used for riding" },
	{ name: "Koala", tip: "Australian marsupial with a diet of eucalyptus leaves" },
	{ name: "Penguin", tip: "Flightless bird adapted to aquatic life" },
	{ name: "Polar Bear", tip: "Large bear adapted to life in the Arctic" },
	{ name: "Hippopotamus", tip: "Large, semi-aquatic mammal with a massive jaw" },
	{ name: "Rhinoceros", tip: "Thick-skinned herbivore with one or two horns on its snout" },
	{ name: "Sloth", tip: "Slow-moving arboreal mammal with a unique lifestyle" },
	{ name: "Red Fox", tip: "Cunning mammal with distinctive reddish-brown fur" },
	{ name: "Otter", tip: "Semiaquatic mammal known for its playful behavior" },
	{ name: "Gray Wolf", tip: "Social carnivore native to various ecosystems" },
	{ name: "Humpback Whale", tip: "Large marine mammal known for its distinctive songs" },
	{ name: "Dolphin", tip: "Marine mammal known for its intelligence" },
	{ name: "Whale Shark", tip: "Largest fish species, a filter-feeding carpet shark" },
	{ name: "Sea Turtle", tip: "Reptile adapted to life in the sea with flippers" },
	{ name: "Octopus", tip: "Soft-bodied cephalopod mollusk with eight arms" },
	{ name: "Jellyfish", tip: "Gelatinous aquatic creature with trailing tentacles" },
	{ name: "Manatee", tip: "Large, herbivorous marine mammal often called a sea cow" },
	{ name: "Seahorse", tip: "Small marine fish with a distinctive appearance" },
	{ name: "Penguin", tip: "Flightless bird adapted to aquatic life" },
	{ name: "Seal", tip: "Semiaquatic mammal with flippers for swimming" },
	{ name: "Squid", tip: "Cephalopod mollusk with a distinct head and tentacles" },
	{ name: "Shark", tip: "Carnivorous fish with cartilaginous skeletons" },
	{ name: "Whale", tip: "Large marine mammal" },
	{ name: "Stingray", tip: "Flat-bodied cartilaginous fish with a long, barbed tail" },
	{ name: "Tuna", tip: "Fast-swimming fish with a sleek, streamlined body" },
	{ name: "Crocodile", tip: "Reptile with aquatic habits, found in tropical regions" },
	{ name: "Sponge", tip: "Simple aquatic animal with a porous body" },
	{ name: "Crab", tip: "Crustacean with a broad, flat body and claws" },
	{ name: "Lobster", tip: "Large marine crustacean with a hard exoskeleton" },
	{ name: "Man-o-War", tip: "Floating colony of hydrozoans with long tentacles" },
	{ name: "Angelfish", tip: "Colorful marine fish with a distinctive shape" },
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

function gameOver() {
	multiplier = 1;
	multiplierHTML.innerHTML = "";
	console.log("Game over!");
	gameover = true;
	addSound("loss");
	addSound("incorrect");
	setTimeout(function () {
		let allAudio = document.querySelectorAll("audio");
		allAudio.forEach((audioElement) => audioElement.remove());
	}, 2500);

	loss += 1;
	lossHTML.innerHTML = loss;
	updateRatio();
	clearInterval(countdownInterval);
	setTimeout(() => {
		gameover = false;
		resetGame();
	}, 2500);
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
		multiplier += 1;
		multiplierHTML.classList.add("multion");
		multiplierHTML.innerHTML = "x" + multiplier;
		setTimeout(() => {
			multiplierHTML.classList.remove("multion");
		}, 100);
		console.log("You win!");
		addSound("win");
		addSound("tada");

		circleHtml = '<div class="circle"></div>';
		bodyTag.insertAdjacentHTML("beforeend", circleHtml);

		setTimeout(() => {
			let removetag = document.querySelectorAll(".circle");
			removetag.forEach((tag) => {
				tag.remove();
			});
		}, 2000);

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
		gameOver();
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
	} else if (soundfile === "ticking") {
		timeout = 3000;
	}

	setTimeout(function () {
		newElement.remove();
	}, timeout);
}

document.addEventListener("keydown", (e) => {
	e.preventDefault();
	if (musicTag.paused) {
		musicTag.volume = 0.6;
		musicTag.play();
	}
	if (!gameover) {
		addSound("key");
		pTag.style.display = "none";
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
					const shaker = hangedman.querySelector("svg");

					shaker.classList.add("shake");
					setTimeout(() => {
						shaker.classList.remove("shake");
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
	pTag.style.display = "block";
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
	resetCountdown();
}

let countdownValue = 10;
let countdownInterval;

// Function to update the countdown display
function updateCountdown() {
	const countdownElement = document.getElementById("countdown");
	countdownElement.textContent = countdownValue;
}

// Function to start the countdown
function startCountdown() {
	// Initial update
	updateCountdown();

	// Update the countdown every second
	countdownInterval = setInterval(() => {
		countdownValue--;

		// Update the countdown display
		updateCountdown();

		if (countdownValue === 3) {
			addSound("ticking");
		}
		// Check if countdown has reached 0
		if (countdownValue === 1) {
			setTimeout(() => {
				// Stop the countdown
				clearInterval(countdownInterval);
				gameOver();
			}, 1000);
		}
	}, 1000);
}

function resetCountdown() {
	// Clear the existing interval
	clearInterval(countdownInterval);

	// Reset the countdown value
	countdownValue = 10;

	// Start a new countdown
	startCountdown();
}

startCountdown();
