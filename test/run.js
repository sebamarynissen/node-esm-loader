import cp from 'node:child_process';

export default function run(file, args = [], opts = {}) {
	let mem = [];
	let child = cp.spawn('node', [
		'--experimental-loader=node-esm-loader',
		'--no-warnings',
		file,
		...args,
	], opts);
	child.stderr.pipe(process.stderr);
	child.stdout.pipe(process.stdout);
	return new Promise((resolve, reject) => {
		child.on('exit', code => {
			if (code) {
				reject(new Error({ message: `Error code ${code}`}));
			} else {
				resolve(code);
			}
		});
	});
};
