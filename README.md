# CodingTest

run this for :

1.  supply Dai to aave lending pool

truffle exec .\scripts\supplyDai.js --network kovan

2. withdraw Dai from lending pool

truffle exec .\scripts\withDrawDai.js --network kovan

3. check user collateral in eth

truffle exec .\scripts\checkUserCollateral.js --network kovan

4. For upgrading contract truffle migrate -f 2 --to 2 --network kovan

5. After upgrading now check with call greet() which will return "Hello"
