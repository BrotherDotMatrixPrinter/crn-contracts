import { Contract } from 'ethers'

// Interfaces
import CrnCrc20Functions from './CrnCrc20Functions'
import CrnDistributionFunctions from './CrnDistributionFunctions'
import CrnNodeManagerFunctions from './CrnNodeManagerFunctions'

export interface ContractGroup {

	CrnCrc20: Contract
	CrnDistribution: Contract
	CrnNodeManager: Contract

}

export interface FunctionGroup {

	CrnCrc20: CrnCrc20Functions
	CrnDistribution: CrnDistributionFunctions
	CrnNodeManager: CrnNodeManagerFunctions

}

// This isn't used, it is for event listeners
export interface EventData {

	blockNumber: any
	blockHash: any
	transactionIndex: any
	removed: any
	address: any
	data: any
	topics: any
	transactionHash: any
	logIndex: any
	removeListener: any
	getBlock: any
	getTransaction: any
	getTransactionReceipt: any
	event: any
	eventSignature: any
	decode: any
	args: any

}
