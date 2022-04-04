import { Contract } from 'ethers'

import CrnCrc20Functions from './CrnCrc20Functions.js'
import CrnDistributionFunctions from './CrnDistributionFunctions.js'
import CrnNodeManagerFunctions from './CrnNodeManagerFunctions.js'
import CronaswapRouterFunctions from './CronaswapRouterFunctions.js'

export interface ContractGroup {

	CrnCrc20: Contract
	CrnDistribution: Contract
	CrnNodeManager: Contract
	CronaswapRouter: Contract

}

export interface FunctionGroup {

	CrnCrc20: CrnCrc20Functions
	CrnDistribution: CrnDistributionFunctions
	CrnNodeManager: CrnNodeManagerFunctions
	CronaswapRouter: CronaswapRouterFunctions

}

// export interface EventData {

// 	blockNumber: any
// 	blockHash: any
// 	transactionIndex: any
// 	removed: any
// 	address: any
// 	data: any
// 	topics: any
// 	transactionHash: any
// 	logIndex: any
// 	removeListener: any
// 	getBlock: any
// 	getTransaction: any
// 	getTransactionReceipt: any
// 	event: any
// 	eventSignature: any
// 	decode: any
// 	args: any

// }
