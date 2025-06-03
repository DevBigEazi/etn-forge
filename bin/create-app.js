#!/usr/bin/env node
const { execSync } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function promptUser() {
  // 1. Ask for JavaScript or TypeScript
  const language = await askQuestion(
    'Choose language:\n1) JavaScript\n2) TypeScript\nEnter choice (1/2): ',
    ['1', '2']
  );

  // 2. Show framework options based on language choice
  const isTypeScript = language === '2';
  const framework = await askQuestion(
    `Choose framework:\n${isTypeScript ? 
      '1) Next.js + TypeScript + Hardhat\n' +
      '2) React + TypeScript + Hardhat\n' +
      '3) Next.js + TypeScript + Foundry\n' +
      '4) React + TypeScript + Foundry\n' :
      '1) Next.js + JavaScript + Hardhat\n' +
      '2) React + JavaScript + Hardhat\n' +
      '3) Next.js + JavaScript + Foundry\n' +
      '4) React + JavaScript + Foundry\n'}Enter choice (1-4): `,
    ['1', '2', '3', '4']
  );

  return {
    isTypeScript,
    template: [
      `next-${isTypeScript ? 'ts' : 'js'}-hardhat`,
      `react-${isTypeScript ? 'ts' : 'js'}-hardhat`,
      `next-${isTypeScript ? 'ts' : 'js'}-foundry`,
      `react-${isTypeScript ? 'ts' : 'js'}-foundry`
    ][parseInt(framework) - 1]
  };
}

function askQuestion(question, validChoices) {
  return new Promise((resolve) => {
    rl.question(chalk.blue(question), (answer) => {
      if (!validChoices.includes(answer)) {
        console.log(chalk.red(`Invalid choice. Please enter one of: ${validChoices.join(', ')}`));
        process.exit(1);
      }
      resolve(answer);
    });
  });
}

async function main() {
  const projectName = process.argv[2];
  if (!projectName) {
    console.log(chalk.red('Project name is required.'));
    process.exit(1);
  }

  const { template } = await promptUser();
  console.log(chalk.green(`\nCreating ${projectName} with ${template} template...`));

  // Rest of your existing template creation logic...
  // For example:
  const templatePath = path.join(__dirname, `../templates/${template}`);
  if (!fs.existsSync(templatePath)) {
    console.log(chalk.red(`Template ${template} not found!`));
    process.exit(1);
  }

  // Create project directory and copy files...
  console.log(chalk.green(`\nSuccess! Created ${projectName} with ${template} template 🎉`));
  console.log(chalk.yellow(`\nNext steps:
  cd ${projectName}
  npm install
  npm run dev`));

  rl.close();
}

main().catch(err => {
  console.error(chalk.red('Error creating project:'), err);
  process.exit(1);
});