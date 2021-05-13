const CodingTestV2 = artifacts.require("CodingTestV2");
const CodingTest = artifacts.require("CodingTest");

module.exports = async () => {
  const codingTest = await CodingTest.deployed();
  const codingTestV2 = await CodingTestV2.deployed();
  if (codingTest.address == codingTestV2.address) {
    console.log("contract is upgraded");
    console.log(await codingTestV2.greet());
  } else {
    console.log("Contract didn't updated yet");
  }
  // done();
};
