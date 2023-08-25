import * as yargs from 'yargs';

yargs
  .usage('Usage: node generate -n <entityName> -d <outputDirectory>')
  .demandOption(['n', 'd'], 'Please provide both -n and -d options')
  .alias('n', 'entityName')
  .alias('d', 'outputDirectory').argv;
