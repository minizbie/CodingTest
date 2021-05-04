const CodingTest = artifacts.require("CodingTest");
module.exports = async (done) => {
  const [recipient, _] = await web3.eth.getAccounts();
  const codingTest = await CodingTest.deployed();
  const _calledContract = "0xe0fba4fc209b4948668006b2be61711b7f465bae"; //AAVE lending pool contract address
  console.log("Check User collateral in eth");
  const userData = await codingTest.getUserAccountData(_calledContract, recipient);
  console.log(userData["totalCollateralETH"].toString());
  done();
};
