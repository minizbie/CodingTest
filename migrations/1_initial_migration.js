const CodingTest = artifacts.require("CodingTest");
const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");
module.exports = async function (deployer, network, accounts) {
  const lendingPoolAddress = "0xe0fba4fc209b4948668006b2be61711b7f465bae";
  const instance = await deployProxy(CodingTest, [lendingPoolAddress], { deployer });
  console.log("Deployed", instance.address);
};
