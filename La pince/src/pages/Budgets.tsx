import "../App.css";
import DonutDetail from "../components/DonughtDetails/index";
import { budgets } from "../data/budget";

export default function Budgets() {
	return (
		<div>
			{/* En-tête général */}
			<div className="flex justify-around align-middle my-6">
				<div className="justify-items-center">
					<p className="font-semibold text-xl">7777,77 €</p>
					<p className="font-semibold text-xl">restant</p>
				</div>
				<div className="flex flex-col">
					<div className="justify-items-center">
						<p className="font-semibold text-xl">90 %</p>
						<p className="text-[12px] -mt-1 mb-3">disponible</p>
					</div>
					<progress
						className="progress w-25 h-4 border-1 border-black custom-progress shadow-md shadow-gray-600"
						value="70"
						max="100"
					/>
				</div>
			</div>

			{/* Vignettes des budgets */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
				{budgets.map((budget) => (
					<div
						key={budget.id}
						className="border rounded-xl p-4 shadow-md bg-white"
					>
						<DonutDetail budget={budget} />
					</div>
				))}
			</div>
		</div>
	);
}
