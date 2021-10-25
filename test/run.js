import cp from 'node:child_process';

export default function run(file, args = [], opts = {}) {
	const child = cp.fork(file, args, {
		execArgv: [
			`--experimental-loader=node-esm-loader`,
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
