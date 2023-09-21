import cp from 'node:child_process';
import semver from 'semver';

export default function run(file, args = [], opts = {}) {
	let flag = (
		semver.satisfies(process.version, '>=20.6') ?
		'--import=node-esm-loader/register' :
		'--experimental-loader=node-esm-loader'
	);
	const child = cp.fork(file, args, {
		execArgv: [
			flag,
			'--no-warnings',
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
