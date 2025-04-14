import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Routes />
					<h1 className="text-red-600">Hello World</h1>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
