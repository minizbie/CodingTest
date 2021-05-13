pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";
import {MyContract, aavelendingPool} from "./CodingTest.sol";

contract CodingTestV2 is Initializable, MyContract {
    address private lendingPool;
    address public admin;
    event depositingToken(
        address indexed erc20Contract,
        address indexed user,
        uint256 amount,
        uint256 date
    );

    event withdrawingToken(
        address indexed erc20Contract,
        address indexed user,
        uint256 amount,
        uint256 date
    );

    event setLendingPool(
        address indexed oldLendingPool,
        address indexed newlendingPool,
        uint256 date
    );

    //replace constructor with intializer
    function initialize(address _lendingPool) public initializer {
        lendingPool = _lendingPool;
        admin = msg.sender;
        emit setLendingPool(address(0), _lendingPool, block.timestamp);
    }

    function setlendingPool(address _newLendingPool) public {
        require(msg.sender == admin, "call only owner");
        emit setLendingPool(lendingPool, _newLendingPool, block.timestamp);
        lendingPool = _newLendingPool;
    }

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

    //User must approve 1st token for this contract
    function deposit(address _erc20Contract, uint256 _amount)
        external
        override
        returns (bool)
    {
        require(
            doTransferFrom(lendingPool, _erc20Contract, _amount),
            "Not enough tokens to approve"
        );
        (bool success, ) =
            lendingPool.call(
                abi.encodeWithSignature(
                    "deposit(address,uint256,address,uint16)",
                    _erc20Contract,
                    _amount,
                    msg.sender,
                    0
                )
            );
        require(success, "Contract execution Failed");
        emit depositingToken(
            _erc20Contract,
            msg.sender,
            _amount,
            block.timestamp
        );

        return success;
    }

    function withdraw(address _erc20Contract, uint256 _amount)
        external
        override
        returns (uint256 amountWithdrawn)
    {
        aavelendingPool.ReserveData memory aTokenAddress =
            aavelendingPool(lendingPool).getReserveData(_erc20Contract);
        require(
            doTransferFrom(lendingPool, aTokenAddress.aTokenAddress, _amount),
            "Not enough tokens for approve"
        );
        (bool success, bytes memory data) =
            lendingPool.call(
                abi.encodeWithSignature(
                    "withdraw(address,uint256,address)",
                    _erc20Contract,
                    _amount,
                    msg.sender
                )
            );
        require(success, "Contract execution Failed");
        amountWithdrawn = abi.decode(data, (uint256));
        emit withdrawingToken(
            _erc20Contract,
            msg.sender,
            amountWithdrawn,
            block.timestamp
        );
    }

    function checkCollateralValueInEth()
        external
        view
        override
        returns (uint256 amountInEth)
    {
        uint256 totalDebtETH;
        uint256 availableBorrowsETH;
        uint256 currentLiquidationThreshold;
        uint256 ltv;
        uint256 healthFactor;
        (
            amountInEth,
            totalDebtETH,
            availableBorrowsETH,
            currentLiquidationThreshold,
            ltv,
            healthFactor
        ) = aavelendingPool(lendingPool).getUserAccountData(msg.sender);
    }

    function greet() public pure returns (string memory) {
        return "Hello";
    }
}
