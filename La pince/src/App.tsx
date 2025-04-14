import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/Footer/PrivacyPolicy";
import SecurityData from "./pages/Footer/SecurityData";

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
					<Route
						path={"/privacy-policy"}
						element={<PrivacyPolicy />}
					/>
					<Route path={"/security-data"} element={<SecurityData />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
