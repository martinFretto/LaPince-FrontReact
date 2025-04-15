import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<div className='bg-yellow-100 w-full px-4 py-7 md:px-[5%]'>
			{/* Mobile design (par défaut) */}
			<div className='flex flex-col items-center space-y-3 md:hidden'>
				<div className='flex gap-2 justify-center'>
					<a
						href='https://www.youtube.com/@OclockIo'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img
							src='/logo-youtube.svg'
							alt='logo-youtube'
							className='w-8 h-8'
						/>
					</a>
					<a
						href='https://www.facebook.com/Oclock.io/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img
							src='/logo-facebook.svg'
							alt='logo-facebook'
							className='w-6 h-8'
						/>
					</a>
					<a
						href="https://www.linkedin.com/school/ecole-o'clock/"
						target='_blank'
						rel='noopener noreferrer'
					>
						<img
							src='/logo-linkedin.svg'
							alt='logo-linkedin'
							className='w-9 h-9'
						/>
					</a>
					<a
						href='https://www.instagram.com/oclock_io/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img
							src='/logo-instagram.svg'
							alt='logo-instagram'
							className='w-6.5 h-8'
						/>
					</a>
				</div>

				<div className='flex flex-col items-center space-y-1 text-[0.6rem]'>
					<Link
						to='/user-guide'
						className='text-black font-bold hover:text-gray-600'
					>
						Mode d'emploi
					</Link>
					<Link
						to='/legal-notices'
						className='text-black hover:text-gray-600'
					>
						Mentions légales
					</Link>
					<Link
						to='/security-data'
						className='text-black hover:text-gray-600'
					>
						Sécurité & Données
					</Link>
					<Link
						to='/privacy-policy'
						className='text-black hover:text-gray-600'
					>
						Politique de confidentialité
					</Link>
				</div>

				<div className='flex flex-col items-center'>
					<Link to='/page-blanche'>
						<img
							src='/logo-treasure.svg'
							alt='logo-coffre'
							className='w-8 h-8'
						/>
					</Link>
					<p className='text-black text-[0.6rem] mt-1'>
						2025 © Copyright
					</p>
				</div>
			</div>

			{/* Desktop design (md et au-delà) */}
			<div className='hidden md:grid md:grid-cols-12 md:items-center'>
				{/* Logos des réseaux sociaux à gauche */}
				<div className='col-span-3 flex gap-3 ml-[10%]'>
					<a
						href='https://www.youtube.com/@OclockIo'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img
							src='/logo-youtube.svg'
							alt='logo-youtube'
							className='w-8 h-8'
						/>
					</a>
					<a
						href='https://www.facebook.com/Oclock.io/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img
							src='/logo-facebook.svg'
							alt='logo-facebook'
							className='w-8 h-8'
						/>
					</a>
					<a
						href="https://www.linkedin.com/school/ecole-o'clock/"
						target='_blank'
						rel='noopener noreferrer'
					>
						<img
							src='/logo-linkedin.svg'
							alt='logo-linkedin'
							className='w-9 h-9'
						/>
					</a>
					<a
						href='https://www.instagram.com/oclock_io/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img
							src='/logo-instagram.svg'
							alt='logo-instagram'
							className='w-9 h-9'
						/>
					</a>
				</div>

				{/* Espace vide au centre-gauche */}
				<div className='col-span-3' />

				{/* Liens au centre-droit */}
				<div className='col-span-4 flex flex-col items-end space-y-1 text-sm'>
					<Link
						to='/user-guide'
						className='text-black hover:text-gray-600'
					>
						Mode d'emploi
					</Link>
					<Link
						to='/legal-notices'
						className='text-black hover:text-gray-600'
					>
						Mentions légales
					</Link>
					<Link
						to='/security-data'
						className='text-black hover:text-gray-600'
					>
						Sécurité & Données
					</Link>
					<Link
						to='/privacy-policy'
						className='text-black hover:text-gray-600'
					>
						Politique de confidentialité
					</Link>
				</div>

				{/* Logo du coffre à droite */}
				<div className='col-span-2 flex justify-end items-center mr-[15%]'>
					<Link to='/page-blanche'>
						<img
							src='/logo-treasure.svg'
							alt='logo-coffre'
							className='w-12 h-12'
						/>
					</Link>
				</div>
			</div>

			{/* Copyright pour desktop (md et au-delà) */}
			<div className='hidden md:block text-center text-black text-xs mt-2'>
				2025 © Copyright
			</div>
		</div>
	);
}
