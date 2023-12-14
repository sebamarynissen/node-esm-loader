import cp from 'node:child_process';
import semver from 'semver';

export default function run(file, args = [], opts = {}) {
	const child = cp.fork(file, args, {
		execArgv: [
			'--import=node-esm-loader/register',
		],
		...opts,
	})
	return new Promise((resolve, reject) => {
		child.on('exit', code => {
			if (code) {
				reject(new Error(`Error code ${code}`));
			} else {
				resolve(code);
			}
		});
	});
};
