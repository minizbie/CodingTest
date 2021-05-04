const CodingTest = artifacts.require("CodingTest");
const SweepFunds = artifacts.require("SweepFunds");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(CodingTest);
  //await deployer.deploy(SweepFunds, accounts[0]);
};
