import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<div className="bg-[#FFF9DB] w-full px-4 py-7 ">
			<div className="flex flex-col items-center space-y-3 md:flex-row md:justify-between md:mx-20 lg:mx-40 xl:mx-60 2xl:mx-80">
				<div className="flex gap-2 justify-center w-40 mt-10">
					<a
						href="https://www.youtube.com/@OclockIo"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src="/socialNetworkLogo/logo-youtube.svg" alt="logo-youtube" />
					</a>
					<a
						href="https://www.facebook.com/Oclock.io/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src="/socialNetworkLogo/logo-facebook.svg"
							alt="logo-facebook"
						/>
					</a>
					<a
						href="https://www.linkedin.com/school/ecole-o'clock/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src="/socialNetworkLogo/logo-linkedin.svg"
							alt="logo-linkedin"
						/>
					</a>
					<a
						href="https://www.instagram.com/oclock_io/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src="/socialNetworkLogo/logo-instagram.svg"
							alt="logo-instagram"
						/>
					</a>
				</div>

				<div className="md:flex">
					<div className="flex flex-col items-center font-semibold space-y-1 text-[0.6rem]">
						<Link to="/user-guide" className="text-lg">
							Mode d'emploi
						</Link>
						<Link to="/legal-notices" className="text-lg">
							Mentions légales
						</Link>
						<Link to="/security-data" className="text-lg">
							Sécurité & Données
						</Link>
						<Link to="/privacy-policy" className="text-lg">
							Politique de confidentialité
						</Link>
					</div>

					<div className="flex flex-col items-center md:ml-10">
						<Link to="/page-blanche">
							<img
								src="/logo-treasure.svg"
								alt="logo-coffre"
								className="w-20 mt-8"
							/>
						</Link>
					</div>
				</div>
			</div>

			<div className="text-xs mt-4 -mb-4 place-self-center">
				2025 © Copyright
			</div>
		</div>
	);
}
