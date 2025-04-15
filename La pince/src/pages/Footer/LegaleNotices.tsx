export default function LegalNotices() {
	return (
		<div className='max-w-4xl mx-auto py-8 px-4'>
			<h1 className='text-2xl font-bold text-center mb-8'>
				Mentions Légales - La Pince 🦀
			</h1>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3 flex items-center'>
					<span className='mr-2'>✨</span> Hey, les trucs officiels !
				</h2>
				<p className='mb-3'>
					On sait que ce n'est pas la partie la plus fun, mais ces
					mentions légales sont importantes. On a essayé de les rendre
					un peu moins barbantes. Promis, on a fait un effort !
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3 flex items-center'>
					<span className='mr-2'>🔐</span> Propriété intellectuelle
				</h2>
				<p className='mb-3'>
					Tous les trucs cools que tu vois dans notre app (textes,
					images, vidéos, logos, icônes, etc.) sont protégés par le
					droit d'auteur et autres droits de propriété intellectuelle.
				</p>
				<p className='mb-3'>
					En gros, si tu copies notre contenu sans nous demander
					gentiment la permission, c'est comme si tu prenais le goûter
					de quelqu'un d'autre à la récré - pas cool ! Et en plus, les
					articles L.335-2 et suivants du Code de la Propriété
					Intellectuelle pourraient te tomber dessus.
				</p>
				<p className='mb-3'>
					Nos marques et logos sont comme nos doudous - on y tient
					beaucoup ! Toute imitation sans notre autorisation n'est pas
					permise et pourrait te causer des ennuis.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3 flex items-center'>
					<span className='mr-2'>🔗</span> Liens vers d'autres sites
				</h2>
				<p className='mb-3'>
					Notre app peut contenir des liens vers d'autres sites web
					qui ne sont pas sous notre contrôle. C'est comme si on te
					recommandait un resto - on peut te donner l'adresse, mais on
					ne peut pas garantir que le chef sera en forme ce jour-là !
					On n'est donc pas responsables du contenu que tu pourrais y
					trouver.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3 flex items-center'>
					<span className='mr-2'>⚠️</span> Limitation de
					responsabilité
				</h2>
				<p className='mb-3'>
					On fait de notre mieux pour que toutes les infos dans l'app
					soient correctes et à jour. Mais bon, on n'est pas parfaits
					(même si on n'est pas loin 😉). On se réserve le droit de
					corriger des erreurs sans prévenir, et on ne peut pas
					garantir que tout sera toujours exact à 100%.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3 flex items-center'>
					<span className='mr-2'>⚖️</span> Droit applicable
				</h2>
				<p className='mb-3'>
					Ces mentions légales sont soumises au droit français. Si
					jamais on avait un désaccord (ce qu'on n'espère vraiment pas
					!), ce serait les tribunaux de Paris qui régleraient ça.
					Mais franchement, on préfère résoudre les choses autour d'un
					café ou d'une limonade !
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3 flex items-center'>
					<span className='mr-2'>🔄</span> Modifications
				</h2>
				<p className='mb-3'>
					On peut modifier ces mentions légales de temps en temps,
					donc jette-y un œil régulièrement. C'est comme les mises à
					jour de ton téléphone - personne ne les lit, mais c'est
					quand même important !
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-xl font-semibold mb-3 flex items-center'>
					<span className='mr-2'>👥</span> L'équipe derrière tout ça
				</h2>
				<div className='pl-6'>
					<p className='mb-2'>
						<span className='font-semibold'>
							Conception et développement :
						</span>{" "}
						Bob, Martin, Matthieu, Sylvain
					</p>
					<p className='mb-2'>
						<span className='font-semibold'>Design graphique :</span>{" "}
						Matthieu DesignPlus
					</p>
					<p>
						<span className='font-semibold'>Contact :</span>{" "}
						<a
							href='mailto:laplage@lapince.fun'
							className='text-blue-600 hover:underline'
						>
							laplage@lapince.fun
						</a>
					</p>
				</div>
			</section>

			<div className='text-center text-sm mt-8'>
				Dernière mise à jour : 15 avril 2025
			</div>
		</div>
	);
}
