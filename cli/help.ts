// import * as yargs from 'yargs';

// yargs
//   .usage('Usage: node generate -n <entityName> -d <outputDirectory>')
//   .demandOption(['n', 'd'], 'Please provide both -n and -d options')
//   .alias('n', 'entityName')
//   .alias('d', 'outputDirectory').argv;

export function capitalizeString(input: string): string {
  // Check if the input string is not empty
  if (input.length === 0) {
    return input; // Return the input string as is
  }

  // Capitalize the first letter and concatenate the rest of the string
  return input.charAt(0).toUpperCase() + input.slice(1);
}
