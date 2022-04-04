import { BigNumber } from 'ethers'

export default interface CrnNodeManager {
	_cashoutAllNodesReward( address: string ): Promise< BigNumber[] >
	_cashoutNodeReward( address: string, creationTime: BigNumber ): Promise< BigNumber[] >
	_changeAutoDistri( value: boolean ): Promise< void[] >
	_changeClaimTime( time: BigNumber ): Promise< void[] >
	_changeGasDistri( value: BigNumber ): Promise< void[] >
	_changeNodePrice( value: BigNumber ): Promise< void[] >
	_changeRewardPerNode( value: BigNumber ): Promise< void[] >
	_distributeRewards(): Promise< BigNumber[] >
	_getNodeNumberOf( address: string ): Promise< BigNumber[] >
	_getNodeRewardAmountOf( address: string, creationTime: BigNumber ): Promise< BigNumber[] >
	_getNodesCreationTime( address: string ): Promise< string[] >
	_getNodesLastClaimTime( address: string ): Promise< string[] >
	_getNodesNames( address: string ): Promise< string[] >
	_getNodesRewardAvailable( address: string ): Promise< string[] >
	_getRewardAmountOf( address: string ): Promise< BigNumber[] >
	_getRewardAmountOf( address: string, creationTime: BigNumber ): Promise< BigNumber[] >
	_isNodeOwner( address: string ): Promise< boolean[] >
	autoDistri(): Promise< boolean[] >
	claimTime(): Promise< boolean[] >
	createNode( address: string, name: string ): Promise< void[] >
	distribution(): Promise< boolean[] >
	gasForDistribution(): Promise< BigNumber[] >
	gateKeeper(): Promise< string[] >
	lastDistributionCount(): Promise< BigNumber[] >
	lastIndexProcessed(): Promise< BigNumber[] >
	nodePrice(): Promise< BigNumber[] >
	rewardPerNode(): Promise< BigNumber[] >
	setToken( address: string ): Promise< void[] >
	token(): Promise< string[] >
	totalNodesCreated(): Promise< BigNumber[] >
	totalRewardStaked(): Promise< BigNumber[] >
}