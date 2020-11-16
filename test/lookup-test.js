// # lookup-test.js
import { fileURLToPath } from 'url';
import path from 'path';
import chai from 'chai';
import { findConfig } from '../lib/lookup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { expect } = chai;

describe('The lookup function', function() {

	it('finds the .loaderrc.js file in the same folder', async function() {

		let file = await findConfig(__dirname);
		expect(file).to.equal(path.join(__dirname, '.loaderrc.js'));

	});

	it('find the .loaderrc.js file in the upper folder', async function() {

		let file = await findConfig(path.join(__dirname, 'sub'));
		expect(file).to.equal(path.join(__dirname, '.loaderrc.js'));

	});

	it('prioritzes .mjs over .js', async function() {

		let file = await findConfig(path.join(__dirname, 'priority'));
		expect(file).to.equal(path.join(__dirname, 'priority/.loaderrc.mjs'));

	});

});
