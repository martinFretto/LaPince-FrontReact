import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BudgetDetails from "./pages/BudgetDetails";
import Budgets from "./pages/Budgets";
import Dashboard from "./pages/Dashboard";
import LegalNotices from "./pages/Footer/LegaleNotices";
import PrivacyPolicy from "./pages/Footer/PrivacyPolicy";
import SecurityData from "./pages/Footer/SecurityData";
import UserStories from "./pages/Footer/UserStories";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";

function App() {
	function PrivateRoute() {
		const token = sessionStorage.getItem("authToken");
		return token ? <Outlet /> : <Navigate to="/auth/login" />;
	}

	return (
		<>
			<BrowserRouter>
				<Header />
				<div className="md:mx-30 lg:mx-50 xl:mx-80 2xl:mx-110">
					<Routes>
						<Route path={"/"} element={<LandingPage />} />
						<Route path={"/auth/register"} element={<RegisterPage />} />
						<Route path={"/auth/login"} element={<Login />} />

						<Route element={<PrivateRoute />}>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/budgets" element={<Budgets />} />
							<Route path="/budgets/:id" element={<BudgetDetails />} />
						</Route>

						<Route path={"/privacy-policy"} element={<PrivacyPolicy />} />
						<Route path={"/security-data"} element={<SecurityData />} />
						<Route path={"/legal-notices"} element={<LegalNotices />} />
						<Route path={"/user-guide"} element={<UserStories />} />

						<Route path={"*"} element={<NotFound />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
