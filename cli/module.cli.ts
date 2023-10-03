import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';
import { capitalizeString } from './help';
// import { hideBin } from 'yargs/helpers';

// Import your entity and service creation functions here
// import { createEntity } from './entity.cli';

const argv = yargs
  .usage('Usage: node generate -n <moduleName>')
  .demandOption(['n'], 'Please provide both -n options')
  .alias('n', 'moduleName').argv;

const moduleName = argv['moduleName'];

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
    moduleDirectories.forEach((directory) => {
      //directory inside module such as common, service, repository etc.
      const subDirOfModule = `${modulePath}/${directory}`;
      if (!fs.existsSync(subDirOfModule)) {
        fs.mkdirSync(subDirOfModule, { recursive: true });

        // Absolute path link to template file of cli
        const templateName = directory;
        const templateFile = `${__dirname}/${templatePath}/${templateName}.template.txt`;

        if (fs.existsSync(templateFile)) {
          const content = fs.readFileSync(templateFile, 'utf-8');

          const className = moduleName;
          const serviceContent = content.replace(/{name}/g, className);

          const typeOfClass = subDirOfModule;
          const fileName = `${capitalizeString(className)}${capitalizeString(
            typeOfClass,
          )}.ts`;
          const pathFile = `${modulePath}/${fileName}`;
          console.log('dddd:', pathFile);
          // fs.writeFileSync(pathFile, serviceContent);
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
