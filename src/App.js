import Header from "./components/header/Header";
import Container from "./components/container/Container";
import { BrowserRouter } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Container />
		</BrowserRouter>
	);
}

export default App;
