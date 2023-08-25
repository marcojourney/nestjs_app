import { Command } from 'commander';

// Import your command handlers
import { generateCommandHandler } from './generate';

// Define the CLI
const program = new Command();

program
  .version('1.0.0')
  .description('My CLI Tool')
  .command('generate')
  .description('Generate something')
  .action(generateCommandHandler);

// Add more commands here...

// Display help if no command is provided
if (!process.argv.slice(2).length) {
  program.help();
}

// Parse the command-line arguments
program.parse(process.argv);
