import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[55vh] px-3 py-4 bg-white'>
			<div className='border-[#1971c2] border-2 rounded-3xl mx-4 my-8 py-8 px-6 bg-[#a5d8ff] max-w-md w-full'>
				<div className='flex flex-col items-center'>
					<h1 className='text-2xl font-semibold mb-4 text-center text-black'>
						Oups ! Page introuvable
					</h1>

					<div className='flex justify-center mb-6'>
						<img
							src='/logo-crab.svg'
							alt='Logo La Pince'
							className='w-33 h-33'
						/>
					</div>

					<p className='text-center mb-8 text-lg text-black'>
						Il n'y a pas un sou ici !
					</p>

					<p className='text-center mb-10 text-sm text-black'>
						Cette page n'existe pas, mais tes économies elles,
						existent (on espère). Retourne vite les gérer !
					</p>

					<Link to='/dashboard'>
						<button className='btn bg-[#4dabf7] border-2 border-[#1971c2] text-white text-md font-normal hover:cursor flex place-self-center'>
							Retour à l'accueil
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
