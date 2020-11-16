export default {
	transform(source, ctx) {
		if (ctx.url.endsWith('foo.js')) {
			return {
				source: `export default ${JSON.stringify(String(source))}`,
			};
		}
	},
};
