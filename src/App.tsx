import Button from "./Button";
import Quiz from "./Quiz";
import ShowAll from "./ShowAll";

const buttonTexts = [
	{ text: "Alle", icon: 0 },
	{ text: "Geländeformen", icon: 104 },
	{ text: "Felsen und Steine", icon: 206 },
	{ text: "Gewässer und Sümpfe", icon: 310 },
	{ text: "Vegetation", icon: 414 },
	{ text: "Künstliche Objekte", icon: 519 },
	{ text: "Bahnsymbole", icon: 706 },
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
				maxWidth: 500,
			}}
		>
			<div
				style={{
					backgroundColor: "#2e963d",
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
					}}
				>
					{buttonTexts.map((s, i) => (
						<div style={{ display: "flex" }}>
							<img
								alt="test"
								src={
									s.icon
										? "/drawable/symbol_" + s.icon + "_.xml.svg"
										: "/flag.png"
								}
								width={40}
								height={40}
							/>
							<Button
								onClick={() => setCategory(i - 1)}
								style={{ height: 40, lineHeight: "20px" }}
							>
								{s.text}
							</Button>
						</div>
					))}
					<div style={{ margin: "auto", marginBottom: 10, fontSize: 20 }}>
						oder
					</div>

					<Button
						onClick={() => {
							let search = window.location.search;
							let params = new URLSearchParams(search);

							params.set("showAll", "true");
							window.location.search = params.toString();
						}}
					>
						Alle Symbole auflisten
					</Button>
				</div>
			) : (
				<ShowAll />
			)}
		</div>
	);
}

export default App;
