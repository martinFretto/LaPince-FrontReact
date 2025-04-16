import { useState } from "react";

interface ExpenseModalProps {
	isOpen: boolean;
	onClose: () => void;
	categoryName: string;
}

export default function ExpenseModal({
	isOpen,
	onClose,
	categoryName,
}: ExpenseModalProps) {
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div className="fixed inset-0 bg-white bg-opacity-30" onClick={onClose} />

			{/* Modale */}
			<div className="border-[#1971c2] border-2 rounded-xl p-6 w-full max-w-md relative z-10 mx-4 bg-[#f8f9fa]">
				<div className="flex flex-col">
					{/* En-tête avec titre et bouton de fermeture */}
					<div className="relative mb-4">
						{/* Bouton de fermeture en position absolue */}
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={onClose}
							className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
						>
							✕
						</button>

						{/* Titre */}
						<h2 className="text-lg font-medium text-black text-center w-full">
							Ajout d'une dépense
							<br />
							{categoryName}
						</h2>
					</div>

					{/* Formulaire */}
					<div className="space-y-4">
						{/* Montant */}
						<div className="text-center">
							<label className="block mb-1 text-black" htmlFor="number">
								Montant
							</label>
							<div className="flex justify-center">
								<input
									id="number"
									type="number"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									className="border border-gray-300 rounded p-2 text-center max-w-[80%]"
									placeholder="0.00 €"
								/>
							</div>
						</div>

						{/* Description */}
						<div className="text-center">
							<label className="block mb-1 text-black" htmlFor="description">
								Description
							</label>
							<div className="flex justify-center">
								<input
									id="description"
									type="text"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="border border-gray-300 rounded p-2 text-center max-w-[80%]"
								/>
							</div>
						</div>

						{/* Date */}
						<div className="text-center">
							<label className="block mb-1 text-black" htmlFor="date">
								Date
							</label>
							<div className="flex justify-center">
								<input
									id="date"
									type="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
									className="border border-gray-300 rounded p-2 text-center max-w-[80%]"
								/>
							</div>
						</div>
					</div>

					{/* Bouton Valider */}
					<div className="flex justify-center mt-6">
						<button
							type="button"
							onClick={onClose}
							className="btn bg-[#4dabf7] border-2 border-[#1971c2] text-black text-md font-normal hover:cursor-pointer flex place-self-center px-8 py-1 rounded"
						>
							Valider
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
