const fs = require('fs');
const { parse } = require('csv-parse');

const habitablePlanets = [];

function isPlanetHabitable(planet) {
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
}

fs.createReadStream('./kepler_data.csv')
	.pipe(
		parse({
			comment: '#',
			columns: true,
		})
	)
	.on('data', (planet) => {
		if (isPlanetHabitable(planet)) {
			habitablePlanets.push(planet);
		}
	})
	.on('error', (err) => {
		console.log(err);
	})
	.on('end', () => {
		console.log(`${habitablePlanets.length} habitable planets`);
		console.log('no available data');
	});
