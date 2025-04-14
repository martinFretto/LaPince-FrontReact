import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path={"/dashboard"} element={<Dashboard />} />
					<Route path={"/"} element={<LandingPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
