﻿# CodingTest

#Installation:

1. git clone https://github.com/rajaroy43/CodingTest.git
2. cd ./CodingTest
3. yarn (or with windows run npm i )

#Add/Update

a. update ./truffle-config.js here https://github.com/rajaroy43/CodingTest/blob/master/truffle-config.js#L61 and set your infura-id for kovan

b. create .secret file ./and put your 12 word mnemonic phrase

#Run script:

1. run " truffle compile "
2. For migrating contract run "truffle migrate -f 1 --to 1 --network kovan"

3. supply Dai to aave lending pool

" truffle exec .\scripts\supplyUSDT.js --network kovan "

4. withdraw Dai from lending pool

" truffle exec .\scripts\withDrawUSDT.js --network kovan "

5. check user collateral in eth

" truffle exec .\scripts\checkUserCollateral.js --network kovan "

6. For upgrading contract " truffle migrate -f 2 --to 2 --network kovan "

7. After upgrading now check with call greet() which will return "Hello" (" truffle exec .\scripts\greetingHello.js --network kovan ")
