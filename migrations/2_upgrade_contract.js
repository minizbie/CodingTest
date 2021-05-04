const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const CodingTest = artifacts.require("CodingTest");
const CodingTestV2 = artifacts.require("CodingTestV2");
module.exports = async function (_deployer) {
  // Use deployer to state migration tasks.
  const existing = await CodingTest.deployed();
  console.log(existing.address);
  const instance = await upgradeProxy(existing.address, CodingTestV2, { _deployer });
  console.log("Upgraded", instance.address);
};
