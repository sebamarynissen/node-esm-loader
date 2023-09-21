import { register } from 'node:module';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// On Node 20 the arguments are no longer passed to the loader thread, but 
// environment variables are, so if a file was specified, we transfer it using 
// the LOADER_CONFIG environment variable.
const parsed = yargs(hideBin(process.argv)).help(false).version(false);
const config = parsed.argv['loader-config'];
if (config) {
	process.env.LOADER_CONFIG = config;
}

// Register.
register('./loader.js', import.meta.url);
