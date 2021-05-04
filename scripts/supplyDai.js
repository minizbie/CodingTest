const IERC20 = artifacts.require("IERC20");
const CodingTest = artifacts.require("CodingTest");

module.exports = async (done) => {
  const [recipient, _] = await web3.eth.getAccounts();
  const dai = await IERC20.at("0xff795577d9ac8bd7d90ee22b6c1703490b6512fd");
  const aDai = await IERC20.at("0xdcf0af9e59c002fa3aa091a46196b37530fd48a8");
  console.log("aDai balance before depositing dai", (await aDai.balanceOf(recipient)).toString());
  const codingTest = await CodingTest.deployed();
  const _calledContract = "0xe0fba4fc209b4948668006b2be61711b7f465bae";
  const erc20Address = dai.address;
  const onBehalfOf = recipient;
  const amount = web3.utils.toWei("10", "ether"); //10 DAI tokens
  const userAllowance = parseInt((await dai.allowance(recipient, codingTest.address)).toString());
  console.log(userAllowance);
  if (userAllowance < amount) {
    //Do unlimited approval here
    console.log("Approving unlimited dai");
    const totalSupply = await dai.totalSupply();
    await dai.approve(codingTest.address, totalSupply);
  }
  console.log("Depositing 10 DAI to aave lending pool");
  await codingTest.deposit(_calledContract, erc20Address, onBehalfOf, amount);
  console.log("aDai balance After depositing dai", (await aDai.balanceOf(recipient)).toString());
  done();
};
