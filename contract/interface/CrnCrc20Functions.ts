import { BigNumber } from 'ethers'

export default interface CrnCrc20Functions {
	_isBlacklisted( address: string ): Promise< boolean[] >
	allowance( address: string, spender: string ): Promise< BigNumber[] >
	approve( address: string, amount: BigNumber ): Promise< boolean[] >
	automatedMarketMakerPairs( address: string ): Promise< boolean[] >
	balanceOf( address: string ): Promise< BigNumber[] >
	blacklistMalicious( address: string, value: boolean ): Promise< void[] >
	boostReward( amount: BigNumber ): Promise< void[] >
	cashoutAll(): Promise< void[] >
	cashoutFee(): Promise< BigNumber[] >
	cashoutReward( time: BigNumber ): Promise< void[] >
	changeAutoDistri( value: boolean ): Promise< void[] >
	changeClaimTime( time: BigNumber ): Promise< void[] >
	changeGasDistri( amount: BigNumber ): Promise< void[] >
	changeNodePrice( amount: BigNumber ): Promise< void[] >
	changeRewardPerNode( amount: BigNumber ): Promise< void[] >
	changeSwapLiquify( value: boolean ): Promise< void[] >
	createNodeWithTokens( name: string ): Promise< any[] >
	deadWallet(): Promise< string[] >
	decimals(): Promise< BigNumber[] > // Revisit this, uint8
	decreaseAllowance( address: string, amount: BigNumber ): Promise< boolean[] >
	distributeRewards(): Promise< BigNumber[] >
	distributionPool(): Promise< string[] >
	futurFee(): Promise< BigNumber[] >
	futurUsePool(): Promise< string[] >
	getAutoDistri(): Promise< boolean[] >
	getClaimTime(): Promise< BigNumber[] >
	getDistriCount(): Promise< BigNumber[] >
	getGasDistri(): Promise< BigNumber[] >
	getNodeNumberOf( address: string ): Promise< BigNumber[] >
	getNodePrice(): Promise< BigNumber[] >
	getNodesCreatime(): Promise< string[] >
	getNodesLastClaims(): Promise< string[] >
	getNodesNames(): Promise< string[] >
	getNodesRewards(): Promise< string[] >
	getRewardAmount(): Promise< BigNumber[] >
	getRewardAmountOf( address: string ): Promise< BigNumber[] >
	getRewardPerNode(): Promise< BigNumber[] >
	getTotalCreatedNodes(): Promise< BigNumber[] >
	getTotalStakedReward(): Promise< BigNumber[] >
	increaseAllowance( address: string, amount: BigNumber ): Promise< boolean[] >
	liquidityPoolFee(): Promise< BigNumber[] >
	name(): Promise< string[] >
	nodeRewardManager(): Promise< string[] >
	owner(): Promise< string[] >
	payee( index: BigNumber ): Promise< string[] >
	publiDistriRewards(): Promise< void[] >
	release( address: string ): Promise< void[] >
	release( token: string, address: string ): Promise< void[] >
	released( token: string, address: string ): Promise< BigNumber[] >
	released( address: string ): Promise< BigNumber[] >
	renounceOwnership(): Promise< void[] >
	rewardsFee(): Promise< BigNumber[] >
	setAutomatedMarketMakerPair( address: string, value: boolean ): Promise< void[] >
	setNodeManagement( address: string ): Promise< void[] >
	shares( address: string ): Promise< BigNumber[] >
	swapTokensAmount(): Promise< BigNumber[] >
	symbol(): Promise< string[] >
	totalFees(): Promise< BigNumber[] >
	totalReleased( address: string ): Promise< BigNumber[] >
	totalReleased(): Promise< BigNumber[] >
	totalShares(): Promise< BigNumber[] >
	totalSupply(): Promise< BigNumber[] >
	transfer( address: string, amount: BigNumber ): Promise< boolean[] >
	transferFrom( address: string, receiver: string, amount: BigNumber ): Promise< boolean[] >
	transferOwnership( address: string ): Promise< void[] >
	uniswapV2Pair(): Promise< string[] >
	uniswapV2Router(): Promise< string[] >
	updateCashoutFee( amount: BigNumber ): Promise< void[] >
	updateFuturFee( amount: BigNumber ): Promise< void[] >
	updateFuturWall( address: string ): Promise< void[] >
	updateLiquiditFee( amount: BigNumber ): Promise< void[] >
	updateRewardsFee( amount: BigNumber ): Promise< void[] >
	updateRewardsWall( address: string ): Promise< void[] >
	updateRwSwapFee( amount: BigNumber ): Promise< void[] >
	updateSwapTokensAmount( amount: BigNumber ): Promise< void[] >
	updateUniswapV2Router( address: string ): Promise< void[] >
}
