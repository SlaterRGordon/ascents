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
		await axios.post('http://localhost:5000/climbs', { climb: climb })
			.then((data) => {
				console.log(data);
			});
	} catch (err) {
		console.log(err);
	}
}

let promises = [];
let climbs = [];

try {
	axios
		.post('https://sendage.com/api/climbs', querystring.stringify({ 'page': 1, 'areas[]': 5947, 'area_parents': false, 'limit': 500 }))
		.then(res => {
			res.data.climbs?.map((climb) => {
				post({
					name: climb.Climb.name,
					grade_value: climb.Climb.grade_id,
					description: "",
					quality: climb[0].rating,
					area_value: climb.Climb.area_id
				});
			})
		})
		.catch(error => {
			console.error(error)
		})

	// Promise.all(promises).then((promise) => {
	// 	console.log(promise);
	// });
	// for (let i = 40; i < 100; i++) {
	// 	promises.push(axios
	// 		.post('https://sendage.com/api/climbs', {page: 1})
	// 		.then(res => {
	// 			res.data.climbs?.map((climb) => {
	// 				climbs.push({
	// 					name: climb.Climb.name,
	// 					grade: "v" + String((Number(climb.Climb.grade_id) - 4) / 6).slice(0, 1),
	// 					description: "",
	// 					quality: genRand(0, 5, 1),
	// 					area: climb.Climb.area_id
	// 				});
	// 			})
	// 		})
	// 		.catch(error => {
	// 			console.error(error)
	// 		})
	// 	);
	// }

	// let more = [];
	// Promise.all(promises).then(() => {
	// 	climbs.map((climb) => {
	// 		console.log(climb);
	// 	})
	// });
} catch (err) {
	console.log(err);
}
