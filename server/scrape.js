import axios from 'axios';

function genRand(min, max, decimalPlaces) {
    var rand = Math.random() * (max - min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
}

async function post(climb) {
    try {
        await axios.post('http://localhost:5000/climbs', {climb: climb});
    } catch(err) {
        console.log(err);
    }
}

let promises = [];
let climbs = [];

try {
    for (let i = 40; i < 100; i++) {
        promises.push(axios
            .post('https://sendage.com/api/climbs', { page: i })
            .then(res => {
                res.data.climbs?.map((climb) => {
                    if (climb.Climb.name && climb.Climb.type == 'boulder') {
                        climbs.push({
                            name: climb.Climb.name,
                            grade: "v" + String((Number(climb.Climb.grade_id) - 4) / 6).slice(0, 1),
                            description: "",
                            quality: genRand(0, 5, 1),
                            area: climb.Climb.area
                        });
                    }
                })
            })
            .catch(error => {
                console.error(error)
            })
        );
    }

    let more = [];
    Promise.all(promises).then(() => {
        climbs.map((climb) => {
            more.push(post(climb));
        })
    });
} catch (err) {
    console.log(err);
}
