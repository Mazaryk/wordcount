"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
class WordCount {
    constructor(argv, packageJson) {
        var _a;
        const appName = ((_a = packageJson.name) === null || _a === void 0 ? void 0 : _a.split('/').pop()) || "(name missing)"; // drop scope, if any
        const appDescription = packageJson.description || "(description missing)";
        const appVersion = packageJson.version || "(version missing)";
        commander_1.program
            .name(appName)
            .description(appDescription)
            .version(appVersion);
        commander_1.program.parse(argv);
    }
    execute() {
        // TODO - implement
    }
}
exports.default = WordCount;
