import { register } from 'node:module';
import { loaderConfig } from './parse-argv.js';

// Register.
register('./loader.js', import.meta.url, {
	data: {
		loaderConfig,
	},
});
