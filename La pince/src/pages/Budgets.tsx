import "../App.css";

export default function Budgets() {
	return (
		<div>
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
						className="progress w-25 h-4 border-1 border-black shadow-2xl custom-progress"
						value="70"
						max="100"
					/>
				</div>
			</div>
		</div>
	);
}
