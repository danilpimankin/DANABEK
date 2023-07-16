import { task } from 'hardhat/config'
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';

task('addLiquidity', 'AddLiquidity for token A and token B')
    .addParam('token1', 'A pool token A address')
    .addParam('token2', 'A pool token B address')
    .addParam('amount1', 'The amount of tokenA to add as liquidity if tokenA depreciates')
    .addParam('amount2', 'The amount of tokenB to add as liquidity if tokenB depreciates')
    .addParam('contract', 'address of contract')
	.setAction(async ({ token1, token2, amount1, amount2, contract }, { ethers }) => {
        const AddLiquidity = await ethers.getContractFactory('AddLiquidity')
        const addLiquidity = AddLiquidity.attach(contract)

        const Token = await ethers.getContractFactory('MyToken');
        const tokenContract1 = Token.attach(token1);
        const tokenContract2 = Token.attach(token2);
        try
        { 
            await tokenContract1.approve(contract, amount1);
            await tokenContract2.approve(contract, amount2);

            const contractTx: ContractTransaction = await addLiquidity.addLiquidity(token1, token2, amount1, amount2);
            const contractReceipt: ContractReceipt = await contractTx.wait();
            const event = contractReceipt.events?.find(event => event.event === 'AddedLiquidity');

            const etokenA: Address = event?.args!['tokenA'];
            const etokenB: Address = event?.args!['tokenB'];
            const eCreator: Address = event?.args!['creator']; 
            const eLPpair: Address = event?.args!['LPpair'];   

            console.log(`TokenA address: ${etokenA}`)
            console.log(`TokenB address: ${etokenB}`)
            console.log(`Creator address: ${eCreator}`)
            console.log(`LPpair address: ${eLPpair}`)

        }

        catch(error: any) {
         console.log(error.error);
        }
    })