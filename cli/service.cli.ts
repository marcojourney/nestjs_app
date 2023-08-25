import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';

const argv = yargs
  .usage('Usage: node generate -n <serviceName> -d <outputDirectory>')
  .demandOption(['n', 'd'], 'Please provide both -n and -d options')
  .alias('n', 'serviceName')
  .alias('d', 'outputDirectory').argv;

const BASE_PATH = 'src';
const serviceName = argv['serviceName'];
const outputDirectory = `${BASE_PATH}/${argv['outputDirectory']}`;

const templatePath = path.join(__dirname, 'templates/service.template.txt');
const templateContent = fs.readFileSync(templatePath, 'utf-8');

const serviceContent = templateContent.replace(/{name}/g, serviceName);

const outputPath = path.join(outputDirectory, `${serviceName}Service.ts`);
fs.writeFileSync(outputPath, serviceContent);

console.log(`Service ${serviceName} created at ${outputPath}`);
