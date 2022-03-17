import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "./Button";
import data from "./data/data.json";

function shuffle(array: any[], weights: number[]) {
	let newArray = array.map((o, i) => ({
		value: o,
		rank: Math.random() / weights[i],
	}));
	let sorted = newArray.sort((a, b) => b.rank - a.rank).map((o) => o.value);
	console.log(weights.sort((a, b) => b - a));
	return sorted;
}

const numbers = [[], [], [], [], [], []] as number[][];
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

interface IDictionary<TValue> {
	[id: string]: TValue;
}

const history = {} as IDictionary<number>;
numbers.forEach((category) =>
	category.forEach((number) => {
		history[number] = 1;
	})
);

const getRandom4Numbers = (category: number) => {
	if (category === 99) category = Math.floor(Math.random() * numbers.length);
	const weights = numbers[category].map((n) => history[n]);
	const shuffled = shuffle([...numbers[category]], weights);
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

const Quiz = () => {
	let { category } = useParams<"category">();
	let categoryNumber = parseInt(category!);
	console.log(categoryNumber);
	const [chosenNumbers, setChosenNumbers] = useState(
		getRandom4Numbers(categoryNumber)
	);
	const [correctGuessCount, setCorrectGuessCount] = useState(0);
	const [wrongGuessCount, setWrongGuessCount] = useState(0);
	const [shuffledNumbers, setShuffledNumbers] = useState(
		[...chosenNumbers].sort((a, b) => 0.5 - Math.random())
	);

	useEffect(() => {
		setShuffledNumbers([...chosenNumbers].sort((a, b) => 0.5 - Math.random()));
		history[chosenNumbers[0]] += 1;
	}, [chosenNumbers]);

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
		setChosenNumbers(getRandom4Numbers(categoryNumber));
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
				<Link to="/">
					<Button>Kategorie wählen</Button>
				</Link>
				<Button
					onClick={() => {
						setMode("pic");
						onCorrectGuess();
					}}
					disabled={mode === "pic"}
				>
					Symbol
				</Button>
				<Button
					onClick={() => {
						setMode("desc");
						onCorrectGuess();
					}}
					disabled={mode === "desc"}
				>
					Name
				</Button>
			</div>
			<div
				style={{
					display: "flex",
					marginBottom: 10,
				}}
			>
				<div
					style={{
						margin: 5,
						border: "3px solid #2e963d",
						borderRadius: 6,
						padding: 5,
					}}
				>
					Korrekt: {correctGuessCount}
				</div>
				<div
					style={{
						margin: 5,
						border: "3px solid red",
						borderRadius: 6,
						padding: 5,
					}}
				>
					Falsch: {wrongGuessCount}
				</div>
			</div>
			{mode === "pic" ? (
				<>
					{makeSVG(chosenNumbers[0], 120)}
					<div
						style={{
							maxWidth: 332,
							display: "flex",
							flexWrap: "wrap",
							marginTop: 10,
						}}
					>
						{shuffledNumbers.map((n, i) => (
							<div
								style={{
									width: 140,
									height: 80,
									border: "1px solid black",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: wrongGuesses[i]
										? "red"
										: "rgb(256,256,256,0.4)",
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
							backgroundColor: "rgb(256,256,256,0.6)",
							marginBottom: 10,
						}}
					>
						{data.find((o) => o.id === chosenNumbers[0])?.german_name}
					</div>
					<div style={{ width: 240, display: "flex", flexWrap: "wrap" }}>
						{shuffledNumbers.map((n, i) => (
							<div
								style={{
									backgroundColor: wrongGuesses[i]
										? "red"
										: "rgb(256,256,256,0.4)",
									border: "2px solid " + (wrongGuesses[i] ? "red" : "black"),
									height: 80,
									width: 80,
									margin: 10,
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
								{makeSVG(n, 80)}
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Quiz;
