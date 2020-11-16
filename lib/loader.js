import create from 'create-esm-loader';
import lookup from './lookup.js';

const config = await lookup();
const loader = create(config);
const { resolve, getFormat, getSource, transformSource } = loader;
export { resolve, getFormat, getSource, transformSource };
