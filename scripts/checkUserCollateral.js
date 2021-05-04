const CodingTest = artifacts.require("CodingTest");
module.exports = async (done) => {
  const codingTest = await CodingTest.deployed();
  console.log("Check User collateral in eth");
  const collateralValueInEth = await codingTest.checkCollateralValueInEth();
  console.log(collateralValueInEth.toString());
  done();
};
