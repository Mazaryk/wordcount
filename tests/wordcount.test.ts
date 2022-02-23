import { spawnSync, SpawnSyncReturns } from "child_process";
import * as fs from 'fs';

const execWordCount = ( argv: string[] ): SpawnSyncReturns<Buffer> => spawnSync('node', ['bin/index.js'].concat(argv));

describe('source file is required', () => {

	it('missing file argument should exit with 1 and show error message', () => {

		const { status, stderr } = execWordCount([]); // no file

		expect(status).toBe(1);

		expect(stderr.toString()).not.toBe("");

	});

	it('bad file argument should exit with 1 and show error message', () => {

		const { status, stderr } = execWordCount(['foo.txt']); // file doesn't exist

		expect(status).toBe(1);

		expect(stderr.toString()).not.toBe("");

	});

	it('file is a directory should exit with 1 and show error message', () => {

		const { status, stderr } = execWordCount(['~']); // directory

		expect(status).toBe(1);

		expect(stderr.toString()).not.toBe("");

	});

});

describe('options', () => {

	it('--help should exit with 0', () => {

		const { status } = execWordCount( ['--help']);

		expect(status).toBe(0);

	});

	it('--help should output to stdout', () => {

		const { stdout } = execWordCount( ['--help']);

		expect(stdout.toString()).not.toBe("");

	});

	it('--version should exit with 0', () => {

		const { status } = execWordCount( ['--version']);

		expect(status).toBe(0);

	});

	it('--version should output to stdout', () => {

		const { stdout } = execWordCount( ['--version']);

		expect(stdout.toString()).not.toBe("");

	});

	it('-v should exit with 0', () => {

		const { status, stdout, stderr } = execWordCount( ['-v']);

		expect(status).toBe(0);

	});

	it('-v should output to stdout', () => {

		const { stdout } = execWordCount( ['-v']);

		expect(stdout.toString()).not.toBe("");

	});

	it('--no-such-option should exit with 1', () => {

		const { status, stdout, stderr } = execWordCount( ['--no-such-option']);

		expect(status).toBe(1);

	});

	it('--no-such-option should output to stderr', () => {

		const { stderr } = execWordCount( ['--no-such-option']);

		expect(stderr.toString()).not.toBe("");

	});

});

describe('output', () => {

	const inputFilePath = "tests/mock_data/test_input_1.txt";
	const inputFileContent = "one Two two Three three three four four four four";

	const expectedOutputCS = ["four: 4", "three: 2", "one: 1", "Three: 1", "two: 1", "Two: 1", ""].join("\n"); // case sensitive
	const expectedOutputCI = ["four: 4", "three: 3", "two: 2", "one: 1", ""].join("\n"); // case insensitive

	const shuffledInputFilePath = inputFilePath.replace('1', '2');

	const hyphenatedInputFilePath = inputFilePath.replace("1", "3");
	const hyphenatedInputFileContent = inputFileContent + " case-sensitive case-sensitive better-known";
	const expectedOutputHyphenated = ["four: 4", "three: 3", "case-sensitive: 2", "two: 2", "better-known: 1", "one: 1", ""].join("\n");

	beforeAll(() => {
		fs.writeFileSync(inputFilePath, inputFileContent);
		fs.writeFileSync(shuffledInputFilePath, inputFileContent.split(' ').sort(() => 0.5 - Math.random()).join(' '));
		fs.writeFileSync(hyphenatedInputFilePath, hyphenatedInputFileContent);

	})
	afterAll(() => {
		// The tests throw if an expect fails, we end up with dangling input files
		// clean up if any exist
		try { fs.unlinkSync(inputFilePath); } catch (err) {}
		try { fs.unlinkSync(shuffledInputFilePath); } catch (err) {}
		try { fs.unlinkSync(hyphenatedInputFilePath); } catch (err) {}
	});

	it('should output the correct word count', () => {

		const { status, stdout } = execWordCount( [inputFilePath]);

		expect(status).toBe(0);

		expect(stdout.toString()).toBe(expectedOutputCI);

	});

	it('should output identical word count for files with same word frequency', () => {


		const { status: status1, stdout: stdout1} = execWordCount( [inputFilePath]);
		const { status: status2, stdout: stdout2 } = execWordCount( [shuffledInputFilePath]);

		expect(status1).toBe(0);
		expect(status2).toBe(0);

		expect(stdout1.toString()).toBe(stdout2.toString());

	});

	it('should output case-sensitive counts when -c is flagged', () => {

		const { status, stdout } = execWordCount( ['-c', inputFilePath]);

		expect(status).toBe(0);

		expect(stdout.toString()).toBe(expectedOutputCS);

	});

	it('should output case-sensitive counts when --case-sensitive is flagged', () => {

		const { status, stdout } = execWordCount( ['--case-sensitive', inputFilePath]);

		expect(status).toBe(0);

		expect(stdout.toString()).toBe(expectedOutputCS);

	});

	it('should not breakup hyphenated words', () => {

		const { status, stdout } = execWordCount( [hyphenatedInputFilePath]);

		expect(status).toBe(0);

		expect(stdout.toString()).toBe(expectedOutputHyphenated);

	});

});
