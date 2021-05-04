const IERC20 = artifacts.require("IERC20");
const CodingTest = artifacts.require("CodingTest");

module.exports = async (done) => {
  const [recipient, _] = await web3.eth.getAccounts();
  const dai = await IERC20.at("0xff795577d9ac8bd7d90ee22b6c1703490b6512fd");
  const aDai = await IERC20.at("0xdcf0af9e59c002fa3aa091a46196b37530fd48a8");
  console.log("Dai balance before withdrawing aDAI", (await dai.balanceOf(recipient)).toString());
  const codingTest = await CodingTest.deployed();
  const _calledContract = "0xe0fba4fc209b4948668006b2be61711b7f465bae";
  const erc20Address = dai.address;
  const to = recipient;
  const amount = web3.utils.toWei("1", "ether");
  const userAllowance = parseInt((await aDai.allowance(recipient, codingTest.address)).toString());
  if (userAllowance < amount) {
    //Do unlimited approval here
    console.log("Approving unlimited adai");
    const totalSupply = await aDai.totalSupply();
    await adai.approve(codingTest.address, totalSupply);
    console.log(parseInt((await aDai.allowance(recipient, codingTest.address)).toString()));
  }
  console.log("Withdrawing 1Dai from lending pool");
  await codingTest.withdraw(_calledContract, erc20Address, amount, to);
  console.log("Dai balance After Withdrawing aDAI", (await dai.balanceOf(recipient)).toString());
  done();
};
