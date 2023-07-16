// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IERC20.sol";

contract AddLiquidity {

    address public router;
    address public factory;


    constructor(address _uniswapRouter, address _uniswapFactory) {
        router = _uniswapRouter;
        factory = _uniswapFactory;
    }

    event AddedLiquidity(address tokenA, address tokenB, address creator, address LPpair);

    function addLiquidity(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB) external {

        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
        IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

        IERC20(_tokenA).approve(router, _amountA);
        IERC20(_tokenB).approve(router, _amountB);

        IUniswapV2Router02(router).addLiquidity(_tokenA, _tokenB, _amountA, _amountB, 1, 1, msg.sender, block.timestamp);
        address LPpair = IUniswapV2Factory(factory).getPair(_tokenA, _tokenB);

        emit AddedLiquidity(_tokenA, _tokenB, msg.sender, LPpair);
   }

}