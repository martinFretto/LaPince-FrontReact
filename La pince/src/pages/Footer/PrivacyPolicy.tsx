export default function PrivacyPolicy() {
	return (
		<div className='max-w-4xl mx-auto py-8 px-4'>
			<h1 className='text-2xl font-bold text-center mb-8'>
				Politique de Confidentialité - La Pince 🦀
			</h1>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3'>Salut toi ! 👋</h2>
				<p className='mb-3'>
					Chez La Pince, on adore gérer tes sous, mais on adore encore
					plus protéger tes données ! Cette politique de
					confidentialité t'explique comment on collecte, utilise et
					protège tes infos quand tu utilises notre app de gestion de
					budget.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3'>
					Ce qu'on récupère comme infos 📋
				</h2>

				<div className='mb-4'>
					<h3 className='font-semibold flex items-center'>
						<span className='mr-2'>👤</span> Pour ton compte
					</h3>
					<ul className='list-disc pl-10 mt-2'>
						<li>
							Ton nom (pour pouvoir t'appeler autrement que "Hey toi
							!")
						</li>
						<li>
							Ton email (promis, on ne t'enverra pas de pubs pour des
							crustacés)
						</li>
						<li>
							Ton mot de passe (bien protégé, comme le trésor d'un
							pirate)
						</li>
					</ul>
				</div>

				<div className='mb-4'>
					<h3 className='font-semibold flex items-center'>
						<span className='mr-2'>💰</span> Pour ton budget
					</h3>
					<ul className='list-disc pl-10 mt-2'>
						<li>Les dépenses et revenus que tu saisis toi-même</li>
						<li>Les catégories que tu crées</li>
						<li>
							Tes objectifs d'épargne (on croise les doigts pour toi
							!)
						</li>
					</ul>
				</div>

				<p className='mt-2 pl-2 font-medium'>
					Important : On ne récupère JAMAIS tes données bancaires
					directement. Ce que tu saisis reste sous TON contrôle.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3'>
					Ce qu'on fait avec tes données 🛠️
				</h2>
				<p className='mb-3'>On utilise tes données pour :</p>
				<ul className='list-disc pl-10 mt-2 mb-3'>
					<li>
						Te fournir un service qui déchire (gérer ton budget sans
						prise de tête)
					</li>
					<li>
						Personnaliser ton expérience (parce que c'est TON app
						après tout)
					</li>
					<li>
						T'envoyer des rappels utiles (comme "Hé, tu n'aurais pas
						un peu abusé sur les restos ce mois-ci ?")
					</li>
					<li>
						Améliorer notre app (pour qu'elle soit encore plus cool)
					</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3'>
					Comment on protège tes infos 🔒
				</h2>
				<p className='mb-3'>
					La sécurité de tes données, c'est notre data ! On met en
					place tout un tas de mesures techniques et
					organisationnelles pour que tes infos restent entre de
					bonnes pinces.
				</p>
				<p className='mt-2'>
					Tu peux dormir tranquille : on fait tout pour protéger tes
					données contre les accès non autorisés, les fuites, ou toute
					autre forme de méchanceté numérique.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3'>
					Tes droits (et ils sont nombreux !) ⚖️
				</h2>
				<p className='mb-3'>
					Tu as des super-pouvoirs sur tes données ! Tu peux :
				</p>
				<ul className='list-disc pl-10 mt-2 mb-3'>
					<li>Consulter toutes les données qu'on a sur toi</li>
					<li>Corriger tes infos si tu repères une erreur</li>
					<li>
						Demander qu'on supprime tout (le fameux "droit à l'oubli")
					</li>
					<li>Limiter ce qu'on fait avec tes données</li>
					<li>Récupérer tes données pour les utiliser ailleurs</li>
				</ul>
				<p>
					Pour exercer ces droits de super-héros, envoie-nous un
					message à :{" "}
					<span className='font-semibold'>privacy@lapince.fun</span>
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3'>
					On change parfois notre politique 🔄
				</h2>
				<p className='mb-3'>
					De temps en temps, on met à jour cette politique (promis, ce
					n'est pas pour y glisser des trucs louches). La date de
					dernière mise à jour est toujours indiquée en bas.
				</p>
				<p>
					On te conseille de jeter un œil de temps en temps pour voir
					ce qui a changé. Si on fait des modifications importantes,
					on te préviendra directement dans l'app.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3'>
					Des questions ? On est là ! 📞
				</h2>
				<p className='mb-3'>
					Si tu as la moindre question sur tes données ou cette
					politique, n'hésite pas à nous contacter :{" "}
					<span className='font-semibold'>laplage@lapince.fun</span>
				</p>
				<p>
					On adore papoter de confidentialité des données (si, si,
					vraiment).
				</p>
			</section>

			<div className='text-center text-sm mt-8'>
				Dernière mise à jour : Avril 2025
			</div>
		</div>
	);
}
