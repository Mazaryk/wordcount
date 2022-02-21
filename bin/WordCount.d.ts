import { Command } from "commander";
import { IPackageJson } from "package-json-type";
export default class WordCount {
    argv: string[];
    packageJson: IPackageJson;
    program: Command;
    sourceFilePath: string;
    constructor(argv: string[], packageJson: IPackageJson);
    parseArgs(): void;
    execute(): void;
}
