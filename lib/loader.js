import create from 'create-esm-loader';
import lookup from './lookup.js';

// See #5. We now create the hooks just in time in the initialize hook so that 
// the main process can inject a loader config.
let hooks;
export async function initialize(opts = {}) {
	let config = await lookup(opts);
	hooks = await create(config);
}

// See #5. The loader doesn't wait for the initialize hook to have finished, 
// which means the resolve and load hooks are used *immediately*. This means 
// that if the hooks haven't fully loaded yet, we just use Node's default 
// resolution & load hooks.
export async function resolve(specifier, ctx, nextResolve) {
	if (hooks) {
		return hooks.resolve(specifier, ctx, nextResolve);
	}
	return nextResolve(specifier);
}
export async function load(specifier, ctx, nextLoad) {
	if (hooks) {
		return hooks.load(specifier, ctx, nextLoad);
	}
	return nextLoad(specifier);
}
