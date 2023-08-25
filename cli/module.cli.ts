import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';

const argv = yargs
  .usage('Usage: node generate -n <moduleName> -d <outputDirectory>')
  .demandOption(['n', 'd'], 'Please provide both -n and -d options')
  .alias('n', 'moduleName')
  .alias('d', 'outputDirectory').argv;

const BASE_PATH = 'src';
const moduleName = argv['moduleName'];
const outputDirectory = `${BASE_PATH}/${argv['outputDirectory']}`;

const templatePath = path.join(__dirname, 'templates/entity.template.txt');
const templateContent = fs.readFileSync(templatePath, 'utf-8');

const entityContent = templateContent.replace(/{name}/g, moduleName);

const outputPath = path.join(outputDirectory, `${moduleName}.ts`);
fs.writeFileSync(outputPath, entityContent);

console.log(`Module ${moduleName} created at ${outputPath}`);
