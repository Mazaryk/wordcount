#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WordCount_1 = require("./WordCount");
const packageJsonPath = '../package.json';
const packageJson = require(packageJsonPath);
const wordCount = new WordCount_1.default(process.argv, packageJson);
wordCount.execute();
//# sourceMappingURL=index.js.map