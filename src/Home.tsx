import { Link } from "react-router-dom";
import Button from "./Button";

const buttonTexts = [
	{ text: "Alle", icon: 0 },
	{ text: "Geländeformen", icon: 104 },
	{ text: "Felsen und Steine", icon: 206 },
	{ text: "Gewässer und Sümpfe", icon: 310 },
	{ text: "Vegetation", icon: 414 },
	{ text: "Künstliche Objekte", icon: 519 },
	{ text: "Bahnsymbole", icon: 706 },
];

const makeButton = (s: { icon: number; text: string }, i: number) => (
	<div style={{ display: "flex" }}>
		<img
			alt="test"
			src={s.icon ? "/drawable/symbol_" + s.icon + "_.xml.svg" : "/flag.png"}
			width={40}
			height={40}
		/>
		<Link to={"/quiz/" + i}>
			<Button style={{ height: 40, lineHeight: "20px" }}>{s.text}</Button>
		</Link>
	</div>
);
function Home() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			{buttonTexts.map((s, i) => makeButton(s, i - 1 < 0 ? 99 : i - 1))}
			<div style={{ margin: "auto", marginBottom: 10, fontSize: 20 }}>oder</div>

			<Link to="all">
				<Button>Alle Symbole auflisten</Button>
			</Link>
		</div>
	);
}

export default Home;
