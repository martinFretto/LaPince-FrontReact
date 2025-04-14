import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path={"/"} element={<LandingPage />} />
					<Route path={"/register"} element={<RegisterPage />} />
					<Route path={"/login"} element={<Login />} />
					<Route path={"/dashboard"} element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
