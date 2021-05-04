const IERC20 = artifacts.require("IERC20");
const CodingTest = artifacts.require("CodingTest");

module.exports = async (done) => {
  const [recipient, _] = await web3.eth.getAccounts();
  const usdt = await IERC20.at("0x13512979ade267ab5100878e2e0f485b568328a4");
  const aUSDT = await IERC20.at("0xff3c8bc103682fa918c954e84f5056ab4dd5189d");
  const usdtBalance = parseInt((await usdt.balanceOf(recipient)).toString());
  console.log("aUSDT balance before depositing usdt", parseInt((await aUSDT.balanceOf(recipient)).toString()) / 10 ** 6);
  const codingTest = await CodingTest.deployed();
  const _calledContract = "0xe0fba4fc209b4948668006b2be61711b7f465bae";
  const erc20Address = usdt.address;
  const onBehalfOf = recipient;
  const amount = 1000000; //10 usdt tokens
  const userAllowance = parseInt((await usdt.allowance(recipient, codingTest.address)).toString());
  if (userAllowance < amount) {
    //Do unlimited approval here
    console.log("Approving unlimited usdt");
    const totalSupply = await usdt.totalSupply();
    await usdt.approve(codingTest.address, totalSupply);
  }
  if (usdtBalance > amount) {
    console.log("Depositing 1 usdt to aave lending pool");
    await codingTest.deposit(_calledContract, erc20Address, onBehalfOf, amount);
    console.log("aUSDT balance After depositing usdt", parseInt((await aUSDT.balanceOf(recipient)).toString()) / 10 ** 6);
  } else {
    console.log("You don't have enough USDT");
  }
  done();
};
