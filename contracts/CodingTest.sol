//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


interface MyContract {
    
    /**
   * @dev Emitted on deposit()
   * @param reserve The address of the underlying asset of the reserve
   * @param user The address initiating the deposit
   * @param onBehalfOf The beneficiary of the deposit, receiving the aTokens
   * @param amount The amount deposited
   * @param referral The referral code used
   **/
  event Deposit(
    address indexed reserve,
    address user,
    address indexed onBehalfOf,
    uint256 amount,
    uint16 indexed referral
  );

  /**
   * @dev Emitted on withdraw()
   * @param reserve The address of the underlyng asset being withdrawn
   * @param user The address initiating the withdrawal, owner of aTokens
   * @param to Address that will receive the underlying
   * @param amount The amount to be withdrawn
   **/
  event Withdraw(address indexed reserve, address indexed user, address indexed to, uint256 amount);

/**
   * @dev Deposits an `amount` of underlying asset into the reserve, receiving in return overlying aTokens.
   * - E.g. User deposits 100 USDC and gets in return 100 aUSDC
   * @param asset The address of the underlying asset to deposit
   * @param amount The amount to be deposited
   * @param onBehalfOf The address that will receive the aTokens, same as msg.sender if the user
   *   wants to receive them on his own wallet, or a different address if the beneficiary of aTokens
   *   is a different wallet
   * @param referralCode Code used to register the integrator originating the operation, for potential rewards.
   *   0 if the action is executed directly by the user, without any middle-man
   **/ 
   
  function deposit(address asset,uint256 amount,address onBehalfOf, uint16 referralCode) external;

/**
   * @dev Withdraws an `amount` of underlying asset from the reserve, burning the equivalent aTokens owned
   * E.g. User has 100 aUSDC, calls withdraw() and receives 100 USDC, burning the 100 aUSDC
   * @param asset The address of the underlying asset to withdraw
   * @param amount The underlying amount to be withdrawn
   *   - Send the value type(uint256).max in order to withdraw the whole aToken balance
   * @param to Address that will receive the underlying, same as msg.sender if the user
   *   wants to receive it on his own wallet, or a different address if the beneficiary is a
   *   different wallet
   * @return The final amount withdrawn
   **/
  function withdraw( address asset,uint256 amount, address to) external returns (uint256);

/**
   * @dev Returns the user account data across all the reserves
   * @param user The address of the user
   * @return totalCollateralETH the total collateral in ETH of the user
   * @return totalDebtETH the total debt in ETH of the user
   * @return availableBorrowsETH the borrowing power left of the user
   * @return currentLiquidationThreshold the liquidation threshold of the user
   * @return ltv the loan to value of the user
   * @return healthFactor the current health factor of the user
   **/
  function getUserAccountData(address user) external view
    returns (
      uint256 totalCollateralETH,
      uint256 totalDebtETH,
      uint256 availableBorrowsETH,
      uint256 currentLiquidationThreshold,
      uint256 ltv,
      uint256 healthFactor
    );
    
    struct ReserveData {
    //stores the reserve configuration
    ReserveConfigurationMap configuration;
    //the liquidity index. Expressed in ray
    uint128 liquidityIndex;
    //variable borrow index. Expressed in ray
    uint128 variableBorrowIndex;
    //the current supply rate. Expressed in ray
    uint128 currentLiquidityRate;
    //the current variable borrow rate. Expressed in ray
    uint128 currentVariableBorrowRate;
    //the current stable borrow rate. Expressed in ray
    uint128 currentStableBorrowRate;
    uint40 lastUpdateTimestamp;
    //tokens addresses
    address aTokenAddress;
    address stableDebtTokenAddress;
    address variableDebtTokenAddress;
    //address of the interest rate strategy
    address interestRateStrategyAddress;
    //the id of the reserve. Represents the position in the list of the active reserves
    uint8 id;
  }

  struct ReserveConfigurationMap {
    //bit 0-15: LTV
    //bit 16-31: Liq. threshold
    //bit 32-47: Liq. bonus
    //bit 48-55: Decimals
    //bit 56: Reserve is active
    //bit 57: reserve is frozen
    //bit 58: borrowing is enabled
    //bit 59: stable rate borrowing enabled
    //bit 60-63: reserved
    //bit 64-79: reserve factor
    uint256 data;
  }
    function getReserveData(address asset)
    external
    view  returns (ReserveData memory);
}


contract CodingTest  {
    function doTransferFrom(
        address _calledContract,
        address _tokenContract,
        uint256 _ammount
    ) internal returns (bool approvedSuccess) {
        require(
            (
                IERC20(_tokenContract).transferFrom(
                    msg.sender,
                    address(this),
                    _ammount
                )
            ),
            "Not enough tokens to approve"
        );
        approvedSuccess = IERC20(_tokenContract).approve(
            _calledContract,
            _ammount
        );
    }
    event depositingToken(address indexed erc20Contract,address indexed user,uint256 amount,uint256 date);
    event withdrawingToken(address indexed erc20Contract,address indexed user,uint256 amount,uint256 date);
    //User must approve 1st token for this contract 
    function deposit(address _calledContract,address _erc20Contract,address onBehalfOf, uint256 _amount) external{
            require(doTransferFrom(_calledContract,_erc20Contract,_amount),"Not enough tokens to approve");
            MyContract(_calledContract).deposit(_erc20Contract,_amount,onBehalfOf,0);
            emit depositingToken(_erc20Contract,onBehalfOf,_amount,block.timestamp);
    }
    function withdraw(address _calledContract,address _erc20Contract,uint256 _amount,address _to) external   returns (uint256 amountWithdrawn){
            MyContract.ReserveData memory aTokenAddress=MyContract(_calledContract).getReserveData(_erc20Contract);
            require(doTransferFrom(_calledContract,aTokenAddress.aTokenAddress,_amount),"Not enough tokens for approve");
            amountWithdrawn=MyContract(_calledContract).withdraw(_erc20Contract,_amount,_to);
            emit withdrawingToken(_erc20Contract,_to,amountWithdrawn,block.timestamp);
    }
   
   
function getUserAccountData(address _calledContract,address user)
    external
    view
    returns (
      uint256 totalCollateralETH,
      uint256 totalDebtETH,
      uint256 availableBorrowsETH,
      uint256 currentLiquidationThreshold,
      uint256 ltv,
      uint256 healthFactor
    ){
        (totalCollateralETH,totalDebtETH,availableBorrowsETH,currentLiquidationThreshold,ltv,healthFactor)=MyContract(_calledContract).getUserAccountData(user);
    }
}