const CodingTest = artifacts.require("CodingTest");
module.exports = async (done) => {
  console.log(recipient);
  const [recipient, _] = await web3.eth.getAccounts();
  const codingTest = await CodingTest.deployed();
  const _calledContract = "0xe0fba4fc209b4948668006b2be61711b7f465bae";
  const userData = await codingTest.getUserAccountData(_calledContract, recipient);
  console.log(userData);
  done();
};
