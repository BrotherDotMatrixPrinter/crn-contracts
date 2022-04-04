import { BigNumber } from 'ethers'

export default interface CrnDistributionFunctions {
	HasClaimed( address: string ): Promise< boolean[] >
	UserExtraBlocks( address: string ): Promise< BigNumber[] >
	UserLastClaimTime( address: string ): Promise< BigNumber[] >
	changeBlocksPerDay( amount: BigNumber ): Promise< void[] >
	changeFee( amount: BigNumber ): Promise< void[] >
	changeMultiplier( amount: BigNumber ): Promise< void[] >
	claimReward(): Promise< any[] >
	getCroNodeAddress(): Promise< string[] >
	getLastClaimedBlock( address: string ): Promise< BigNumber[] >
	getNextClaimBlock( address: string ): Promise< BigNumber[] >
	getNodeManager(): Promise< string[] >
	getUsersNumberOfNodes( address: string ): Promise< BigNumber[] >
	owner(): Promise< string[] >
	renounceOwnership(): Promise< void[] >
	transferOwnership( address: string ): Promise< void[] >
	viewCroNodeTokenBalance(): Promise< BigNumber[] >
	withdrawCro(): Promise< void[] >
	withdrawCroNodeTokens(): Promise< void[] >
}