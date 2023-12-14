// # lookup-test.js
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { expect } from 'chai';
import { findConfig } from '../lib/lookup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('The lookup function', function() {

	function find(folder) {
		return findConfig(path.join(__dirname, folder));
	}

	it('finds the .loaderrc.js file in the same folder', async function() {

		let file = await find('project');
		expect(file).to.equal(path.join(__dirname, 'project/.loaderrc.js'));

	});

	it('finds the .loaderrc.js file in the upper folder', async function() {

		let file = await find('upper/sub');
		expect(file).to.equal(path.join(__dirname, 'upper/loader.config.js'));

	});

	it('supports .mjs files', async function() {

		let file = await find('mjs');
		expect(file).to.equal(path.join(__dirname, 'mjs/.loaderrc.mjs'));

	});

	it('supports .config folders', async function() {

		let file = await find('config-folder');
		expect(file).to.equal(path.join(__dirname, 'config-folder/.config/loaderrc.js'));

	});

});
