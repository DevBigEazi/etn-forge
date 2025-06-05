const { ethers } = require("hardhat");

async function main() {
  const counter = await ethers.deployContract("Counter");

  await counter.waitForDeployment();

  console.log({
    "Counter contract successfully deployed to": counter.target,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});