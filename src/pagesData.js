// Note: Les images page-N.png ne sont pas détectées dans le dossier assets.
// J'utilise une image existante comme placeholder pour éviter les erreurs.
// Une fois vos images ajoutées, décommentez les imports appropriés.

import img1 from "./assets/images/paper.png";
import img2 from './assets/images/montagne.png';
import img3 from './assets/images/train.png';
//import img4 from './assets/images/page-4.png';
import img5 from './assets/images/protection.png';
import img6 from './assets/images/kiss-lit.png';
import img7 from './assets/images/cafe.png';
import img8 from './assets/images/kiss.png';

// import placeholder from './assets/images/bouton.png';

export default [
	{
		title: "Un moment pour nous",
		// Contenu possible par page :
		// - title: string (affiché centré)
		// - image: string (png/jpg/gif, affiché au-dessus du texte)
		// - mediaPlacement: "above" | "below" | "left" | "right" (position de l'image)
		// - paragraphs: string[] (1 ou 2 paragraphes, recommandé)
		// Compat : text + text2 restent supportés si vous préférez.
		paragraphs: [
			"Je t'écris dans la douceur de la nuit, alors que tout est paisible. Ces mots viennent du cœur, pour toi...",
			"J'avais besoin de poser mes pensées pour que tu puisses voir ce qu'il y a à l'intérieur de moi ce soir..",
		],
		image: img1,
		mediaPlacement: "below",
	},
	{
		title: "Le poids de mes journées",
		paragraphs: [
			"En ce moment, entre la thèse et mes projets, mes journées sont de longues ascensions qui me fatiguent beaucoup.",
      "Parfois, mon corps et mon esprit réclament un peu de calme pour pouvoir continuer à avancer sereinement.",
		],
		image: img2,
    mediaPlacement: "right",
	},
	{
		title: "Le rythme et la distance",
		paragraphs: [ "Venir te voir est un bonheur, mais les trajets et l'organisation sont aussi des efforts que je fournis avec tout mon amour.",
    "Si je choisis de rester travailler certains jours, c'est pour mieux préserver notre temps ensemble sans être épuisé."
		],
		image: img3,
    mediaPlacement: "below",
	},
	{
		title: "Mes peurs silencieuses",
    paragraphs: ["Quand je sens que mes limites te blessent, je me sens envahi par une grande culpabilité et une peur de mal faire." , 
      "J'ai besoin de savoir que je peux te dire mes contraintes sans que tu doutes de la force de mes sentiments pour toi."
    ],
    // image: img4,
	},
	{
		title: "Ma protection",
		paragraphs: ["Je suis quelqu'un de très indépendant, et m'ouvrir totalement est un apprentissage qui me demande du courage.",
      "Ce n'est pas du détachement, c'est juste ma façon d'apprendre à aimer à deux. J'ai parfois le réflexe de me protéger derrière mes murailles quand j'ai peur."
    ],
		 image: img5,
     mediaPlacement: "above",
	},
	{
		title: "L'évidence d'être ensemble",
		paragraphs: ["Tu m'as demandé comment je savais que je t'aimais.. Et la réponse est au fond de moi. C'est cette sensation de bien-être naturel, ce pur bonheur d'être juste là, près de toi." ,
      "Aimer, pour moi, c'est cette évidence de se sentir simplement bien et à ma place à tes côtés."
    ],
		image: img6,
    mediaPlacement: "right",
	},
	{
		title: "Pour demain",
		paragraphs: ["Nous formons une équipe magnifique, capable de conquérir le monde si nous prenons soin du rythme de l'autre.","Nous méritons de vivre cette belle histoire"],
		image: img7,
    mediaPlacement: "below",

	},
	{
		title: "",
		paragraphs: ["Je t'aime pour tout ce que tu es, et je suis reconnaissant chaque jour de t'avoir dans ma vie.","Merci d'être toi."],
		image: img8,
		final: true,
	},
];
