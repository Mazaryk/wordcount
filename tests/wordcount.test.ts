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
	const otherInputFilePath = inputFilePath.replace('1', '2');
	const inputFileContent = "one Two two Three three three four four four four";
	const expectedOutputCS = ["four: 4","three: 2", "one: 1", "Three: 1","two: 1","Two: 1", ""].join("\n"); // case sensitive
	const expectedOutputCI = ["four: 4","three: 3","two: 2","one: 1", ""].join("\n"); // case insensitive

	beforeEach(() => {
		fs.writeFileSync(inputFilePath, inputFileContent);
	})
	afterEach(() => {
		try { fs.unlinkSync(inputFilePath); } catch (err) {}
		try { fs.unlinkSync(otherInputFilePath); } catch (err) {}
	});

	it('should output the correct word count', () => {

		const { status, stdout } = execWordCount( [inputFilePath]);

		expect(status).toBe(0);

		expect(stdout.toString()).toBe(expectedOutputCI);

	});

	it('should output identical word count for files with same word frequency', () => {

		fs.writeFileSync(otherInputFilePath, inputFileContent.split(' ').sort(() => 0.5 - Math.random()).join(' '));

		const { status: status1, stdout: stdout1} = execWordCount( [inputFilePath]);
		const { status: status2, stdout: stdout2 } = execWordCount( [otherInputFilePath]);

		expect(status1).toBe(0);
		expect(status2).toBe(0);

		expect(stdout1.toString()).toBe(stdout2.toString());

	});

	it('should output case-insensitive counts when -c is flagged', () => {

		const { status, stdout } = execWordCount( ['-c', inputFilePath]);

		expect(status).toBe(0);

		expect(stdout.toString()).toBe(expectedOutputCS);

	})

})

