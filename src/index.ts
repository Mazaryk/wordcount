#! /usr/bin/env node

import { program } from 'commander';
import { IPackageJson } from 'package-json-type';

const packageJson: IPackageJson = require('../package.json');
const appName = packageJson.name?.split('/').pop() || "(name missing)"; // drop scope, if any
const appDescription = packageJson.description || "(description missing)";
const appVersion = packageJson.version || "(version missing)";

program
	.name(appName)
	.description(appDescription)
    .version(appVersion);

program.parse();
