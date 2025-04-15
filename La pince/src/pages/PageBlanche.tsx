import { useState } from "react";
import ExpenseModal from "../components/Modals/ExpenseModal";

export default function PageBlanche() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className='flex flex-col items-center min-h-[75vh] px-4 py-6'>
			<h1 className='text-2xl font-semibold mb-8 text-black'>
				Page de test pour les modales
			</h1>

			<div className='w-full max-w-md bg-white border-2 border-[#1971c2] rounded-xl p-6 mb-10'>
				<div className='flex flex-col items-center gap-6'>
					<p className='text-center text-black'>
						Cliquez sur le bouton ci-dessous pour ouvrir la modale
					</p>

					<button
						onClick={openModal}
						className='btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor-pointer flex place-self-center px-8 py-2 rounded'
					>
						Modal d'ajout de dépense
					</button>
				</div>
			</div>

			<div className='w-full max-w-md bg-white border-2 border-[#1971c2] rounded-xl p-6 mb-10'>
				<div className='flex flex-col items-center gap-6'>
					<p className='text-center text-black'>
						Cliquez sur le bouton ci-dessous pour ouvrir la modale
					</p>

					<button
						onClick={openModal}
						className='btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor-pointer flex place-self-center px-8 py-2 rounded'
					>
						Modal d'ajout de ...
					</button>
				</div>
			</div>

			{/* Intégration de la modale de dépense */}
			<ExpenseModal
				isOpen={isModalOpen}
				onClose={closeModal}
				categoryName='Cadeaux'
			/>
		</div>
	);
}
