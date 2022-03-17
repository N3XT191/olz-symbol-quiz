import Header from "./Header";
import Quiz from "./Quiz";
import ShowAll from "./ShowAll";
import { useRoutes } from "react-router-dom";
import Home from "./Home";

function App() {
	let routes = useRoutes([
		{
			path: "/",
			element: undefined,
			children: [
				{ index: true, element: <Home /> },
				{ path: "all", element: <ShowAll /> },
				{ path: "quiz/:category", element: <Quiz /> },
			],
		},
	]);

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
			<Header />
			{routes}
		</div>
	);
}

export default App;
