#! /usr/bin/env node

import { IPackageJson } from "package-json-type";
import WordCount from "./WordCount";

const packageJsonPath = '../package.json';
const packageJson: IPackageJson = require(packageJsonPath);

const wordCount = new WordCount(process.argv, packageJson);
wordCount.execute();
