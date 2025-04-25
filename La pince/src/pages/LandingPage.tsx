import { Link } from "react-router-dom";

export default function LandingPage() {
	return (
		<div>
			<div className="flex justify-center">
				<h1 className="self-center text-2xl font-semibold">La Pince ! </h1>
				<img src="/logo-crab.svg" alt="logo-crabe" className="w-15" />
			</div>
			<div className="text-center italic px-4 mb-8">
				<p>
					L'app qui serre ton budget... sans te faire mal au porte-monnaie !
					<br />
					<br />
					Tu connais ce moment où tu regardes ton compte en banque et tu te
					demandes :
					<br />
					"Mais j’ai acheté QUOI pour que ça descende aussi vite ?"
					<br /> Nous aussi ! Alors on a créé <strong>La Pince</strong> :
					<br />
					Une application simple, drôle (un peu comme nous) et <br />
					redoutablement efficace pour t’aider à reprendre le contrôle sur ton
					argent.
				</p>

				<br />

				<strong>Que fait La Pince pour toi ?</strong>
				<br />
				<br />

				<div className="place-self-center space-y-4">
					<div className="flex items-start gap-2">
						<img src="/check.svg" alt="check" className="w-4 h-4 mt-1" />
						<p>
							Suit tes dépenses sans te juger, (même si tu as craqué sur un
							canard en plastique hors de prix !)
						</p>
					</div>

					<div className="flex items-start gap-2">
						<img src="/check.svg" alt="check" className="w-4 h-4 mt-1" />
						<p>
							Te montre clairement où passe ton argent, sans avoir besoin d’un
							diplôme en comptabilité.
						</p>
					</div>

					<div className="flex items-start gap-2">
						<img src="/check.svg" alt="check" className="w-4 h-4 mt-1" />
						<p>
							T’envoie des rappels malins pour t’éviter de finir le mois à sec.
						</p>
					</div>
				</div>

				<br />
				<strong>Pourquoi La pince ?</strong>
				<br />
				<br />
				<p>
					Parce qu’elle attrape les dépenses inutiles avant qu’elles ne fassent
					un carnage. <br />
					Et parce qu’on aime les crustacés...
				</p>

				<br />
				<strong>Qui sommes-nous ?</strong>
				<br />
				<br />
				<p>
					Une équipe de 4 humains (enfin presque) qui en avaient marre de
					galérer avec leur budget. <br />
					Pas de banquiers (ex-banquier pour certain), pas des gourous de la
					finance (même si on refait le monde entre nous avec le Nasdaq & la
					crypto). <br />
					Juste des gens qui veulent rendre la gestion d'argent un peu plus fun
					et plus facile.
				</p>

				<br />
				<p>
					Alors si toi aussi tu veux ton propre coffre tout plein comme le
					nôtre, inscris-toi{" "}
					<strong>
						<Link to="/auth/register" className="text-[#1971C2]">
							ici
						</Link>
					</strong>{" "}
					ou connecte-toi{" "}
					<strong>
						<Link to="/auth/login" className="text-[#1971C2]">
							là
						</Link>
					</strong>{" "}
					!
				</p>
			</div>
		</div>
	);
}
