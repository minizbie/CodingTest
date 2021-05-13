const IERC20 = artifacts.require("IERC20");
const CodingTest = artifacts.require("CodingTest");

module.exports = async (done) => {
  const [recipient, _] = await web3.eth.getAccounts();
  const usdt = await IERC20.at("0x13512979ADE267AB5100878E2e0f485B568328a4");
  const aUSDT = await IERC20.at("0xFF3c8bc103682FA918c954E84F5056aB4DD5189d");
  
  const usdtBalance = parseInt(await usdt.balanceOf(recipient));
  const aUSDTBalance = parseInt(await aUSDT.balanceOf(recipient));
  console.log("USDT balance before deposit:", usdtBalance / 10 ** 6);
  console.log("aUSDT balance before depositing usdt", aUSDTBalance / 10 ** 6);
  const codingTest = await CodingTest.deployed(); 

  const depositAmount = 10e6;     //10 USDT
  const userAllowance = parseInt((await usdt.allowance(recipient, codingTest.address)).toString());
  if (userAllowance < depositAmount) {
    await usdt.approve(codingTest.address, depositAmount);    
  }
  console.log("User USDT allowance set for CodingTest:", parseInt((await usdt.allowance(recipient, codingTest.address)).toString()) / 10 ** 6);

  
  if (usdtBalance > depositAmount) {
    console.log("Depositing ", depositAmount / 10 ** 6, " USDT to aave lending pool");
    await codingTest.deposit3(usdt.address, depositAmount);
    console.log("aUSDT balance After depositing usdt", parseInt((await aUSDT.balanceOf(recipient)).toString()) / 10 ** 6);
  } else {
    console.log("You don't have enough USDT");
  }
  done();
};
