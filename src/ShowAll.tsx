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
			<button
				style={{ fontSize: 15, marginRight: 10 }}
				onClick={() => {
					window.location.search = "";
				}}
			>
				Zurück
			</button>
			{numbers.flat().map((n) => (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: 5,
					}}
				>
					{makeSVG(n, 100)}
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
						{data.find((o) => o.id === n)?.german_name}
					</div>
				</div>
			))}
			<button
				style={{ fontSize: 15, marginRight: 10 }}
				onClick={() => {
					window.location.search = "";
				}}
			>
				Zurück
			</button>
		</div>
	);
};

export default ShowAll;
