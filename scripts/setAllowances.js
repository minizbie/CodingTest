
const IERC20 = artifacts.require("IERC20");
const CodingTest = artifacts.require("CodingTest");

module.exports = async (done) => {
    console.log ("Connected to network");
    const [recipient, _] = await web3.eth.getAccounts();

    const codingTest = await CodingTest.deployed();
    console.log ("CodingTest: ", codingTest.address)

    const usdt = await IERC20.at("0x13512979ADE267AB5100878E2e0f485B568328a4");
    const aUSDT = await IERC20.at("0xFF3c8bc103682FA918c954E84F5056aB4DD5189d");
    await usdt.approve(codingTest.address, "0");    
    await aUSDT.approve(codingTest.address, "0");    

    let usdtBalance = parseInt(await usdt.balanceOf(recipient));
    let aUSDTBalance = parseInt(await aUSDT.balanceOf(recipient));
    let usdtAllowance = parseInt(await usdt.allowance(recipient, codingTest.address));
    let ausdtAllowance = parseInt(await aUSDT.allowance(recipient, codingTest.address));
    console.log("USDT  :", usdtBalance / 10 ** 6, "(balance)", usdtAllowance / 10 ** 6, "(allowance)");
    console.log("aUSDT :", aUSDTBalance / 10 ** 6, "(balance)", ausdtAllowance / 10 ** 6, "(allowance)");

    done();
};