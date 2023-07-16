import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";



const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
const FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"





describe("AddLiquidity contract", function () {
  let AddLiquidity, Token1, Token2;
  let addLiquidity: Contract;
  let owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, users: SignerWithAddress[];
  let token1Contract: Contract;
  let token2Contract: Contract;
  let factoryContract: Contract; 
  let routerContract: Contract;

  beforeEach(async () => {
    [owner, user1, user2, ...users] = await ethers.getSigners();
    AddLiquidity = await ethers.getContractFactory('AddLiquidity');
    addLiquidity = await AddLiquidity.deploy(ROUTER_ADDRESS, FACTORY_ADDRESS);

    //deploy test token A
    Token1 = await ethers.getContractFactory('MyToken');
    token1Contract = await Token1.deploy("TokenA", "TKA");

    //deploy test token B
    Token2 = await ethers.getContractFactory('MyToken');
    token2Contract = await Token2.deploy("TokenB", "TKB");

    //create router's instance and factory's instance
    factoryContract = await ethers.getContractAt("IUniswapV2Factory", FACTORY_ADDRESS)
    routerContract = await ethers.getContractAt("IUniswapV2Router02", ROUTER_ADDRESS)
 
  })

  describe("Functionality test", async () => {
    it("test 1. Normal call AddLiquidity", async () => {
        await token1Contract.mint(owner.address, ethers.utils.parseEther("1000"))
        await token2Contract.mint(owner.address, ethers.utils.parseEther("1000"))
        await token1Contract.approve(addLiquidity.address, ethers.utils.parseEther("1000"))
        await token2Contract.approve(addLiquidity.address, ethers.utils.parseEther("1000"))

        expect(await addLiquidity.addLiquidity(token1Contract.address, token2Contract.address, ethers.utils.parseEther("100"), ethers.utils.parseEther("100"),))
        .to.emit(addLiquidity, "AddedLiquidity")
        .withArgs(token1Contract.address, token2Contract.address, owner.address, await factoryContract.getPair(token1Contract.address, token2Contract.address))
    })

    it.only("test 2. Call AddLiquidity without approve", async () => {
        await token1Contract.mint(owner.address, ethers.utils.parseEther("1000"))
        await token2Contract.mint(owner.address, ethers.utils.parseEther("1000"))
 

        await  expect(addLiquidity.addLiquidity(token1Contract.address, token2Contract.address, ethers.utils.parseEther("100"), ethers.utils.parseEther("100"),))
        .to.be.revertedWith("MyToken: Insufficient allowance")
        
  })
})
})
