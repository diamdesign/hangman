var letters = document.querySelector(".written-letters");
const bodyTag = document.body;
const musicTag = document.querySelector("#music");
const pTag = document.querySelector("p");

letters.innerHTML = "";

var highscore;

// Retrieve highscore from localStorage
var storedHighscore = localStorage.getItem("HIGHSCORE");

// Check if storedHighscore is null or undefined
if (storedHighscore === null || storedHighscore === undefined) {
	// Initialize highscore as an empty array
	highscore = [];
} else {
	// Parse the storedHighscore if it's not null
	highscore = JSON.parse(storedHighscore);
}

console.log(highscore);

const totalGamesHTML = document.querySelector(".totalgames span");
const totalQuestionsHTML = document.querySelector(".totalquestions span");
const totalWinsHTML = document.querySelector(".totalwins span");
const totalLossHTML = document.querySelector(".totalloss span");
const totalRatioHTML = document.querySelector(".totalratio span");
const avgPointsHTML = document.querySelector(".avgpoints span");
const highMultiHTML = document.querySelector(".highestmultiplier span");

var totalGames = highscore.length;
var totalQuestions = 0;
var totalWins = 0;
var totalLoss = 0;
var totalRatio = 0;
var totalPoints = 0;
var totalHighestMultiplier = 0;

function updateTotalScore() {
	totalGames = highscore.length;
	totalQuestions = 0;
	totalWins = 0;
	totalLoss = 0;
	totalRatio = 0;
	totalPoints = 0;
	totalHighestMultiplier = 0;
	for (let i = 0; i < highscore.length; i++) {
		let game = highscore[i];

		// Accumulate counts
		totalQuestions += game.questions;
		totalWins += game.wins;
		totalLoss += game.loss;
		totalRatio += game.ratio;
		totalPoints += game.points;

		// Update totalHighestMultiplier if the current game's highestmultiplier is greater
		totalHighestMultiplier = Math.max(totalHighestMultiplier, game.highestmultiplier);
	}
	totalRatio = totalRatio !== null ? totalRatio : 0;
	totalPoints = totalPoints !== null ? totalPoints : 0;

	// Calculate averages
	var averageRatio = totalGames !== 0 ? totalRatio / totalGames : 0;
	var averagePoints = totalGames !== 0 ? totalPoints / totalGames : 0;

	totalGamesHTML.textContent = totalGames;
	totalWinsHTML.textContent = totalWins;
	totalLossHTML.textContent = totalLoss;
	totalQuestionsHTML.textContent = totalQuestions;
	totalRatioHTML.textContent = averageRatio;
	avgPointsHTML.textContent = averagePoints;
	highMultiHTML.textContent = totalHighestMultiplier;
}
updateTotalScore();

var questions = 0;
var finished = false;
var gameover = false;
var multiplier = 1;
var highestMultiplier = 0;
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
	{ name: "Rainbow", tip: "Meteorological phenomenon" },
	{ name: "Weather", tip: "Atmospheric conditions at a specific time and place" },
	{ name: "Climate", tip: "Long-term patterns of temperature and precipitation" },
	{ name: "Season", tip: "Division of the year based on weather" },
	{ name: "Sunrise", tip: "Daily appearance of the sun above the horizon" },
	{ name: "Sunset", tip: "Daily disappearance of the sun below the horizon" },
	{ name: "Dawn", tip: "Early light before the sunrise" },
	{ name: "Dusk", tip: "Dim light after the sunset" },
	{ name: "Morning", tip: "Early part of the day" },
	{ name: "Evening", tip: "Later part of the day" },
	{ name: "Night", tip: "Period of darkness between sunset and sunrise" },
	{ name: "Twilight", tip: "Soft, diffused light before sunrise and after sunset" },
	{ name: "Starlight", tip: "Light from the stars" },
	{ name: "Constellation", tip: "Group of stars forming a pattern" },
	{ name: "Astronomy", tip: "Scientific study of celestial objects" },
	{ name: "Telescope", tip: "Instrument for viewing distant objects in space" },
	{ name: "Meteor", tip: "Small celestial body entering Earth's atmosphere" },
	{ name: "Comet", tip: "Icy celestial object with a tail of gas and dust" },
	{ name: "Galaxy", tip: "A vast system of stars" },
	{ name: "Nebula", tip: "Interstellar cloud of gas and dust" },
	{ name: "Black Hole", tip: "Region of spacetime with gravitational effects" },
	{ name: "Quasar", tip: "Astronomical object emitting large amounts of energy" },
	{ name: "Planetarium", tip: "Theater for presenting astronomical shows" },
	{ name: "Rocket", tip: "Vehicle propelled by ejected gases" },
	{ name: "Spaceship", tip: "Craft designed for travel or operation in outer space" },
	{ name: "Space Shuttle", tip: "Reusable spacecraft for transport to and from space" },
	{ name: "Asteroid", tip: "Small rocky body orbiting the sun" },
	{ name: "Meteoroid", tip: "Small particle from a comet or asteroid" },
	{ name: "Satellite", tip: "Object orbiting a celestial body" },
	{ name: "Orbit", tip: "Path an object takes around another object in space" },
	{ name: "Eclipse", tip: "Partial or total blocking of light" },
	{ name: "Gravity", tip: "Force that attracts objects toward each other" },
	{ name: "Lightyear", tip: "Distance light travels in one year" },
	{ name: "Milky Way", tip: "Spiral galaxy containing our solar system" },
	{ name: "Supernova", tip: "Explosion of a star, resulting in increased brightness" },
	{ name: "Exoplanet", tip: "Planet outside our solar system" },
	{ name: "Big Bang", tip: "Theoretical beginning of the universe" },
	{ name: "Multiverse", tip: "Hypothesized set of multiple universes" },
	{ name: "Time Travel", tip: "Concept of moving between different points in time" },
	{ name: "Parallel Universe", tip: "Hypothesized universe outside our own" },
	{ name: "Robot", tip: "Automated machine capable of tasks" },
	{ name: "Artificial Intelligence", tip: "Simulation of human intelligence in machines" },
	{
		name: "Virtual Reality",
		tip: "Computer-generated simulation of a three-dimensional environment",
	},
	{ name: "Cybersecurity", tip: "Protection of computer systems and networks" },
	{ name: "Algorithm", tip: "Step-by-step procedure for calculations" },
	{ name: "Data", tip: "Information in raw or unorganized form" },
	{ name: "Encryption", tip: "Conversion of data into a code to prevent unauthorized access" },
	{ name: "Decryption", tip: "Reversing encryption to make data readable" },
	{ name: "Virus", tip: "Malicious software that replicates itself" },
	{ name: "Computer", tip: "Electronic device for processing data" },
	{ name: "Internet", tip: "Global system of interconnected computer networks" },
	{ name: "Website", tip: "Collection of web pages on the World Wide Web" },
	{ name: "Social Media", tip: "Websites and applications for online communication" },
	{ name: "Smartphone", tip: "Mobile phone with advanced features" },
	{ name: "Tablet", tip: "Portable computer with a touchscreen" },
	{
		name: "Augmented Reality",
		tip: "Integration of digital information with the user's environment",
	},
	{ name: "Video Game", tip: "Electronic game involving interaction with a user interface" },
	{ name: "Console", tip: "Device for playing video games on a television" },
	{ name: "Controller", tip: "Input device used in video games" },
	{ name: "Streaming", tip: "Continuous transmission of data for playback" },
	{ name: "Podcast", tip: "Digital audio or video file available for streaming or download" },
	{ name: "Camera", tip: "Device for capturing still or moving images" },
	{ name: "Photography", tip: "Art or practice of taking and processing photographs" },
	{ name: "Film", tip: "Motion picture recorded on a strip of celluloid" },
	{ name: "Television", tip: "Telecommunication medium for transmitting moving images" },
	{ name: "Remote", tip: "Device for controlling a television or other electronic device" },
	{ name: "Headphones", tip: "Audio devices worn on the head" },
	{ name: "Speaker", tip: "Device that converts audio signals into sound" },
	{ name: "Microphone", tip: "Device for converting sound into an electrical signal" },
	{ name: "Music", tip: "Art form with sound and rhythm" },
	{ name: "Concert", tip: "Live music performance in front of an audience" },
	{ name: "Dance", tip: "Rhythmic movement to music" },
	{ name: "Theater", tip: "Form of performing arts" },
	{ name: "Art", tip: "Expression of creativity and imagination" },
	{ name: "Painting", tip: "Application of pigment to a surface" },
	{ name: "Sculpture", tip: "Art of creating three-dimensional forms" },
	{
		name: "Literature",
		tip: "Written works, especially those considered of superior or lasting artistic merit",
	},
	{
		name: "Poetry",
		tip: "Literary work in which special intensity is given to the expression of feelings",
	},
	{ name: "Examination", tip: "Formal test of a person's knowledge or proficiency" },
	{ name: "Degree", tip: "Academic title conferred by universities" },
	{ name: "Graduation", tip: "Receiving an academic degree or diploma" },
	{ name: "Career", tip: "Occupation or profession" },
	{ name: "Job", tip: "Paid position of regular employment" },
	{ name: "Resume", tip: "Document summarizing an individual's work experience" },
	{ name: "Interview", tip: "Formal meeting to assess qualifications for a job" },
	{ name: "Employee", tip: "Person employed for wages or salary" },
	{ name: "Employer", tip: "Person or organization that employs people" },
	{ name: "Entrepreneur", tip: "Person who starts and operates a business" },
	{
		name: "Business",
		tip: "Organization engaged in commercial, industrial, or professional activities",
	},
	{ name: "Investment", tip: "Allocating money to gain profitable returns" },
	{ name: "Finance", tip: "Management of money, banking, investments, and credit" },
	{
		name: "Economy",
		tip: "System of production, distribution, and consumption of goods and services",
	},
	{ name: "Market", tip: "Arrangement where buyers and sellers trade goods and services" },
	{ name: "Stock", tip: "Ownership in a corporation" },
	{ name: "Budget", tip: "Estimate of income and expenditure for a set period" },
	{ name: "Savings", tip: "Portion of income not spent on current consumption" },
	{ name: "Debt", tip: "Sum of money owed" },
	{ name: "Credit", tip: "Ability to obtain goods or services before payment" },
	{ name: "Interest", tip: "Charge for borrowing money" },
	{
		name: "Inflation",
		tip: "Rate at which the general level of prices for goods and services rises",
	},
	{ name: "Wealth", tip: "Abundance of valuable possessions or money" },
	{ name: "Poverty", tip: "State of being extremely poor" },
	{ name: "Charity", tip: "Help or aid given to those in need" },
	{ name: "Volunteer", tip: "Person who offers services willingly without pay" },
	{
		name: "Community",
		tip: "Group of people living in the same place or having a particular characteristic in common",
	},
	{
		name: "Family",
		tip: "Group consisting of parents and children living together in a household",
	},
	{ name: "Friendship", tip: "Mutual affection between people" },
	{ name: "Love", tip: "Deep affection or strong emotional attachment" },
	{ name: "Relationship", tip: "Connection or association between people" },
	{ name: "Marriage", tip: "Formal union between a man and a woman" },
	{ name: "Parenting", tip: "Raising and nurturing a child" },
	{ name: "Children", tip: "Young human beings below the age of puberty" },
	{ name: "Home", tip: "Place where one lives" },
	{ name: "House", tip: "Building used for human habitation" },
	{ name: "Apartment", tip: "Rented living space within a building" },
	{ name: "Furniture", tip: "Moveable objects used to support human activities" },
	{ name: "Decoration", tip: "Ornamentation added to make something more attractive" },
	{ name: "Architecture", tip: "Art and science of designing and constructing buildings" },
	{ name: "Urban", tip: "Related to cities and city living" },
	{ name: "Rural", tip: "Related to the countryside" },
	{ name: "Transportation", tip: "Movement of goods or people from one place to another" },
	{ name: "Car", tip: "Four-wheeled motor vehicle" },
	{ name: "Bicycle", tip: "Two-wheeled vehicle powered by pedaling" },
	{ name: "Train", tip: "Connected vehicles traveling on railways" },
	{
		name: "Airplane",
		tip: "Powered flying vehicle with fixed wings and a weight greater than that of the air it displaces",
	},
	{ name: "Ship", tip: "Large seagoing vessel" },
	{ name: "Bus", tip: "Motor vehicle designed to carry passengers" },
	{ name: "Subway", tip: "Underground electric railroad" },
	{ name: "Taxi", tip: "Motor vehicle licensed to transport passengers" },
	{ name: "Traffic", tip: "Vehicles moving on a road or public highway" },
	{ name: "Road", tip: "Wide way for vehicles and people to travel" },
	{ name: "Bridge", tip: "Structure built to span a physical obstacle" },
	{ name: "Tunnel", tip: "Underground passage" },
	{ name: "Airport", tip: "Place where aircraft take off and land" },
	{ name: "City", tip: "Large human settlement" },
	{ name: "Park", tip: "Public green area for recreation" },
	{ name: "Zoo", tip: "Facility where animals are kept and displayed to the public" },
	{
		name: "Museum",
		tip: "Institution that conserves and displays objects of artistic, cultural, or scientific significance",
	},
	{ name: "Mall", tip: "Large enclosed shopping area" },
	{ name: "Store", tip: "Retail establishment where goods are sold" },
	{ name: "Market", tip: "Arrangement where buyers and sellers trade goods and services" },
	{ name: "Bakery", tip: "Place where bread and cakes are made and sold" },
	{
		name: "Farmers Market",
		tip: "Market where farmers sell their products directly to consumers",
	},
	{ name: "Grocery Store", tip: "Store selling food and other household goods" },
	{
		name: "Supermarket",
		tip: "Large self-service store selling a variety of food and household products",
	},
	{ name: "Allergy", tip: "Hypersensitive reaction to a particular substance" },
	{ name: "Recovery", tip: "Return to a normal state of health, mind, or strength" },
	{ name: "Genetics", tip: "Study of genes and heredity" },
	{ name: "DNA", tip: "Molecule carrying genetic instructions" },
	{ name: "Cloning", tip: "Asexual reproduction producing genetically identical individuals" },
	{
		name: "Biotechnology",
		tip: "Exploitation of biological processes for industrial and other purposes",
	},
	{ name: "Environment", tip: "Surroundings in which an organism lives" },
	{ name: "Conservation", tip: "Preservation and protection of natural resources" },
	{ name: "Recycling", tip: "Converting waste into reusable material" },
	{ name: "Pollution", tip: "Contamination of the environment" },
	{ name: "Renewable Energy", tip: "Energy from a source that is not depleted when used" },
	{ name: "Climate Change", tip: "Long-term alteration of Earth's climate" },
	{ name: "Sustainability", tip: "Capacity to endure over the long term" },
	{ name: "Global Warming", tip: "Rising average temperature of Earth's atmosphere" },
	{
		name: "Ecosystem",
		tip: "Community of living organisms and their interactions with the environment",
	},
	{ name: "NASA", tip: "National Aeronautics and Space Administration" },
	{ name: "Mars", tip: "Fourth planet from the Sun in our solar system" },
	{ name: "Moon Landing", tip: "Arrival of a spacecraft on the surface of the Moon" },
	{ name: "Astronaut", tip: "Person trained for space travel" },
	{ name: "Space Station", tip: "Large spacecraft in orbit around the Earth" },
	{ name: "Extraterrestrial Life", tip: "Life that may exist and originate outside the Earth" },
	{ name: "Colonization", tip: "Establishment of settlements in a new territory" },
	{ name: "Artificial Intelligence", tip: "Simulation of human intelligence in machines" },
	{ name: "Robotics", tip: "Design, construction, operation, and use of robots" },
	{ name: "Automation", tip: "Use of largely automatic equipment in a system of operation" },
	{ name: "Cybersecurity", tip: "Protection of computer systems and networks" },
	{
		name: "Virtual Reality",
		tip: "Computer-generated simulation of a three-dimensional environment",
	},
	{ name: "Blockchain", tip: "Decentralized and distributed digital ledger" },
	{
		name: "Cryptocurrency",
		tip: "Digital or virtual currency that uses cryptography for security",
	},
	{ name: "Ethereum", tip: "Blockchain platform featuring smart contract functionality" },
	{
		name: "Machine Learning",
		tip: "Application of artificial intelligence that provides systems the ability to automatically learn and improve",
	},
	{
		name: "Deep Learning",
		tip: "Subset of machine learning based on artificial neural networks",
	},
	{ name: "NASA", tip: "National Aeronautics and Space Administration" },
	{ name: "Mars", tip: "Fourth planet from the Sun in our solar system" },
	{ name: "Moon Landing", tip: "Arrival of a spacecraft on the surface of the Moon" },
	{ name: "Astronaut", tip: "Person trained for space travel" },
	{ name: "Space Station", tip: "Large spacecraft in orbit around the Earth" },
	{ name: "Extraterrestrial Life", tip: "Life that may exist and originate outside the Earth" },
	{ name: "Colonization", tip: "Establishment of settlements in a new territory" },
	{ name: "Artificial Intelligence", tip: "Simulation of human intelligence in machines" },
	{ name: "Robotics", tip: "Design, construction, operation, and use of robots" },
	{ name: "Automation", tip: "Use of largely automatic equipment in a system of operation" },
	{ name: "Cybersecurity", tip: "Protection of computer systems and networks" },
	{
		name: "Virtual Reality",
		tip: "Computer-generated simulation of a three-dimensional environment",
	},
	{
		name: "Bitcoin",
		tip: "Decentralized digital currency without a central bank or single administrator",
	},
	{
		name: "Machine Learning",
		tip: "Application of artificial intelligence that provides systems the ability to automatically learn and improve",
	},
	{ name: "Classroom", tip: "Place where a class of students is taught" },
	{ name: "Homework", tip: "Tasks assigned to students to be completed outside class" },
	{ name: "Examination", tip: "Formal test of a person's knowledge or proficiency" },
	{ name: "Degree", tip: "Academic title conferred by universities" },
	{ name: "Graduation", tip: "Receiving an academic degree or diploma" },
	{ name: "Career", tip: "Occupation or profession" },
	{ name: "Job", tip: "Paid position of regular employment" },
	{ name: "Resume", tip: "Document summarizing an individual's work experience" },
	{ name: "Interview", tip: "Formal meeting to assess qualifications for a job" },
	{ name: "Employee", tip: "Person employed for wages or salary" },
	{ name: "Employer", tip: "Person or organization that employs people" },
	{ name: "Entrepreneur", tip: "Person who starts and operates a business" },
	{
		name: "Business",
		tip: "Organization engaged in commercial, industrial, or professional activities",
	},
	{ name: "Investment", tip: "Allocating money to gain profitable returns" },
	{ name: "Finance", tip: "Management of money, banking, investments, and credit" },
	{
		name: "Economy",
		tip: "System of production, distribution, and consumption of goods and services",
	},
	{ name: "Market", tip: "Arrangement where buyers and sellers trade goods and services" },
	{ name: "Stock", tip: "Ownership in a corporation" },
	{ name: "Budget", tip: "Estimate of income and expenditure for a set period" },
	{ name: "Savings", tip: "Portion of income not spent on current consumption" },
	{ name: "Debt", tip: "Sum of money owed" },
	{ name: "Credit", tip: "Ability to obtain goods or services before payment" },
	{ name: "Interest", tip: "Charge for borrowing money" },
	{
		name: "Inflation",
		tip: "Rate at which the general level of prices for goods and services rises",
	},
	{ name: "Tax", tip: "Compulsory financial charge imposed by the government" },
	{ name: "Wealth", tip: "Abundance of valuable possessions or money" },
	{ name: "Poverty", tip: "State of being extremely poor" },
	{ name: "Charity", tip: "Help or aid given to those in need" },
	{ name: "Volunteer", tip: "Person who offers services willingly without pay" },
	{
		name: "Community",
		tip: "Group of people living in the same place or having a particular characteristic in common",
	},
	{
		name: "Family",
		tip: "Group consisting of parents and children living together in a household",
	},
	{ name: "Friendship", tip: "Mutual affection between people" },
	{ name: "Love", tip: "Deep affection or strong emotional attachment" },
	{ name: "Relationship", tip: "Connection or association between people" },
	{ name: "Marriage", tip: "Formal union between a man and a woman" },
	{ name: "Parenting", tip: "Raising and nurturing a child" },
	{ name: "Children", tip: "Young human beings below the age of puberty" },
	{ name: "Home", tip: "Place where one lives" },
	{ name: "House", tip: "Building used for human habitation" },
	{ name: "Apartment", tip: "Rented living space within a building" },
	{ name: "Furniture", tip: "Moveable objects used to support human activities" },
	{ name: "Decoration", tip: "Ornamentation added to make something more attractive" },
	{ name: "Architecture", tip: "Art and science of designing and constructing buildings" },
	{ name: "Urban", tip: "Related to cities and city living" },
	{ name: "Rural", tip: "Related to the countryside" },
	{ name: "Transportation", tip: "Movement of goods or people from one place to another" },
	{ name: "Car", tip: "Four-wheeled motor vehicle" },
	{ name: "Bicycle", tip: "Two-wheeled vehicle powered by pedaling" },
	{ name: "Train", tip: "Connected vehicles traveling on railways" },
	{
		name: "Airplane",
		tip: "Powered flying vehicle with fixed wings and a weight greater than that of the air it displaces",
	},
	{ name: "Theater", tip: "Building or outdoor area for dramatic performances" },
	{ name: "Cinema", tip: "The production and showing of motion pictures" },
	{ name: "Concert", tip: "Live music performance in front of an audience" },
	{ name: "Gallery", tip: "Room or building for the display or sale of works of art" },
	{ name: "Restaurant", tip: "Place where meals are served to customers" },
	{ name: "Café", tip: "Small restaurant serving light refreshments" },
	{ name: "Bar", tip: "Establishment serving alcoholic beverages" },
	{ name: "Hotel", tip: "Lodging establishment providing accommodation and meals" },
	{ name: "Shopping", tip: "Purchasing goods from stores" },
	{ name: "Mall", tip: "Large enclosed shopping area" },
	{ name: "Store", tip: "Retail establishment where goods are sold" },
	{ name: "Market", tip: "Arrangement where buyers and sellers trade goods and services" },
	{ name: "Bakery", tip: "Place where bread and cakes are made and sold" },
	{
		name: "Farmers' Market",
		tip: "Market where farmers sell their products directly to consumers",
	},
	{ name: "Drones", tip: "Unmanned aerial vehicles" },
	{ name: "SpaceX", tip: "American aerospace manufacturer and space transportation company" },
	{ name: "Tesla", tip: "American electric vehicle and clean energy company" },
	{
		name: "Google",
		tip: "Multinational technology company specializing in internet-related services",
	},
	{
		name: "Apple",
		tip: "American technology company that designs and sells consumer electronics",
	},
	{ name: "Facebook", tip: "Social media and technology company" },
	{ name: "Amazon", tip: "Multinational technology and e-commerce company" },
	{ name: "Microsoft", tip: "American multinational technology company" },
	{ name: "Art", tip: "Expression of creativity and imagination" },
	{ name: "Painting", tip: "Application of pigment to a surface" },
	{ name: "Sculpture", tip: "Art of creating three-dimensional forms" },
	{
		name: "Literature",
		tip: "Written works, especially those considered of superior or lasting artistic merit",
	},
	{
		name: "Poetry",
		tip: "Literary work in which special intensity is given to the expression of feelings",
	},
	{ name: "Novel", tip: "Fictional narrative in book form" },
	{ name: "Author", tip: "Writer of a book, article, or report" },
	{ name: "Reader", tip: "Person who reads a book, article, or document" },
	{ name: "Library", tip: "Collection of books and other materials for reading" },
	{ name: "Bookstore", tip: "Retailer that sells books" },
	{ name: "Education", tip: "Process of acquiring knowledge and skills" },
	{ name: "Learning", tip: "Acquiring new knowledge or skills" },
	{ name: "Teacher", tip: "Person who instructs others" },
	{ name: "Student", tip: "Person engaged in learning" },
	{ name: "Grocery Store", tip: "Store selling food and other household goods" },
	{
		name: "Supermarket",
		tip: "Large self-service store selling a variety of food and household products",
	},
	{ name: "Fashion", tip: "Popular style of clothing, footwear, accessories, makeup, and body" },
	{ name: "Clothing", tip: "Items worn to cover and protect the human body" },
	{ name: "Ship", tip: "Large seagoing vessel" },
	{ name: "Bus", tip: "Motor vehicle designed to carry passengers" },
	{ name: "Subway", tip: "Underground electric railroad" },
	{ name: "Taxi", tip: "Motor vehicle licensed to transport passengers" },
	{ name: "Traffic", tip: "Vehicles moving on a road or public highway" },
	{ name: "Road", tip: "Wide way for vehicles and people to travel" },
	{ name: "Bridge", tip: "Structure built to span a physical obstacle" },
	{ name: "Tunnel", tip: "Underground passage" },
	{ name: "Airport", tip: "Place where aircraft take off and land" },
	{ name: "City", tip: "Large human settlement" },
	{ name: "Park", tip: "Public green area for recreation" },
	{
		name: "Museum",
		tip: "Institution that conserves and displays objects of artistic, cultural, or scientific significance",
	},
	{
		name: "Deep Learning",
		tip: "Subset of machine learning based on artificial neural networks",
	},
	{ name: "Algorithm", tip: "Step-by-step procedure for calculations" },
	{
		name: "Data Science",
		tip: "Field that uses scientific methods to extract insights and knowledge from data",
	},
	{ name: "Big Data", tip: "Extremely large data sets that may be analyzed computationally" },

	{ name: "Algorithm", tip: "Step-by-step procedure for calculations" },
	{
		name: "Data Science",
		tip: "Field that uses scientific methods to extract insights and knowledge from data",
	},
	{ name: "Biodiversity", tip: "Variety of life in a particular habitat" },
	{ name: "Extinction", tip: "Disappearance of a species from Earth" },
	{ name: "Wildlife", tip: "Animals living in a natural environment" },
	{
		name: "Nature Reserve",
		tip: "Protected area of importance for wildlife, flora, fauna, or features of geological or other special interest",
	},
	{ name: "Fashion", tip: "Popular style of clothing, footwear, accessories, makeup, and body" },
	{ name: "Clothing", tip: "Items worn to cover and protect the human body" },
	{ name: "Style", tip: "Distinctive manner of expression" },
	{ name: "Trend", tip: "General direction in which something is developing or changing" },
	{ name: "Beauty", tip: "Quality that gives pleasure to the senses" },
	{ name: "Health", tip: "State of being free from illness or injury" },
	{ name: "Exercise", tip: "Activity requiring physical effort" },
	{ name: "Diet", tip: "Regimen of eating and drinking" },
	{ name: "Sleep", tip: "Natural state of rest for the body and mind" },
	{ name: "Stress", tip: "Mental or emotional strain resulting from adverse situations" },
	{ name: "Meditation", tip: "Practice of training the mind to induce a mode of consciousness" },
	{ name: "Therapy", tip: "Treatment intended to relieve or heal a disorder" },
	{ name: "Doctor", tip: "Qualified practitioner of medicine" },
	{ name: "Hospital", tip: "Institution providing medical and surgical treatment" },
	{ name: "Nurse", tip: "Person trained to care for the sick or infirm" },
	{ name: "Medication", tip: "Substance used for medical treatment" },
	{ name: "Vaccination", tip: "Treatment with a vaccine to produce immunity against a disease" },
	{ name: "Disease", tip: "Abnormal condition affecting the body" },
	{ name: "Theater", tip: "Building or outdoor area for dramatic performances" },
	{ name: "Cinema", tip: "The production and showing of motion pictures" },
	{ name: "Concert", tip: "Live music performance in front of an audience" },
	{ name: "Gallery", tip: "Room or building for the display or sale of works of art" },
	{ name: "Restaurant", tip: "Place where meals are served to customers" },
	{ name: "Café", tip: "Small restaurant serving light refreshments" },
	{ name: "Bar", tip: "Establishment serving alcoholic beverages" },
	{ name: "Hotel", tip: "Lodging establishment providing accommodation and meals" },
	{ name: "Shopping", tip: "Purchasing goods from stores" },
	{ name: "Tax", tip: "Compulsory financial charge imposed by the government" },
	{ name: "Novel", tip: "Fictional narrative in book form" },
	{ name: "Author", tip: "Writer of a book, article, or report" },
	{ name: "Reader", tip: "Person who reads a book, article, or document" },
	{ name: "Library", tip: "Collection of books and other materials for reading" },
	{ name: "Bookstore", tip: "Retailer that sells books" },
	{ name: "Education", tip: "Process of acquiring knowledge and skills" },
	{ name: "Learning", tip: "Acquiring new knowledge or skills" },
	{ name: "Teacher", tip: "Person who instructs others" },
	{ name: "Student", tip: "Person engaged in learning" },
	{ name: "School", tip: "Institution for educating children" },
	{ name: "University", tip: "Institution of higher education and research" },
	{ name: "Classroom", tip: "Place where a class of students is taught" },
	{ name: "Homework", tip: "Tasks assigned to students to be completed outside class" },
	{ name: "Snow", tip: "Frozen crystalline water" },
	{ name: "Wind", tip: "Movement of air" },
	{ name: "Forest", tip: "Large area covered chiefly with trees" },
	{ name: "Desert", tip: "Dry, barren area with little or no vegetation" },
	{ name: "Rainforest", tip: "Lush, tropical forest with high rainfall" },
	{ name: "Island", tip: "Land area surrounded by water" },
	{ name: "Cave", tip: "Underground hollow space in the Earth" },
	{ name: "Sky", tip: "Atmosphere above the Earth" },
	{ name: "Earth", tip: "Third planet from the Sun" },
	{ name: "Planet", tip: "Large celestial body orbiting a star" },
	{ name: "Universe", tip: "All of space, time, matter, and energy" },
	{ name: "Inspiration", tip: "Stimulus to do something creative" },
	{ name: "Discovery", tip: "Finding or learning something new" },
	{ name: "Innovation", tip: "Introduction of something new" },
	{ name: "Imagination", tip: "Creative ability to form ideas" },
	{ name: "Curiosity", tip: "Desire to know or learn" },
	{ name: "Discovery", tip: "Finding or learning something new" },
	{ name: "Exploration", tip: "Traveling to unknown regions" },
	{ name: "Laughter", tip: "Audible expression of amusement" },
	{ name: "Happiness", tip: "State of being happy" },
	{ name: "Success", tip: "Achievement of goals" },
	{ name: "Courage", tip: "Bravery in the face of fear" },
	{ name: "Wisdom", tip: "Deep understanding and knowledge" },
	{ name: "Power", tip: "Ability to influence or control" },
	{ name: "Justice", tip: "Fair and impartial treatment" },
	{ name: "Fear", tip: "Emotion induced by perceived danger" },
	{ name: "Hope", tip: "Optimistic expectation" },
	{ name: "Road", tip: "Path for vehicles or pedestrians" },
	{ name: "Lighthouse", tip: "Tall tower with a light to guide ships at sea" },
	{ name: "Compass", tip: "Navigational instrument pointing to magnetic north" },
	{ name: "Vortex", tip: "Whirling mass of fluid or air" },
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
	{ name: "Revelation", tip: "Given by God to see" },
	{ name: "Genesis", tip: "First book of the Bible" },
	{ name: "Matthew", tip: "First book of the New Testament" },
	{ name: "Worm", tip: "Spineless insect that you can cut in half" },
	{ name: "Freedom", tip: "A state of being able to do whatever you want" },
	{ name: "Judas", tip: "Betrayed Jesus" },
	{ name: "Prophet", tip: "Speaks for God" },
	{ name: "Boring", tip: "Not that funny" },
	{ name: "Brain", tip: "You think with" },
	{ name: "Heart", tip: "Beats until you die" },
	{ name: "Rock", tip: "Both a music genre and an element" },
	{ name: "Vulture", tip: "Death eating bird" },
	{ name: "Wolf", tip: "Predator who eats sheeps" },
	{ name: "Shepherd", tip: "Gathers sheeps" },
	{ name: "Serpent", tip: "Spineless, crawling on its belly" },
	{ name: "Church", tip: "Jesus comes for his..." },
	{ name: "Bride", tip: "Jesus comes for a..." },
	{ name: "Sins", tip: "Jesus forgives your..." },
	{ name: "Children", tip: "God given power to create" },
	{ name: "Mechanic", tip: "Fixes cars" },
	{ name: "Virus", tip: "Can be both in your body and in computers" },
	{ name: "Phone", tip: "Tool to contact friends" },
	{ name: "Kindness", tip: "We use to be friendly" },
	{ name: "Television", tip: "Programs people easily" },
	{ name: "Commercial", tip: "To convay a product on a space" },
	{ name: "Eagle", tip: "The king of the birds" },
	{ name: "Lion", tip: "The king of the animals" },
	{ name: "Sheeps", tip: "Jesus saves his..." },
	{ name: "Lamb", tip: "White, fluffy and innocent" },
	{ name: "Dove", tip: "Represent the holy spirit" },
	{ name: "Holy", tip: "God's mountain is..." },
	{ name: "Shoes", tip: "Man has on his feets" },
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
	{ name: "Angelfish", tip: "Colorful marine fish with a distinctive shape" },
	{ name: "Waterfall", tip: "Water falling down from one land level to another" },
	{ name: "Love", tip: "Casts out all fear" },
	{ name: "Cat", tip: "Most famous house animal" },
	{ name: "Flood", tip: "Once covered the whole earth" },
	{ name: "Fire", tip: "Burns you" },
	{ name: "Burns", tip: "When you touch fire it..." },
	{ name: "Noah", tip: "Righteous man in God's eyes" },
	{ name: "Ark", tip: "Noah built a..." },
	{ name: "Game", tip: "Interactive entertainment" },
	{ name: "Emergency", tip: "Urgent crisis" },
	{ name: "Knight", tip: "Medieval warrior" },
	{ name: "Soldier", tip: "Military personnel" },
	{ name: "Hero", tip: "Courageous figure" },
	{ name: "War", tip: "Armed conflict" },
	{ name: "Death", tip: "End of life" },
	{ name: "Greed", tip: "Selfish desire" },
	{ name: "Money", tip: "Currency" },
	{ name: "Restricted", tip: "Limited access" },
	{ name: "Outdoors", tip: "Open air" },
	{ name: "Trust", tip: "Reliable belief" },
	{ name: "Truth", tip: "Factual accuracy" },
	{ name: "Storm", tip: "Violent weather" },
	{ name: "String", tip: "Thin cord or thread" },
	{ name: "Beard", tip: "Facial hair" },
	{ name: "Cinema", tip: "Movie theater" },
	{ name: "Movie", tip: "Motion picture" },
	{ name: "Faith", tip: "Belief and trust" },
	{ name: "Blind", tip: "Unable to see" },
	{ name: "Deaf", tip: "Unable to hear" },
	{ name: "Numb", tip: "Lack of sensation" },
	{ name: "Round", tip: "Circular shape" },
	{ name: "Circle", tip: "Closed curve" },
	{ name: "Record", tip: "Audio storage" },
	{ name: "Skeleton", tip: "Framework of bones" },
	{ name: "Serenity", tip: "Peaceful, calm" },
	{ name: "Cymatics", tip: "Study of wave phenomena" },
	{ name: "Father", tip: "Male parent" },
	{ name: "Mother", tip: "Female parent" },
	{ name: "Brother", tip: "Male sibling" },
	{ name: "Tool", tip: "Instrument or device" },
];

var randomName = "";
var randomTip = "";
const header = document.getElementsByTagName("h1")[0];
var insertLetters = document.querySelector(".letters");
const multiplierHTML = document.querySelector(".multiplier");

function getRandomWord() {
	questions++;
	let randomIndex = Math.floor(Math.random() * hangwordsList.length);
	let randomWord = hangwordsList[randomIndex];

	randomName = randomWord.name.toUpperCase();
	randomTip = randomWord.tip;

	// console.log("Random Word: " + randomName);
	// console.log("Tip: " + randomTip);

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
	if (gameover) {
		return;
	}
	clearInterval(countdownInterval);
	multiplier = 1;
	multiplierHTML.innerHTML = "";
	console.log("Wrong!");
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

	/* console.log("isBodyVisible:", isBodyVisible); */

	if (allActive) {
		gameover = true;
		multiplier += 1;
		if (highestMultiplier < multiplier) {
			highestMultiplier = multiplier;
		}
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
			gameover = false;
			resetGame();
		}, 400);

		// Add your win logic here
	} else if (isBodyVisible) {
		gameOver();
	} else {
		/* console.log("Not all letters are active yet."); */
	}
}

function updateRatio() {
	let newRatio = wins / loss;
	ratioHTML.innerHTML = newRatio.toFixed(2);
	ratio = newRatio;
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
				/* console.log("New letter:", letter); */
				const newLetter = `<span>${letter}</span>`;
				letters.insertAdjacentHTML("beforeend", newLetter);
				writtenLetters.push(letter);
				if (randomName.includes(letter)) {
					addSound("correct");
					/* console.log("Letter is included..."); */
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
			/* console.log("Letter already written:", letter); */
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
	gameover = false;
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
		if (countdownValue <= 0) {
			// Stop the countdown
			clearInterval(countdownInterval);
			if (!gameover) {
				gameOver();
			}
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

let timerValue = 180;
let timerInterval;

function updateTimer() {
	const timerElement = document.getElementById("timer");
	const minutes = Math.floor(timerValue / 60);
	const seconds = timerValue % 60;

	// Format minutes and seconds with leading zeros if needed
	const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	timerElement.textContent = formattedTime;
}

function startTimer() {
	updateTimer();

	timerInterval = setInterval(() => {
		timerValue--;
		updateTimer();

		if (timerValue <= 0) {
			// Stop the countdown
			clearInterval(timerInterval);
			if (!finished) {
				finishGame();
			}
		}
	}, 1000);
}

function resetTimer() {
	// Clear the existing interval
	clearInterval(timerInterval);

	// Reset the countdown value
	timerValue = 180;

	// Start a new countdown
	startTimer();
}

startTimer();

function finishGame() {
	clearInterval(timerInterval);
	clearInterval(countdownInterval);
	// Add your finishGame logic here
	finished = true;
	alert("Game Finished!");

	let currentHighscore = {
		points: points,
		wins: wins,
		loss: loss,
		ratio: ratio,
		questions: questions,
		highestmultiplier: highestMultiplier,
	};
	console.log(currentHighscore);
	highscore.push(currentHighscore);

	localStorage.setItem("HIGHSCORE", JSON.stringify(highscore));
	updateTotalScore();
	startGame();
}

function startGame() {
	finished = false;
	gameover = false;
	questions = 0;
	highestMultiplier = 0;

	resetTimer();
	resetCountdown();
	startTimer();
	resetGame();
}
