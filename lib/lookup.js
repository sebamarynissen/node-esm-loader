// # lookup.js
// This function is responsible for automatically looking up the .loaderrc 
// file containing the loader configuration.
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import findUp from 'find-up';

// The supported config files we look for, in that order.
const CONFIG_FILES = [
	'.loaderrc.mjs',
	'.loaderrc.js',
];

// Finds and loads the configuration file based on the parameters the process 
// was run with.
export default async function lookup({ loaderConfig, cwd = process.cwd() }) {

	// Check if a loader was specified explicitly.
	if (!loaderConfig) loaderConfig = process.env.LOADER_CONFIG;
	let fullPath;
	if (loaderConfig) {
		fullPath = path.resolve(process.cwd(), loaderConfig);
	} else {
		fullPath = findConfig(cwd);
	}
	return fullPath ? await loadConfig(fullPath) : {};
}

// Once we have the path of the loader configuration we'll dynamically import 
// it.
export async function loadConfig(file) {
	let url = pathToFileURL(file).href;
	let module = await import(url);
	return module.default;
}

// This function looks for a `.loaderrc` file in case no loader configuration 
// was explicitly specified.
export function findConfig(cwd = process.cwd()) {
	return findUp.sync(CONFIG_FILES, { cwd });
}
