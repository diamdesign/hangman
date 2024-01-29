const letters = document.querySelector(".written-letters");
letters.innerHTML = "";

let writtenLetters = [];

let hangmanArray = ["ground", "head", "scaffold", "arms", "legs", "body"];

const ground = document.getElementById("ground");
const head = document.getElementById("head");
const legs = document.getElementById("arms");
const arms = document.getElementById("legs");
const scaffold = document.getElementById("scaffold");
const body = document.getElementById("body");

const hangwordsList = ["Banan", "Konstiperad", "Förödelse", "Förmörkelse", "Grönska", "Durumvete"];
const hangwords = hangwordsList.map((word) => word.toUpperCase());
const hangword = hangwords[Math.floor(Math.random() * hangwords.length)];
console.log(hangword);

const insertLetters = document.querySelector(".letters");

for (let i = 0; i < hangword.length; i++) {
	let html = `<span></span>`;
	insertLetters.insertAdjacentHTML("beforeend", html);
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
			} else {
				const hangedman = document.querySelector(".hangman");
				hangedman.classList.add("shake");
				setTimeout(() => {
					hangedman.classList.remove("shake");
				}, 300);
				if (hangmanArray[0] === "ground") {
					ground.style.display = "block";
					hangmanArray.shift();
				} else if (hangmanArray[0] === "head") {
					head.style.display = "block";
					hangmanArray.shift();
				} else if (hangmanArray[0] === "arms") {
					arms.style.display = "block";
					hangmanArray.shift();
				} else if (hangmanArray[0] === "legs") {
					legs.style.display = "block";
					hangmanArray.shift();
				} else if (hangmanArray[0] === "scaffold") {
					scaffold.style.display = "block";
					hangmanArray.shift();
				} else if (hangmanArray[0] === "body") {
					body.style.display = "block";
					hangmanArray.shift();
				}
			}
		}
	} else {
		console.log("Letter already written:", letter);
	}
});
