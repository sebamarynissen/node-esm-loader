import create from 'create-esm-loader';
import lookup from './lookup.js';

const config = await lookup();
export const {
	resolve,
	getFormat,
	getSource,
	transformSource,
	load,
} = await create(config);
