export default function SecurityData() {
	return (
		<div className="max-w-4xl mx-auto py-8 px-4">
			<h1 className="text-2xl font-bold text-center mb-8">
				Sécurité & Données - La Pince 🦀
			</h1>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-3">
					Comment on protège tes sous (virtuellement)
				</h2>
				<p className="mb-3">
					Chez La Pince, on est peut-être décontractés, mais quand il s'agit de
					sécurité, on ne rigole pas ! Voici comment on garde tes données aussi
					bien protégées que le trésor d'un pirate.
				</p>
			</section>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-3">
					Notre coffre-fort numérique
				</h2>

				<div className="mb-4">
					<h3 className="font-semibold flex items-center">
						<span className="mr-2">🔒</span> Authentification solide
					</h3>
					<ul className="list-disc pl-10 mt-2">
						<li>On utilise un système d'authentification moderne et robuste</li>
						<li>Ton mot de passe ? On ne le stocke jamais en clair. Jamais.</li>
						<li>
							On utilise des techniques de hachage ultra-costauds (c'est comme
							si on transformait ton mot de passe en soupe incompréhensible)
						</li>
					</ul>
				</div>

				<div className="mb-4">
					<h3 className="font-semibold flex items-center">
						<span className="mr-2">🛡️</span> Protection contre les attaques
					</h3>
					<ul className="list-disc pl-10 mt-2">
						<li>Des mécanismes de protection contre les intrusions</li>
						<li>Nettoyage automatique de tout contenu suspect</li>
						<li>Protection contre les tentatives d'accès non autorisées</li>
						<li>Vérification rigoureuse de toutes les données entrantes</li>
					</ul>
				</div>

				<div className="mb-4">
					<h3 className="font-semibold flex items-center">
						<span className="mr-2">📡</span> Transmission sécurisée
					</h3>
					<ul className="list-disc pl-10 mt-2">
						<li>
							Toutes les communications entre ton appareil et nos serveurs sont
							sécurisées
						</li>
						<li>
							Tes données financières ne voyagent jamais à découvert sur
							Internet
						</li>
					</ul>
				</div>
			</section>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-3">
					Comment on stocke tes données
				</h2>

				<div className="mb-4">
					<h3 className="font-semibold flex items-center">
						<span className="mr-2">📊</span> Base de données sécurisée
					</h3>
					<ul className="list-disc pl-10 mt-2">
						<li>Isolation complète des données utilisateurs</li>
						<li>Sauvegardes automatiques régulières</li>
						<li>Environnement technique mis à jour régulièrement</li>
					</ul>
				</div>

				<div className="mb-4">
					<h3 className="font-semibold flex items-center">
						<span className="mr-2">⏱️</span> Disponibilité
					</h3>
					<ul className="list-disc pl-10 mt-2">
						<li>
							On surveille constamment nos systèmes pour garantir que l'app
							fonctionne quand tu en as besoin
						</li>
						<li>Des plans de secours au cas où un problème surviendrait</li>
					</ul>
				</div>
			</section>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-3">
					Si tu t'inquiètes pour tes données
				</h2>

				<div className="mb-4">
					<h3 className="font-semibold flex items-center">
						<span className="mr-2">🛠️</span> Ce que tu peux faire
					</h3>
					<ul className="list-disc pl-10 mt-2">
						<li>
							Utilise un mot de passe fort et unique (pas le nom de ton chat,
							stp)
						</li>
						<li>Déconnecte-toi sur les appareils partagés</li>
					</ul>
				</div>

				<div className="mb-4">
					<h3 className="font-semibold flex items-center">
						<span className="mr-2">🧠</span> Ce qu'on fait en continu
					</h3>
					<ul className="list-disc pl-10 mt-2">
						<li>Tests de sécurité réguliers</li>
						<li>Vérification rigoureuse de notre code</li>
						<li>Suivi des meilleures pratiques du secteur</li>
						<li>Formation de notre équipe aux enjeux de sécurité</li>
					</ul>
				</div>
			</section>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-3">En cas de problème</h2>
				<p className="mb-3">
					Si tu remarques quelque chose de suspect (une dépense que tu n'as pas
					faite, un accès étrange), contacte-nous immédiatement à :{" "}
					<span className="font-semibold">laplage@lapince.fun</span>
				</p>
			</section>

			<div className="text-center text-sm mt-8">
				Dernière mise à jour : Avril 2025
			</div>
		</div>
	);
}
