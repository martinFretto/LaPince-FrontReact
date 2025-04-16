import { Link, NavLink, useLocation } from "react-router-dom";
import DonutDetail from "../components/DonughtDetails/index";
import LastExpenses from "../components/LastExpenses";
import DetailsExpenses from "../components/DetailsExpenses";

export default function BudgetDetails() {
	const location = useLocation();
	const { budget }: { budget?: BudgetType } = location.state || {};

	if (!budget) {
		return <div>Budget non trouvé</div>;
	}
	interface BudgetType {
		id: number;
		name: string;
		icon: string;
		amount: number;
		spent: number;
		warning_amount: number;
		spent_amount: number;
		allocated_amount: number;
		color: string;
		user_id: number;
		created_at: string;
		updated_at: string;
	}

	return (
		<div>
			<div className="flex justify-between mx-4 mt-4">
				<NavLink to={"/budgets"}>
					<div className="flex items-center">
						<img
							src="/logo-arrow-left.svg"
							alt="fleche gauche"
							className="w-5"
						/>
						<p className="font-semibold mb-1 pl-1 text-md">retour</p>
					</div>
				</NavLink>
				<div className="flex flex-col items-center">
					<img src="/logo-plus.svg" alt="logo plus" className="w-8" />
					<p className="text-[10px]">Ajouter</p>
					<p className="text-[10px]">dépenses</p>
				</div>
			</div>
			<div className="container mx-auto px-4 py-6">
				<div className="relative p-4 flex flex-col items-center w-full max-w-sm mx-auto min-h-60">
					<img
						src={budget.icon}
						alt="icone du budget"
						className="w-10 absolute mt-20 "
					/>
					<DonutDetail budget={budget} />
					<div className="absolute bottom-4 right-4">
						<Link to="/dashboard">
							<img
								src="/logo-settings.svg"
								alt="logo-reglage"
								className="w-8 h-8"
							/>
						</Link>
					</div>
				</div>
				<div className="flex justify-center font-semibold text-2xl mt-4">
					<h2>Mes dépenses {budget.name}</h2>
				</div>
			</div>

			<div>
				<DetailsExpenses budget={budget.id} />
			</div>
		</div>
	);
}
