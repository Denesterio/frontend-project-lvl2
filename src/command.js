import { Command } from 'commander';
import gendiff from './gendiff.js';

const app = new Command();
app
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1>, <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => console.log(gendiff(filepath1, filepath2, app.opts().format)));

export default app;
