// commands/generate.ts

import { Command } from 'commander';

export function generateCommandHandler() {
  const program = new Command();

  program
    .option('-n, --name <name>', 'Specify the name')
    .option('-d, --dir <dir>', 'Specify the output directory')
    .action((options) => {
      // Call your generate logic here using options.name and options.dir
      console.log(
        'Generate command executed with options:',
        options.name,
        options.dir,
      );
    });

  program.parse(process.argv);
}
