"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
class WordCount {
    constructor(argv, packageJson) {
        this.sourceFilePath = "";
        this.argv = argv;
        this.packageJson = packageJson;
        this.program = commander_1.program;
    }
    parseArgs() {
        var _a;
        const appName = ((_a = this.packageJson.name) === null || _a === void 0 ? void 0 : _a.split('/').pop()) || "(name missing)"; // drop scope, if any
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
    execute() {
        this.parseArgs();
        // TODO - implement
    }
}
exports.default = WordCount;
