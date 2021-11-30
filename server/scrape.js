import axios from 'axios';
import querystring from 'querystring';

function genRand(min, max, decimalPlaces) {
	var rand = Math.random() * (max - min) + min;
	var power = Math.pow(10, decimalPlaces);
	return Math.floor(rand * power) / power;
}

async function post(climb) {
	try {
		console.log(climb);
		await axios.post('http://localhost:5000/ascents', { ascent: climb })
			.then((data) => {
				console.log(data);
			});
	} catch (err) {
		console.log(err);
	}
}

let ascents = [
	{
		climbId: "619dc9a91dceaf3234e14c8d",
		userId: "61921139282b861d6cc254a4",
		description: "Testing ascent",
		grade: "v7",
		quality: 5,
	}
];

try {
	post({
		climbId: "619dc9a91dceaf3234e14c8d",
		userId: "61921139282b861d6cc254a4",
		description: "Testing ascent",
		grade: "v7",
		quality: 5,
	});
}  catch (err) {
	console.log(err);
}

// try {
// 	axios
// 		.post('https://sendage.com/api/climbs', querystring.stringify({ 'page': 1, 'areas[]': 5947, 'area_parents': false, 'limit': 500 }))
// 		.then(res => {
// 			res.data.climbs?.map((climb) => {
// 				post({
// 					name: climb.Climb.name,
// 					grade_value: climb.Climb.grade_id,
// 					description: "",
// 					quality: climb[0].rating,
// 					area_value: climb.Climb.area_id
// 				});
// 			})
// 		})
// 		.catch(error => {
// 			console.error(error)
// 		})
// 	} catch (err) {
// 	console.log(err);
// }
