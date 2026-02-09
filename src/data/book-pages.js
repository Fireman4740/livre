// Note: Les images page-N.png ne sont pas détectées dans le dossier assets.
// J'utilise une image existante comme placeholder pour éviter les erreurs.
// Une fois vos images ajoutées, décommentez les imports appropriés.

import img1 from "../assets/images/paper.png";
import img2 from "../assets/images/montagne.png";
import img3 from "../assets/images/train.png";
//import img4 from "../assets/images/page-4.png";
import img5 from "../assets/images/protection.png";
import img6 from "../assets/sprites/bn.gif";
import img7 from "../assets/images/cafe.png";
import img8 from "../assets/images/kiss.png";


// import placeholder from "../assets/images/bouton.png";

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
		paragraphs: [ 
            "C'est parce que je tiens à nous que je dois parfois ménager mes forces. Les allers-retours sont des voyages que je fais avec joie, mais ils puisent dans mes réserves.",
            "Choisir de rester travailler certains jours, c'est m'assurer de pouvoir t'offrir le meilleur de moi-même quand nous nous retrouvons."
        ],
		image: img3,
    mediaPlacement: "left",
	},
	{
		title: "Mes peurs silencieuses",
    paragraphs: [
            "Parfois, j'ai peur que mes limites soient perçues comme une absence, et cette idée fait naître en moi une ombre de culpabilité.", 
            "Ressentir que mes moments de recul sont compris comme un besoin de souffle m'apaise, et me permet de garder mon cœur grand ouvert vers toi."
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
		paragraphs: [
            "C'est justement parce que je me sens si bien à tes côtés que j'apprends à laisser tomber ces défenses, petit à petit.",
            "Tu m'as demandé comment je savais que je t'aimais... La réponse est là, dans cette sensation de paix et de bonheur naturel quand nous sommes ensemble."
        ],
		image: img6,
    mediaPlacement: "below",
	},
	{
		title: "Pour demain",
		paragraphs: [
            "Aimer, c'est cette évidence de se sentir à sa place, que l'on discute ou que l'on partage simplement un silence.",
            "Ensemble, nous formons une équipe magnifique, capable de conquérir le monde si nous prenons soin du rythme de l'autre"
        ],
		image: img7,
    mediaPlacement: "below",

	},
	{
		title: "",
		paragraphs: ["Nous méritons de vivre cette belle histoire","Je t'aime pour tout ce que tu es, et je suis reconnaissant chaque jour de t'avoir dans ma vie.","Merci d'être toi."],
		image: img8,
		final: true,

	},

];
