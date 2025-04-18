export default function AlertThresholdModal() {
	return (
		<>
			<div className="absolute z-10 border-2 border-[#f08c00] bg-[#ffd8a8] flex flex-col items-center font-semibold mx-6">
				<h1 className="py-6 text-2xl">Attention</h1>
				<p className="mb-4 px-6">
					Le seuil de votre budget **nom du budget** est dépassé.
				</p>
				<p className="mb-8 px-6">
					Il vous reste **montant restant** € pour ce budget
				</p>
				<button
					type="button"
					className="btn mb-4 border-2 border-[#f08c00] bg-[#ffa94d] text-xl"
				>
					Valider
				</button>
			</div>
		</>
	);
}
