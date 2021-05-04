const CodingTest = artifacts.require("CodingTest");
const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");
module.exports = async function (deployer, network, accounts) {
  const instance = await deployProxy(CodingTest, { deployer });
  console.log("Deployed", instance.address);
};
