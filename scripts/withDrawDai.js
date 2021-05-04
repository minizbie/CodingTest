const IERC20 = artifacts.require("IERC20");
const CodingTest = artifacts.require("CodingTest");

module.exports = async (done) => {
  const [recipient, _] = await web3.eth.getAccounts();
  const usdt = await IERC20.at("0x13512979ade267ab5100878e2e0f485b568328a4");
  const aUSDT = await IERC20.at("0xa01ba9fb493b851f4ac5093a324cb081a909c34b");
  console.log("usdt balance before withdrawing aUSDT", (await usdt.balanceOf(recipient)).toString());
  const codingTest = await CodingTest.deployed();
  const _calledContract = "0xe0fba4fc209b4948668006b2be61711b7f465bae";
  const erc20Address = usdt.address;
  const to = recipient;
  const amount = web3.utils.toWei("1", "ether");
  const userAllowance = parseInt((await aUSDT.allowance(recipient, codingTest.address)).toString());
  if (userAllowance < amount) {
    aUSDT;
    //Do unlimited approval here
    console.log("Approving unlimited aUSDT");
    const totalSupply = await aUSDT.totalSupply();
    await aUSDT.approve(codingTest.address, totalSupply);
    console.log(parseInt((await aUSDT.allowance(recipient, codingTest.address)).toString()));
  }
  console.log("Withdrawing usdt from lending pool");
  await codingTest.withdraw(_calledContract, erc20Address, amount, to);
  console.log("usdt balance After Withdrawing aUSDT", (await usdt.balanceOf(recipient)).toString());
  done();
};
