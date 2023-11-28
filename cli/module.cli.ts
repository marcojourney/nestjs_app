import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';

// Import your entity and service creation functions here
// import { createEntity } from './entity.cli';

const argv = yargs
  .usage('Usage: node generate -n <moduleName>')
  .demandOption(['n'], 'Please provide both -n options')
  .alias('n', 'moduleName').argv;

const moduleName: string = argv['moduleName'];

const configPath = path.join(`${__dirname}/..`, 'config.cli.json');

fs.readFile(configPath, { encoding: 'utf8' }, (error, data) => {
  if (error) {
    console.error(`Error reading configuration file: ${error}`);
  }

  try {
    const config = JSON.parse(data);
    const templatePath = 'templates';
    const basePath = config.basePath;
    const modulePath = `${basePath}/${moduleName}`;
    const moduleDirectories = config?.directories || [];

    //check and create base path of module
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }

    //create all nested directory in module
    moduleDirectories.forEach((directory: any) => {
      //directory inside module such as common, service, repository etc.
      let directoryName: string;
      let entryFileName: string;
      let templateName: string;
      let fileNameToCreate: string;

      if (typeof directory == 'string') {
        directoryName = directory;
        templateName = directory;
        fileNameToCreate = `${moduleName.toLocaleLowerCase()}.${directoryName}.ts`;
      } else {
        directoryName = directory.name;
        entryFileName = directory?.entryFile;
        templateName = directory.file;
        fileNameToCreate = `${moduleName.toLocaleLowerCase()}.${
          directory.file
        }.ts`;
      }

      const subDirOfModule = `${modulePath}/${directoryName}`;
      if (!fs.existsSync(subDirOfModule)) {
        fs.mkdirSync(subDirOfModule, { recursive: true });

        // Absolute path link to template file of cli
        const templateFile = `${__dirname}/${templatePath}/${templateName}.template.txt`;

        if (fs.existsSync(templateFile)) {
          let content = fs.readFileSync(templateFile, 'utf-8');

          // Use module name as prefix of class name
          const className = moduleName;
          const entityName = moduleName;

          const prefixRepMethodName = entityName;
          const repMethodName = `${prefixRepMethodName}RepositoryMethods`;

          content = content.replace(/{name}/g, className);
          content = content.replace(/{entity}/g, entityName);
          content = content.replace(/{repMethodName}/g, repMethodName);

          const serviceContent = content;
          fs.writeFileSync(
            `${subDirOfModule}/${fileNameToCreate}`,
            serviceContent,
          );

          // Check if index file is defined to create from config.cli.json
          if (entryFileName) {
            console.log('try to create entry file');
            fs.writeFileSync(
              `${subDirOfModule}/index.ts`,
              `
              export * from './${className}.${templateName}';\n
            `,
            );
          }
        }
      }
    });
  } catch (parseError) {
    console.error(`Error parsing configuration file: ${parseError}`);
  }
});

// const outputDirectory = `${BASE_PATH}/${argv['outputDirectory']}`;

// const templatePath = path.join(__dirname, 'templates/entity.template.txt');
// const templateContent = fs.readFileSync(templatePath, 'utf-8');

// const entityContent = templateContent.replace(/{name}/g, moduleName);

// const outputPath = path.join(outputDirectory, `${moduleName}.ts`);
// fs.writeFileSync(outputPath, entityContent);

// console.log(`Module ${moduleName} created at ${outputPath}`);
