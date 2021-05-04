const IERC20 = artifacts.require("IERC20");
const CodingTest = artifacts.require("CodingTest");

module.exports = async (done) => {
  const [recipient, _] = await web3.eth.getAccounts();
  const usdt = await IERC20.at("0x13512979ade267ab5100878e2e0f485b568328a4");
  const aUSDT = await IERC20.at("0xff3c8bc103682fa918c954e84f5056ab4dd5189d");
  const ausdtBalance = parseInt((await aUSDT.balanceOf(recipient)).toString());
  console.log("usdt balance before withdrawing aUSDT", parseInt((await usdt.balanceOf(recipient)).toString()) / 10 ** 6);
  const codingTest = await CodingTest.deployed();
  const erc20Address = usdt.address;
  const amount = 1000000; //1 USDT
  const userAllowance = parseInt((await aUSDT.allowance(recipient, codingTest.address)).toString());
  if (userAllowance < amount) {
    //Do unlimited approval here
    console.log("Approving unlimited aUSDT");
    const totalSupply = await aUSDT.totalSupply();
    await aUSDT.approve(codingTest.address, totalSupply);
  }
  if (ausdtBalance > amount) {
    console.log("Withdrawing 1 usdt from lending pool");
    await codingTest.withdraw(erc20Address, amount);
    console.log("usdt balance After Withdrawing aUSDT", parseInt((await usdt.balanceOf(recipient)).toString()) / 10 ** 6);
  } else {
    console.log("You don't have enough USDT in lending pool");
  }
  done();
};
