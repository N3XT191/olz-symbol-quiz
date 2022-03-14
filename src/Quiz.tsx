import { useEffect, useState } from "react";
import data from "./data/data.json";

function shuffle(array: any[]) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

const numbers = [[], [], [], [], [], []] as any[][];
data.forEach((o) => {
	let categorie = Math.floor(o.id / 100) - 1;
	if (categorie === 5) {
		return;
	}
	if (categorie === 6) {
		categorie = 5;
	}
	numbers[categorie].push(o.id);
});

console.log(numbers);

const getRandom4Numbers = (category: number) => {
	if (category === 99) category = Math.floor(Math.random() * numbers.length);
	const shuffled = shuffle([...numbers[category]]);
	return shuffled.slice(0, 4);
};

const makeSVG = (n: number, size: number) => (
	<img
		alt="test"
		src={"/drawable/symbol_" + n + "_.xml.svg"}
		width={size}
		height={size}
	/>
);

const Quiz = ({ category }: { category: number }) => {
	const [chosenNumbers, setChosenNumbers] = useState(
		getRandom4Numbers(category)
	);
	const [correctGuessCount, setCorrectGuessCount] = useState(0);
	const [wrongGuessCount, setWrongGuessCount] = useState(0);
	const [shuffledNumbers, setShuffledNumbers] = useState(
		[...chosenNumbers].sort((a, b) => 0.5 - Math.random())
	);

	useEffect(
		() =>
			setShuffledNumbers(
				[...chosenNumbers].sort((a, b) => 0.5 - Math.random())
			),
		[chosenNumbers]
	);

	const [wrongGuesses, setWrongGuesses] = useState([
		false,
		false,
		false,
		false,
	]);

	const onWrongGuess = (index: number) => {
		let newWrongGuesses = [...wrongGuesses];
		newWrongGuesses[index] = true;
		setWrongGuesses(newWrongGuesses);
		setWrongGuessCount(wrongGuessCount + 1);
	};
	const onCorrectGuess = () => {
		setChosenNumbers(getRandom4Numbers(category));
		setWrongGuesses([false, false, false, false]);
		setCorrectGuessCount(correctGuessCount + 1);
	};

	const [mode, setMode] = useState<"pic" | "desc">("desc");

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				alignItems: "center",
				paddingLeft: 5,
				paddingRight: 5,
			}}
		>
			<div>
				<button
					style={{ fontSize: 15, marginRight: 10 }}
					onClick={() => {
						window.location.search = "";
					}}
				>
					Kategorie wählen
				</button>
				<button
					style={{ fontSize: 15, marginRight: 10 }}
					onClick={() => {
						setMode("pic");
						onCorrectGuess();
					}}
					disabled={mode === "pic"}
				>
					Symbol
				</button>
				<button
					style={{ fontSize: 15 }}
					onClick={() => {
						setMode("desc");
						onCorrectGuess();
					}}
					disabled={mode === "desc"}
				>
					Name
				</button>
			</div>
			<div style={{ margin: 5 }}>
				Richtige Antworten: {correctGuessCount}, Falsche Antwortern:{" "}
				{wrongGuessCount}
			</div>
			{mode === "pic" ? (
				<>
					{makeSVG(chosenNumbers[0], 120)}
					<div style={{ maxWidth: 332, display: "flex", flexWrap: "wrap" }}>
						{shuffledNumbers.map((n, i) => (
							<div
								style={{
									width: 140,
									height: 80,
									border: "1px solid black",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: wrongGuesses[i] ? "red" : "white",
									margin: 5,
									padding: 5,

									flexWrap: "wrap",
								}}
								onClick={() => {
									if (n === chosenNumbers[0]) {
										onCorrectGuess();
									} else if (!wrongGuesses[i]) {
										onWrongGuess(i);
									}
								}}
							>
								{data.find((o) => o.id === n)?.german_name}
							</div>
						))}
					</div>
				</>
			) : (
				<>
					<div
						style={{
							width: 156,
							height: 75,
							border: "1px solid black",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							padding: 5,
							flexWrap: "wrap",
						}}
					>
						{data.find((o) => o.id === chosenNumbers[0])?.german_name}
					</div>
					<div style={{ width: 200, display: "flex", flexWrap: "wrap" }}>
						{shuffledNumbers.map((n, i) => (
							<div
								style={{
									backgroundColor: wrongGuesses[i] ? "red" : "white",
									border: "2px solid " + (wrongGuesses[i] ? "red" : "black"),
									height: 75,
									width: 75,
									margin: 5,
									padding: 5,
								}}
								onClick={() => {
									if (n === chosenNumbers[0]) {
										onCorrectGuess();
									} else if (!wrongGuesses[i]) {
										onWrongGuess(i);
									}
								}}
							>
								{makeSVG(n, 75)}
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Quiz;
