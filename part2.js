import * as fs from 'node:fs/promises';

let text = await fs.readFile("./input.txt", { encoding: 'utf8' });
let lines = text.split("\n");

//	We'll encode red, green and blue as 0, 1, and 2
//	So this is a hand of 2 red, 4 green, 5 blue:
//	[2, 4, 5]

let sumPowers = 0;

console.time("parse");
for (let i = 0; i < lines.length; i++) {
	const power = parseLine(lines[i]);
	sumPowers += power;
}
console.timeEnd("parse");

console.log(`Sum powers: ${sumPowers}`);

function parseLine(game) {
	const sets = game.split(':')[1].split(';');
	let minimum = [0, 0, 0];
	for (let i = 0; i < sets.length; i++) {
		const cubes = sets[i].split(',');
		for (let j = 0; j < cubes.length; j++) {

			let type = 0;
			if (cubes[j].includes("g")) {
				type = 1;
			} else if (cubes[j].includes("b")) {
				type = 2;
			}

			const number = Number(cubes[j].split(" ")[1]);

			if (number > minimum[type]) {
				minimum[type] = number;
			}
		}
	}

	return minimum[0] * minimum[1] * minimum[2];
}