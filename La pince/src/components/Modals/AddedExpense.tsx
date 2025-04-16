import { useState } from "react";

interface BudgetModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function BudgetModal({
	isOpen,
	onClose,
}: BudgetModalProps) {
	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [icon, setIcon] = useState("");
	const [threshold, setThreshold] = useState("");
	const [color, setColor] = useState("#A5D8FF");

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50'>
			<div
				className='fixed inset-0 bg-white bg-opacity-30'
				onClick={onClose}
			></div>

			{/* Modale */}
			<div className='border-[#1971c2] border-2 rounded-xl p-6 w-full max-w-md md:max-w-lg relative z-10 mx-4 bg-[#f8f9fa]'>
				<div className='flex flex-col'>
					{/* En-tête avec titre et bouton de fermeture */}
					<div className='relative mb-6'>
						{/* Bouton de fermeture en position absolue */}
						<button
							onClick={onClose}
							className='absolute top-0 right-0 text-gray-500 hover:text-gray-700'
						>
							✕
						</button>

						{/* Titre */}
						<h2 className='text-lg font-medium text-black text-center w-full'>
							Ajouter un budget
						</h2>
					</div>

					{/* Formulaire */}
					<div className='flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4'>
						{/* Titre du budget */}
						<div className='w-full md:w-[48%]'>
							<label className='block mb-1 text-black'>
								Titre du budget
							</label>
							<input
								type='text'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className='border border-gray-300 rounded p-2 w-full'
							/>
						</div>

						{/* Montant alloué */}
						<div className='w-full md:w-[48%]'>
							<label className='block mb-1 text-black'>
								Montant alloué
							</label>
							<div className='relative'>
								<input
									type='number'
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									className='border border-gray-300 rounded p-2 w-full'
								/>
								<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
									€
								</span>
							</div>
						</div>

						{/* Choix dicône */}
						<div className='w-full md:w-[48%]'>
							<label className='block mb-1 text-black'>
								Choisissez un icône
							</label>
							<select
								value={icon}
								onChange={(e) => setIcon(e.target.value)}
								className='border border-gray-300 rounded p-2 w-full appearance-none bg-white'
							>
								<option value=''>Sélectionnez</option>
								<option value='gift'>Cadeau</option>
								<option value='food'>Nourriture</option>
								<option value='transport'>Transport</option>
								<option value='home'>Maison</option>
							</select>
						</div>

						{/* Seuil d'alerte */}
						<div className='w-full md:w-[48%]'>
							<label className='block mb-1 text-black'>
								Seuil d'alerte
							</label>
							<div className='relative'>
								<input
									type='number'
									value={threshold}
									onChange={(e) => setThreshold(e.target.value)}
									className='border border-gray-300 rounded p-2 w-full'
								/>
								<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
									€
								</span>
							</div>
						</div>

						{/* Choix de couleur */}
						<div className='w-full'>
							<label className='block mb-1 text-black'>
								Choisissez une couleur
							</label>
							<input
								type='color'
								value={color}
								onChange={(e) => setColor(e.target.value)}
								className='border border-gray-300 rounded p-1 w-full h-10'
							/>
						</div>
					</div>

					{/* Bouton Valider */}
					<div className='flex justify-center mt-8'>
						<button
							onClick={onClose}
							className='btn bg-[#4dabf7] border-2 border-[#1971c2] text-black text-md font-normal hover:cursor-pointer px-8 py-2 rounded'
						>
							Valider
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
