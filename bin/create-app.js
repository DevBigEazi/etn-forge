#!/usr/bin/env node

const { execSync } = require("child_process");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Helper function to execute commands
function execCommand(command, cwd) {
  try {
    execSync(command, { stdio: "inherit", cwd });
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to execute ${command}`), error);
    return false;
  }
}

// Recursive directory copy
async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src);

  for (let entry of entries) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    const stats = await stat(srcPath);

    if (stats.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

function displayBanner() {
  console.log(
    chalk.blue.bold(`
      ███████╗████████╗███╗   ██╗    ███████╗ ██████╗ ██████╗  ██████╗ ███████╗
      ██╔════╝╚══██╔══╝████╗  ██║    ██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
      █████╗     ██║   ██╔██╗ ██║    █████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
      ██╔══╝     ██║   ██║╚██╗██║    ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
      ███████╗   ██║   ██║ ╚████║    ██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
      ╚══════╝   ╚═╝   ╚═╝  ╚═══╝    ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝       
  `)
  );
  console.log(
    chalk.green.bold("  ETN-FORGE - The Electroneum DApp Scaffolding Tool\n")
  );
}

// Custom arrow key selector
function createSelector(question, choices) {
  return new Promise((resolve) => {
    let selectedIndex = 0;
    let isFirstRender = true;

    // Hide cursor and enable raw mode
    process.stdout.write("\x1B[?25l");
    process.stdin.setRawMode(true);
    process.stdin.resume();

    function render() {
      if (!isFirstRender) {
        // Clear previous output (move up and clear lines)
        for (let i = 0; i < choices.length + 1; i++) {
          process.stdout.write("\x1B[1A\x1B[2K");
        }
      }
      isFirstRender = false;

      // Display question
      console.log(chalk.blue.bold(`? ${question}`));

      // Display choices
      choices.forEach((choice, index) => {
        const prefix = index === selectedIndex ? chalk.cyan("❯ ") : "  ";
        const text =
          index === selectedIndex ? chalk.cyan(choice.name) : choice.name;
        console.log(prefix + text);
      });
    }

    function cleanup() {
      process.stdin.setRawMode(false);
      process.stdin.removeAllListeners("data");
      process.stdout.write("\x1B[?25h"); // Show cursor
    }

    function showResult() {
      // Clear the selection interface
      for (let i = 0; i < choices.length + 1; i++) {
        process.stdout.write("\x1B[1A\x1B[2K");
      }

      // Show the final selection
      console.log(
        chalk.blue.bold(`? ${question}`) +
          chalk.gray(` ${choices[selectedIndex].name}`)
      );
      console.log(); // Add spacing
    }

    // Initial render
    render();

    process.stdin.on("data", (key) => {
      const keyStr = key.toString();

      // Handle arrow keys
      if (keyStr === "\x1b[A" || keyStr === "\x1b[B") {
        // Up or Down arrow
        if (keyStr === "\x1b[A" && selectedIndex > 0) {
          // Up arrow
          selectedIndex--;
        } else if (keyStr === "\x1b[B" && selectedIndex < choices.length - 1) {
          // Down arrow
          selectedIndex++;
        }
        render();
      }
      // Handle Enter key
      else if (keyStr === "\r" || keyStr === "\n") {
        showResult();
        cleanup();
        resolve(choices[selectedIndex].value);
      }
      // Handle Ctrl+C
      else if (keyStr === "\x03") {
        cleanup();
        process.exit(0);
      }
    });
  });
}

async function main() {
  displayBanner();

  // Get project name
  const projectName = process.argv[2];
  if (!projectName) {
    console.log(chalk.red.bold("✖ Project name is required."));
    console.log(
      chalk.blue("Usage: npx create-electroneum-dapp <project-name>\n")
    );
    process.exit(1);
  }

  // Select language with arrow keys
  const language = await createSelector("Choose your language:", [
    {
      name: chalk.green("TypeScript (Recommended)"),
      value: "ts",
    },
    {
      name: chalk.yellow("JavaScript"),
      value: "js",
    },
  ]);

  // Select framework with arrow keys
  const framework = await createSelector("Choose your framework:", [
    {
      name: chalk.green("Next.js (Recommended)"),
      value: "next",
    },
    {
      name: chalk.yellow("React"),
      value: "react",
    },
  ]);

  // Select Ethereum development environment with arrow keys
  const ethEnv = await createSelector("Choose your Ethereum environment:", [
    {
      name: chalk.green("Hardhat (Recommended)"),
      value: "hardhat",
    },
    {
      name: chalk.yellow("Foundry"),
      value: "foundry",
    },
  ]);

  const template = `${framework}-${language}-${ethEnv}`;
  const templateName = `${
    framework === "next" ? "Next.js" : "React"
  } + ${language.toUpperCase()} + ${
    ethEnv.charAt(0).toUpperCase() + ethEnv.slice(1)
  }`;

  console.log(
    chalk.green.bold(
      `\n✨ Creating ${projectName} with ${templateName} template...\n`
    )
  );

  // Create project directory
  if (!fs.existsSync(projectName)) {
    fs.mkdirSync(projectName);
  } else {
    console.log(
      chalk.red.bold(
        `✖ Directory ${projectName} already exists. Please choose a different name.`
      )
    );
    process.exit(1);
  }

  // Copy template files
  try {
    const templatePath = path.join(__dirname, "../templates", template);
    await copyDir(templatePath, projectName);
    console.log(chalk.green("✓ Template files copied successfully"));
  } catch (err) {
    console.log(chalk.red.bold("✖ Failed to copy template files"), err);
    process.exit(1);
  }

  // Initialize git
  console.log(chalk.blue.bold("\n⚙ Initializing Git repository..."));
  if (execCommand("git init", projectName)) {
    execCommand("git add .", projectName);
    execCommand('git commit -m "Initial commit"', projectName);
    console.log(chalk.green("✓ Git repository initialized"));
  }

  // Install dependencies
  console.log(chalk.blue.bold("\n⚙ Installing dependencies..."));
  if (execCommand("npm install", projectName)) {
    console.log(chalk.green("✓ Dependencies installed successfully"));
  }

  // Success message
  console.log(
    chalk.green.bold(`
  ╔══════════════════════════════════════════╗
  ║                                          ║
  ║   ETN-DAPP created successfully!         ║
  ║                                          ║
  ╚══════════════════════════════════════════╝
  `)
  );

  // Next steps
  console.log(chalk.yellow.bold("\nNext steps:"));
  console.log(chalk.yellow(`  cd ${projectName}`));

  if (framework === "next") {
    console.log(
      chalk.yellow(`  npm run dev       # Start Next.js development server`)
    );
  } else {
    console.log(
      chalk.yellow(`  npm run dev       # Start Vite development server`)
    );
  }

  if (ethEnv === "hardhat") {
    console.log(chalk.yellow(`  npm run hardhat   # Start Hardhat node`));
  } else {
    console.log(chalk.yellow(`  npm run forge     # Start Foundry commands`));
  }

  console.log(chalk.blue.bold("\nHappy coding! 🚀\n"));
}

main().catch((err) => {
  console.error(chalk.red.bold("✖ Error creating project:"), err);
  process.exit(1);
});
