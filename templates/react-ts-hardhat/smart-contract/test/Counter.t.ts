import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Counter", function () {
  // Fixture to deploy the contract
  async function deployCounterFixture() {
    // Get signers
    const [owner, otherAccount] = await hre.ethers.getSigners();

    // Deploy the contract
    const SimpleCounter = await hre.ethers.getContractFactory("Counter");
    const counter = await SimpleCounter.deploy();

    return { counter, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { counter, owner } = await loadFixture(deployCounterFixture);
      expect(await counter.owner()).to.equal(owner.address);
    });

    it("Should initialize count to 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      expect(await counter.count()).to.equal(0);
      expect(await counter.getCount()).to.equal(0);
    });
  });

  describe("Increment", function () {
    it("Should increment count by 1", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      await counter.increment();
      expect(await counter.count()).to.equal(1);
      
      await counter.increment();
      expect(await counter.count()).to.equal(2);
    });

    it("Should emit CountChanged event", async function () {
      const { counter, owner } = await loadFixture(deployCounterFixture);
      
      await expect(counter.increment())
        .to.emit(counter, "CountChanged")
        .withArgs(1, owner.address);
    });

    it("Should allow any account to increment", async function () {
      const { counter, otherAccount } = await loadFixture(deployCounterFixture);
      
      await expect(counter.connect(otherAccount).increment())
        .to.emit(counter, "CountChanged")
        .withArgs(1, otherAccount.address);
    });
  });

  describe("Decrement", function () {
    it("Should decrement count by 1", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      // First increment to have something to decrement
      await counter.increment();
      await counter.increment();
      expect(await counter.count()).to.equal(2);
      
      await counter.decrement();
      expect(await counter.count()).to.equal(1);
    });

    it("Should emit CountChanged event", async function () {
      const { counter, owner } = await loadFixture(deployCounterFixture);
      
      await counter.increment(); // Set to 1
      
      await expect(counter.decrement())
        .to.emit(counter, "CountChanged")
        .withArgs(0, owner.address);
    });

    it("Should allow any account to decrement", async function () {
      const { counter, otherAccount } = await loadFixture(deployCounterFixture);
      
      await counter.increment(); // Set to 1
      
      await expect(counter.connect(otherAccount).decrement())
        .to.emit(counter, "CountChanged")
        .withArgs(0, otherAccount.address);
    });
  });

  describe("Reset", function () {
    it("Should reset count to 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      // Increment a few times
      await counter.increment();
      await counter.increment();
      await counter.increment();
      expect(await counter.count()).to.equal(3);
      
      // Reset
      await counter.reset();
      expect(await counter.count()).to.equal(0);
    });

    it("Should emit CountChanged event", async function () {
      const { counter, owner } = await loadFixture(deployCounterFixture);
      
      await counter.increment(); // Set to 1
      
      await expect(counter.reset())
        .to.emit(counter, "CountChanged")
        .withArgs(0, owner.address);
    });

    it("Should work even when count is already 0", async function () {
      const { counter, owner } = await loadFixture(deployCounterFixture);
      
      await expect(counter.reset())
        .to.emit(counter, "CountChanged")
        .withArgs(0, owner.address);
    });
  });

  describe("GetCount", function () {
    it("Should return the current count", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      expect(await counter.getCount()).to.equal(0);
      
      await counter.increment();
      expect(await counter.getCount()).to.equal(1);
      
      await counter.increment();
      expect(await counter.getCount()).to.equal(2);
      
      await counter.decrement();
      expect(await counter.getCount()).to.equal(1);
    });
  });
});