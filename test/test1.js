const CodingTest = artifacts.require("CodingTest");
const IERC20 = artifacts.require("IERC20");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("test1", function (accounts) {
  before(async () => {
    const [user, _] = accounts;
    console.log(user);
    const erc20 = await IERC20.at("0xff795577d9ac8bd7d90ee22b6c1703490b6512fd");
    const approvedContract = "0x561069305CA265c03522DA3Df5bf1D7458914bFF";
    await erc20.approve(approvedContract, web3.utils.toWei("10", "ether"));
  });
  it("True", () => {
    assert(true);
  });
});
