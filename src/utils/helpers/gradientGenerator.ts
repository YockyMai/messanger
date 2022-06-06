export default function generate(user_id: string) {
	const gradientCollection = [
		'linear-gradient(72deg,#c045c1,#1418a9)',
		'linear-gradient(333deg,#ed36ae,#fd8136)',
		'linear-gradient(299deg,#c043e6,#761e21)',
		'linear-gradient(221deg,#c518e9,#ed540d)',
		'linear-gradient(300deg,#128480,#398df5)',
		'linear-gradient(9deg,#037e86,#43cca7)',
		'linear-gradient(138deg,#f6a2ef,#b68214)',
		'linear-gradient(61deg,#46dc95,#33af84)',
		'linear-gradient(233deg,#9a2222,#b63a95)',
	];

	const symbolCharCode = user_id[user_id.length - 1]
		.toString()
		.charCodeAt(0)
		.toString();

	const charCodeIndex = Number(symbolCharCode[symbolCharCode.length - 1]);

	return gradientCollection[charCodeIndex];
}
