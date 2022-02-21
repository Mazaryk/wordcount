import { program, Command } from "commander";
import { IPackageJson } from "package-json-type";

export default class WordCount {

	argv: string[];
	packageJson: IPackageJson;

	program: Command;

	sourceFilePath = "";

	constructor(argv: string[], packageJson: IPackageJson) {
		this.argv = argv;
		this.packageJson = packageJson;
		this.program = program;
	}

	public parseArgs() {

		const appName = this.packageJson.name?.split('/').pop() || "(name missing)"; // drop scope, if any
		const appDescription = this.packageJson.description || "(description missing)";
		const appVersion = this.packageJson.version || "(version missing)";

		this.program
			.name(appName)
			.description(appDescription)
			.version(appVersion)
			.argument('<file>', 'The file to parse').action((arg) => this.sourceFilePath = arg);

		this.program.parse(this.argv);

		const options = this.program.opts();

		console.log(JSON.stringify(options));

		// TODO - setup tests
		//      - --version returns 0 exit code
		//      - class interface tests
	}

	public execute() {
		this.parseArgs();

		// TODO - implement
	}
}
