const CodingTest = artifacts.require("CodingTest");
const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");
module.exports = async function (deployer, network, accounts) {
  const lendingPoolAddress = "0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe";
  const instance = await deployProxy(CodingTest, [lendingPoolAddress], { deployer, initializer: 'initialize' });
  console.log("Deployed", instance.address);
};
