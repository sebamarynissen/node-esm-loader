// # lookup.js
// This function is responsible for automatically looking up the .loaderrc 
// file containing the loader configuration.
import { pathToFileURL } from 'url';
import findUp from 'find-up';

// The supported config files we look for, in that order.
const CONFIG_FILES = [
	'.loaderrc.mjs',
	'.loaderrc.js',
];

// Looks up the .loaderrc configuration file and dynamically imports it.
export default async function lookup(cwd = process.cwd()) {
	let path = findConfig(cwd);
	if (!path) {
		return {};
	}
	let url = pathToFileURL(path).href;
	let module = await import(url);
	return module.default;
}

export function findConfig(cwd = process.cwd()) {
	return findUp.sync(CONFIG_FILES, { cwd });
}
