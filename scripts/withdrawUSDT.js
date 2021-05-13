const IERC20 = artifacts.require("IERC20");
const CodingTest = artifacts.require("CodingTest");

module.exports = async (done) => {
  const [recipient, _] = await web3.eth.getAccounts();
  const usdt = await IERC20.at("0x13512979ADE267AB5100878E2e0f485B568328a4");
  const aUSDT = await IERC20.at("0xFF3c8bc103682FA918c954E84F5056aB4DD5189d");
  const codingTest = await CodingTest.deployed();
  
  let usdtBalance = parseInt(await usdt.balanceOf(recipient));
  let aUSDTBalance = parseInt(await aUSDT.balanceOf(recipient));
  let usdtAllowance = parseInt(await usdt.allowance(recipient, codingTest.address));
  let ausdtAllowance = parseInt(await aUSDT.allowance(recipient, codingTest.address));
  console.log("Before withdrawal:")
  console.log("USDT  :", usdtBalance / 10 ** 6, "(balance)", usdtAllowance / 10 ** 6, "(allowance)");
  console.log("aUSDT :", aUSDTBalance / 10 ** 6, "(balance)", ausdtAllowance / 10 ** 6, "(allowance)");

  const withdrawalAmount = 1e6;     //1 USDT
  const userAllowance = parseInt((await aUSDT.allowance(recipient, codingTest.address)).toString());
  if (userAllowance < withdrawalAmount) {
    await aUSDT.approve(codingTest.address, withdrawalAmount);    
  }

  console.log("Withdrawing ", withdrawalAmount / 10**6, " usdt from lending pool");
  await codingTest.withdraw(usdt.address, withdrawalAmount);

  usdtBalance = parseInt(await usdt.balanceOf(recipient));
  aUSDTBalance = parseInt(await aUSDT.balanceOf(recipient));
  usdtAllowance = parseInt(await usdt.allowance(recipient, codingTest.address));
  ausdtAllowance = parseInt(await aUSDT.allowance(recipient, codingTest.address));
  console.log("After withdrawal:")
  console.log("USDT  :", usdtBalance / 10 ** 6, "(balance)", usdtAllowance / 10 ** 6, "(allowance)");
  console.log("aUSDT :", aUSDTBalance / 10 ** 6, "(balance)", ausdtAllowance / 10 ** 6, "(allowance)");

  done();
};
