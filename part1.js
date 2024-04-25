import * as fs from 'node:fs/promises';

let text = await fs.readFile("./input.txt", { encoding: 'utf8' });
let lines = text.split("\n");

//	We'll encode red, green and blue as 0, 1, and 2
//	So this is a hand of 2 red, 4 green, 5 blue:
//	[2, 4, 5]

const bagContents = [12, 13, 14];
let sumPossibleGames = 0;

for (let i = 0; i < lines.length; i++) {
	if (parseLine(lines[i])) {
		sumPossibleGames += (i + 1);
	}
}

console.log(`Sum possible games: ${sumPossibleGames}`);

function parseLine(game) {
	const sets = game.split(':')[1].split(';');
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

			if (number > bagContents[type]) {
				return false;
			}
		}
	}
	return true;
}