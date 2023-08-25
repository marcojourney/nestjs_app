import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';

const argv = yargs
  .usage('Usage: node generate -n <entityName> -d <outputDirectory>')
  .demandOption(['n', 'd'], 'Please provide both -n and -d options')
  .alias('n', 'entityName')
  .alias('d', 'outputDirectory').argv;

const BASE_PATH = 'src';
const entityName = argv['entityName'];
const outputDirectory = `${BASE_PATH}/${argv['outputDirectory']}`;

const templatePath = path.join(__dirname, 'templates/entity.template.txt');
const templateContent = fs.readFileSync(templatePath, 'utf-8');

const entityContent = templateContent.replace(/{name}/g, entityName);

const outputPath = path.join(outputDirectory, `${entityName}.ts`);
fs.writeFileSync(outputPath, entityContent);

console.log(`Entity ${entityName} created at ${outputPath}`);
