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
import LegalNotices from "./pages/Footer/LegaleNotices";
import UserStories from "./pages/Footer/UserStories";
import NotFound from "./pages/NotFound";
import Budgets from "./pages/Budgets";
import BudgetDetails from "./pages/BudgetDetails";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path={"/"} element={<LandingPage />} />
					<Route path={"/auth/register"} element={<RegisterPage />} />
					<Route path={"/auth/login"} element={<Login />} />
					<Route path={"/dashboard"} element={<Dashboard />} />
					<Route path={"/budgets"} element={<Budgets />} />
					<Route path={"/budgets/:id"} element={<BudgetDetails />} />
					<Route path={"/privacy-policy"} element={<PrivacyPolicy />} />
					<Route path={"/security-data"} element={<SecurityData />} />
					<Route path={"/legal-notices"} element={<LegalNotices />} />
					<Route path={"/user-guide"} element={<UserStories />} />
					<Route path={"*"} element={<NotFound />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
