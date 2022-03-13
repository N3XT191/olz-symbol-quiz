import { useEffect, useState } from "react";
import data from "./data/data.json";

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

const getRandom4Numbers = () => {
	const categorie = Math.floor(Math.random() * numbers.length);
	const shuffled = [...numbers[categorie]].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, 4);
};

function App() {
	const [chosenNumbers, setChosenNumbers] = useState(getRandom4Numbers());
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
		setChosenNumbers(getRandom4Numbers());
		setWrongGuesses([false, false, false, false]);
		setCorrectGuessCount(correctGuessCount + 1);
	};

	const [mode, setMode] = useState<"pic" | "desc">("pic");

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
			<h1>OLZ Symbol Quiz</h1>
			<div>
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
					<img
						alt="test"
						src={"/drawable/symbol_" + chosenNumbers[0] + "_.xml.svg"}
						width={200}
						height={200}
					/>
					<div style={{ width: 364, display: "flex", flexWrap: "wrap" }}>
						{shuffledNumbers.map((n, i) => (
							<div
								style={{
									width: 160,
									height: 80,
									border: "1px solid black",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: wrongGuesses[i] ? "red" : "white",
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
								{data.find((o) => o.id === n)?.german_name}
							</div>
						))}
					</div>
				</>
			) : (
				<>
					<div
						style={{
							width: 170,
							height: 85,
							border: "1px solid black",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
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
							>
								<img
									alt="test"
									src={"/drawable/symbol_" + n + "_.xml.svg"}
									width={75}
									height={75}
									onClick={() => {
										if (n === chosenNumbers[0]) {
											onCorrectGuess();
										} else if (!wrongGuesses[i]) {
											onWrongGuess(i);
										}
									}}
								/>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default App;
