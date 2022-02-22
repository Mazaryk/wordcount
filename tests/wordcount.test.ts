import { spawnSync, SpawnSyncReturns } from "child_process";
import * as fs from 'fs';

const execWordCount = ( argv: string[] ): SpawnSyncReturns<Buffer> => spawnSync('node', ['bin/index.js'].concat(argv));

describe('source file is required', () => {

	it('should exit with 1 and show error message if missing file argument', () => {

		const { status, stderr } = execWordCount([]); // no file

		expect(status).toBe(1);

		expect(stderr.toString()).not.toBe("");

	});

	it('should exit with 1 and show error message if bad file argument', () => {

		const { status, stderr } = execWordCount(['foo.txt']); // file doesn't exist

		expect(status).toBe(1);

		expect(stderr.toString()).not.toBe("");

	});

});

describe('options', () => {

	it('--help should exit with 0', () => {

		const { status } = execWordCount( ['--help']);

		expect(status).toBe(0);

	});

	it('--version should exit with 0', () => {

		const { status } = execWordCount( ['--version']);

		expect(status).toBe(0);

	});

	it('-v should exit with 0', () => {

		const { status, stdout, stderr } = execWordCount( ['-v']);

		expect(status).toBe(0);

	});

});

describe('output', () => {

	const inputFilePath = "test_input_1.txt";
	const otherInputFilePath = inputFilePath.replace('.txt', '2.txt');
	const inputFileContent = "one two two three three three four four four four";
	const expectedOutput = "four: 4\nthree: 3\ntwo: 2\none: 1\n";

	afterEach(() => {
		fs.unlinkSync(inputFilePath);
		fs.unlinkSync(otherInputFilePath);
	});

	it('should output the correct word count', () => {

		fs.writeFileSync(inputFilePath, inputFileContent);

		const { status, stdout } = execWordCount( [inputFilePath]);

		expect(status).toBe(0);

		expect(stdout.toString()).toBe(expectedOutput);

	});
	it('should output identical word count for files with same word frequency', () => {


		fs.writeFileSync(inputFilePath, inputFileContent);
		fs.writeFileSync(otherInputFilePath, inputFileContent.split(' ').sort(() => 0.5 - Math.random()).join(' '));

		const { status: status1, stdout: stdout1} = execWordCount( [inputFilePath]);
		const { status: status2, stdout: stdout2 } = execWordCount( [otherInputFilePath]);

		expect(status1).toBe(0);
		expect(status2).toBe(0);

		expect(stdout1.toString()).toBe(status2.toString());

	});


})

