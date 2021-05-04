const IERC20 = artifacts.require("IERC20");
const CodingTest = artifacts.require("CodingTest");

module.exports = async (done) => {
  const [recipient, _] = await web3.eth.getAccounts();
  const usdt = await IERC20.at("0x13512979ade267ab5100878e2e0f485b568328a4");
  const aUSDT = await IERC20.at("0xa01ba9fb493b851f4ac5093a324cb081a909c34b");
  console.log("aUSDT balance before depositing usdt", (await aUSDT.balanceOf(recipient2)).toString());
  const codingTest = await CodingTest.deployed();
  const _calledContract = "0xe0fba4fc209b4948668006b2be61711b7f465bae";
  const erc20Address = usdt.address;
  const onBehalfOf = recipient2;
  const amount = web3.utils.toWei("10", "ether"); //10 usdt tokens
  const userAllowance = parseInt((await usdt.allowance(recipient2, codingTest.address)).toString());
  console.log("userAlloance for usdt", userAllowance);
  if (userAllowance < amount) {
    //Do unlimited approval here
    console.log("Approving unlimited usdt");
    const totalSupply = await usdt.totalSupply();
    await usdt.approve(codingTest.address, totalSupply);
  }
  console.log("Depositing 10 usdt to aave lending pool");
  await codingTest.deposit(_calledContract, erc20Address, onBehalfOf, amount);
  console.log("aUSDT balance After depositing usdt", (await aUSDT.balanceOf(recipient2)).toString());
  done();
};
