import {
	BrowserRouter,
	Route,
	Navigate,
	Outlet,
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
import Login from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import { useAuthStore } from "./store/authStore";
import ResetPasswordRequestFormPage from "./pages/ResetPasswordRequestFormPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
	const { isAuthenticated } = useAuthStore();

	function PrivateRoute() {
		return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
	}

	return (
		<>
			<BrowserRouter>
				<div className="flex flex-col min-h-screen">
					<Header />
					<main className="flex-grow md:mx-30 lg:mx-50 xl:mx-80 2xl:mx-110">
						<Routes>
							<Route path={"/"} element={<LandingPage />} />
							<Route path={"/auth/register"} element={<RegisterPage />} />
							<Route path={"/auth/login"} element={<Login />} />
							<Route path={"/auth/resetPassword"} element={<ResetPasswordRequestFormPage/>}/>	
							<Route element={<PrivateRoute />}>
								<Route path={"/dashboard"} element={<Dashboard />} />
								<Route path={"/profile"} element={<ProfilePage />} />
								<Route path={"/budgets"} element={<Budgets />} />
								<Route path={"/budgets/:budgetId"} element={<BudgetDetails />} />
            				</Route>																						
							<Route path={"/auth/newPassword"} element={<NewPasswordPage/>}/>																					
							<Route path={"/privacy-policy"} element={<PrivacyPolicy />} />
							<Route path={"/security-data"} element={<SecurityData />} />
							<Route path={"/legal-notices"} element={<LegalNotices />} />
							<Route path={"/user-guide"} element={<UserStories />} />
							<Route path={"*"} element={<NotFound />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
