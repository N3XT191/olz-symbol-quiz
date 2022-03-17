import { Link } from "react-router-dom";
import Button from "./Button";
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

const makeSVG = (n: number, size: number) => (
	<img
		alt="test"
		src={"/drawable/symbol_" + n + "_.xml.svg"}
		width={size}
		height={size}
	/>
);

const ShowAll = () => {
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
			<Link to="/">
				<Button>Zurück</Button>
			</Link>

			{numbers.flat().map((n) => (
				<div
					key={n}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: 5,
					}}
				>
					{makeSVG(n, 75)}
					<div
						style={{
							width: 170,
							height: 65,
							border: "1px solid black",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginLeft: 5,
							padding: 5,
						}}
					>
						{data.find((o) => o.id === n)?.german_name}
					</div>
				</div>
			))}
			<Link to="/">
				<Button>Zurück</Button>
			</Link>
		</div>
	);
};

export default ShowAll;
