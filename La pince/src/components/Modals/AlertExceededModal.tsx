export default function AlertExceededModal() {
	return (
		<>
			<div className="absolute z-10 border-2 border-[#e03131] bg-[#ffc9c9] flex flex-col items-center font-semibold mx-6">
				<h1 className="py-6 text-2xl">Attention</h1>
				<p className="mb-4 px-6">
					Le montant alloué à votre budget **nom du budget** est dépassé.
				</p>
				<p className="mb-8 px-6">
					Vous avez dépassé votre budget de **montant dépassé** €
				</p>
				<button
					type="button"
					className="btn mb-4 border-2 border-[#e03131] bg-[#ff8787] text-xl"
				>
					Valider
				</button>
			</div>
		</>
	);
}
