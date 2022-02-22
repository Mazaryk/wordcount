
import { spawnSync, SpawnSyncReturns } from "child_process";

const execWordCount = ( argv: string[] ): SpawnSyncReturns<Buffer> => spawnSync('node', ['bin/index.js'].concat(argv));

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

		const { status } = execWordCount( ['-v']);

		expect(status).toBe(0);

	});



});

