import { program } from "commander";
import { IPackageJson } from "package-json-type";

export default class WordCount {

	constructor(argv: string[], packageJson: IPackageJson) {

		const appName = packageJson.name?.split('/').pop() || "(name missing)"; // drop scope, if any
		const appDescription = packageJson.description || "(description missing)";
		const appVersion = packageJson.version || "(version missing)";

		program
			.name(appName)
			.description(appDescription)
			.version(appVersion);

		program.parse(argv);

	}

	public execute() {
		// TODO - implement
	}
}
