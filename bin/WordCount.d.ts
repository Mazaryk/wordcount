import { IPackageJson } from "package-json-type";
export default class WordCount {
    constructor(argv: string[], packageJson: IPackageJson);
    execute(): void;
}
