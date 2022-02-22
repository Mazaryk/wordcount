#! /usr/bin/env node

import { program } from "commander";
import { IPackageJson } from "package-json-type";
import * as fs from "fs";

const packageJsonPath = '../package.json';
const packageJson: IPackageJson = require(packageJsonPath);

const appName = packageJson.name?.split('/').pop() || "(name missing)"; // drop scope, if any
const appDescription = packageJson.description || "(description missing)";
const appVersion = packageJson.version || "(version missing)";

let sourceFilePath = "";

// TODO - case-sensitive flag

program
     .name(appName)
     .description(appDescription)
     .version(appVersion, '-v, --version')
     .argument('<file>', 'The file to parse').action((arg) => sourceFilePath = arg);

program.parse(process.argv);

// const options = program.opts();

if ( ! fs.existsSync(sourceFilePath) ) {
	console.error(`${sourceFilePath}: No such file`);
	process.exit(1);
}

if ( ! fs.lstatSync(sourceFilePath).isFile() ) {
	console.error(`${sourceFilePath}: Does not appear to be a file`);
	process.exit(1);
}

const dataRaw = fs.readFileSync(sourceFilePath).toString();

// Replace non word chars (keep - and _) with space
const data = dataRaw.replace(/[^A-Za-z\-_]/g, ' ').toLowerCase();

// split into words filtering empty entries
const words = data.split(' ').filter( (value) => value.length);

const frequencyUnsorted = words.reduce((a, w) => {

	if ( ! a.has(w) )
		a.set(w, 0);

	a.set(w, a.get(w) + 1);

	return a;

} , new Map<string, number>());

const frequency = Array.from(frequencyUnsorted.entries())
                        .sort(([wordA],[wordB]) => wordA.localeCompare(wordB) )
                        .sort(([, countA],[, countB]) => countB - countA );


console.log(frequency.map(([w, c])=> `${w}: ${c}`).join("\n"));

process.exit(0);
