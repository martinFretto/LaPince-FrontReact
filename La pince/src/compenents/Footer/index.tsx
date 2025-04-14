export default function Footer() {
	return (
		<div className='bg-yellow-100 w-full px-4 py-7 md:px-[5%]'>
			{/* Mobile design (par défaut) */}
			<div className='flex flex-col items-center space-y-3 md:hidden'>
				<div className='flex gap-2 justify-center'>
					<img
						src='/logo-youtube.svg'
						alt='logo-youtube'
						className='w-8 h-8'
					/>
					<img
						src='/logo-facebook.svg'
						alt='logo-facebook'
						className='w-6 h-8'
					/>
					<img
						src='/logo-linkedin.svg'
						alt='logo-linkedin'
						className='w-8 h-8'
					/>
					<img
						src='/logo-instagram.svg'
						alt='logo-instagram'
						className='w-6.5 h-8'
					/>
				</div>

				<div className='flex flex-col items-center space-y-1 text-[0.6rem]'>
					<p className='text-black cursor-pointer hover:text-gray-600'>
						Mode d'emploi
					</p>
					<p className='text-black cursor-pointer hover:text-gray-600'>
						Mentions légales
					</p>
					<p className='text-black cursor-pointer hover:text-gray-600'>
						Sécurité & Données
					</p>
					<p className='text-black cursor-pointer hover:text-gray-600'>
						Politique de confidentialité
					</p>
				</div>

				<div className='flex flex-col items-center'>
					<img
						src='/logo-treasure.svg'
						alt='logo-coffre'
						className='w-8 h-8'
					/>
					<p className='text-black text-[0.6rem] mt-1'>
						2025 © Copyright
					</p>
				</div>
			</div>

			{/* Desktop design (md et au-delà) */}
			<div className='hidden md:grid md:grid-cols-12 md:items-center'>
				{/* Logos des réseaux sociaux à gauche */}
				<div className='col-span-3 flex gap-3 ml-[10%]'>
					<img
						src='/logo-youtube.svg'
						alt='logo-youtube'
						className='w-8 h-8'
					/>
					<img
						src='/logo-facebook.svg'
						alt='logo-facebook'
						className='w-8 h-8'
					/>
					<img
						src='/logo-linkedin.svg'
						alt='logo-linkedin'
						className='w-9 h-9'
					/>
					<img
						src='/logo-instagram.svg'
						alt='logo-instagram'
						className='w-9 h-9'
					/>
				</div>

				{/* Espace vide au centre-gauche */}
				<div className='col-span-3'></div>

				{/* Liens au centre-droit */}
				<div className='col-span-4 flex flex-col items-end space-y-1 text-sm'>
					<p className='text-black cursor-pointer hover:text-gray-600'>
						Mode d'emploi
					</p>
					<p className='text-black cursor-pointer hover:text-gray-600'>
						Mentions légales
					</p>
					<p className='text-black cursor-pointer hover:text-gray-600'>
						Sécurité & Données
					</p>
					<p className='text-black cursor-pointer hover:text-gray-600'>
						Politique de confidentialité
					</p>
				</div>

				{/* Logo du coffre à droite */}
				<div className='col-span-2 flex justify-end items-center mr-[15%]'>
					<img
						src='/logo-treasure.svg'
						alt='logo-coffre'
						className='w-12 h-12'
					/>
				</div>
			</div>

			{/* Copyright pour desktop (md et au-delà) */}
			<div className='hidden md:block text-center text-black text-xs mt-2'>
				2025 © Copyright
			</div>
		</div>
	);
}
