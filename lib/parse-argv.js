// # parse-args.js
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const parsed = yargs(hideBin(process.argv)).help(false).version(false);
export const { loaderConfig } = parsed.argv;
