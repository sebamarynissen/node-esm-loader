import { fileURLToPath } from 'url';
import path from 'path';
import chai from 'chai';
import run from './run.js';
const { expect } = chai;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Using the module', function() {

	function dir(...args) {
		return path.resolve(__dirname, ...args);
	}

	beforeEach(function() {
		let test = this.currentTest;
		test.slow(1000);
	});

	it('uses the vue-esm-loader', async function() {

		let out = await run('./vue-test.js', [], {
			cwd: dir('vue'),
		});

	});

	it('uses an explicitly specified config file', async function() {

		let out = await run('./config-test.js', [
			'--loader-config=./loader-config.js',
		], {
			cwd: dir('config'),
		});

	});

});
