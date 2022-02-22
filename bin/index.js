#! /usr/bin/env node
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs = require("fs");
const packageJsonPath = '../package.json';
const packageJson = require(packageJsonPath);
const appName = ((_a = packageJson.name) === null || _a === void 0 ? void 0 : _a.split('/').pop()) || "(name missing)"; // drop scope, if any
const appDescription = packageJson.description || "(description missing)";
const appVersion = packageJson.version || "(version missing)";
//
// Define CLI Interface
//
commander_1.program
    .name(appName)
    .description(appDescription)
    .version(appVersion, '-v, --version')
    .option('-c, --case-sensitive', 'case-sensitive word compare', false)
    .argument('<file>', 'The file to parse');
commander_1.program.parse(process.argv);
//
// Set arg and flags
//
const sourceFilePath = commander_1.program.args[0];
const isCaseSensitive = commander_1.program.opts()['case-sensitive'];
//
// Validate source file
//
if (!fs.existsSync(sourceFilePath)) {
    console.error(`${sourceFilePath}: No such file`);
    process.exit(1);
}
if (!fs.lstatSync(sourceFilePath).isFile()) {
    console.error(`${sourceFilePath}: Does not appear to be a file`);
    process.exit(1);
}
//
// Parse input file
//
const dataRaw = fs.readFileSync(sourceFilePath).toString();
// Replace non word chars (keep - and _) with space
const dataNormalized = dataRaw.replace(/[^A-Za-z\-_]/g, ' ');
const data = isCaseSensitive ? dataNormalized : dataNormalized.toLowerCase();
// split into words filtering empty entries
const words = data.split(' ').filter((value) => value.length);
// count
const frequencyUnsorted = words.reduce((a, w) => {
    if (!a.has(w))
        a.set(w, 0);
    a.set(w, a.get(w) + 1);
    return a;
}, new Map());
// convert to array sorted alpha asc first then by count desc
const frequency = Array.from(frequencyUnsorted.entries())
    .sort(([wordA], [wordB]) => wordA.localeCompare(wordB))
    .sort(([, countA], [, countB]) => countB - countA);
// output the results
console.log(frequency.map(([w, c]) => `${w}: ${c}`).join("\n"));
process.exit(0);
//# sourceMappingURL=index.js.map