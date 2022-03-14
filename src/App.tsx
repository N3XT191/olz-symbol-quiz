import Quiz from "./Quiz";
import ShowAll from "./ShowAll";

const buttonTexts = [
	"Alle",
	"Geländeformen",
	"Felsen und Steine",
	"Gewässer und Sümpfe",
	"Vegetation",
	"Künstliche Objekte",
	"Bahnsymbole",
];

function App() {
	let search = window.location.search;
	let params = new URLSearchParams(search);
	let category;
	if (params.get("category") !== null) {
		category = parseInt(params.get("category")!);
	} else {
		category = null;
	}

	const showAll = params.get("showAll") === "true";

	console.log(category);

	const setCategory = (i: number) => {
		if (i < 0) i = 99;
		params.set("category", "" + i);
		window.location.search = params.toString();
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				margin: "auto",
				alignItems: "center",
				paddingLeft: 5,
				paddingRight: 5,
				maxWidth: 332,
			}}
		>
			<div
				style={{
					backgroundColor: "#00c800",
					width: "100%",
					height: 70,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontSize: 35,
					fontWeight: 500,
					marginBottom: 10,
					color: "#fff404",
				}}
			>
				OLZ Symbol Quiz
			</div>
			{(!showAll && category === 99) ||
			(!showAll && category !== null && category < 7 && category >= 0) ? (
				<Quiz category={category} />
			) : !showAll ? (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{buttonTexts.map((s, i) => (
						<button
							style={{ fontSize: 15, marginBottom: 10 }}
							onClick={() => setCategory(i - 1)}
						>
							{s}
						</button>
					))}
					<div>oder</div>
					<button
						style={{ fontSize: 15, marginTop: 10 }}
						onClick={() => {
							let search = window.location.search;
							let params = new URLSearchParams(search);

							params.set("showAll", "true");
							window.location.search = params.toString();
						}}
					>
						Alle Symbole auflisten
					</button>
				</div>
			) : (
				<ShowAll />
			)}
		</div>
	);
}

export default App;
