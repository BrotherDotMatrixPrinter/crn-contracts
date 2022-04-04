import { Contract, ContractFactory, providers as Providers, Wallet } from 'ethers'
import { Interface } from 'ethers/lib/utils'

import ENV from '../ENV'
import ContractAddresses from './constant/ContractAddresses'

// ABIs
import CrnCrc20Abi from './constant/abi/CrnCrc20'
import CrnDistributionAbi from './constant/abi/CrnDistribution'
import CrnNodeManagerAbi from './constant/abi/CrnNodeManager'

// Bytecode
import CrnCrc20Bytecode from './constant/bytecode/CrnCrc20'
import CrnDistributionBytecode from './constant/bytecode/CrnDistribution'
import CrnNodeManagerBytecode from './constant/bytecode/CrnNodeManager'

export const constructWallet = (

	privateKey: string

) => new Wallet(

	privateKey,
	new Providers.JsonRpcProvider( ENV.CRONOS_RPC_URL )

)

export const constructCrnCrc20Interface = () =>
	new Interface( CrnCrc20Abi )

export const constructCrnCrc20Factory = (

	wallet: Wallet

) => new ContractFactory(

	constructCrnCrc20Interface(),
	CrnCrc20Bytecode,
	wallet

)

export const constructCrnCrc20 = (

	wallet: Wallet

) => new Contract(

	ContractAddresses.CrnCrc20,
	CrnCrc20Abi,
	wallet

)

export const constructCrnDistributionInterface = () =>
	new Interface( CrnDistributionAbi )


export const constructCrnDistributionFactory = (

	wallet: Wallet

) => new ContractFactory(

	constructCrnDistributionInterface(),
	CrnDistributionBytecode,
	wallet

)

export const constructCrnDistribution = (

	wallet: Wallet

) => new Contract(

	ContractAddresses.CrnDistribution,
	CrnDistributionAbi,
	wallet

)

export const constructCrnNodeManagerInterface = () =>
	new Interface( CrnNodeManagerAbi )

export const constructCrnNodeManagerFactory = (

	wallet: Wallet

) => new ContractFactory(

	constructCrnNodeManagerInterface(),
	CrnNodeManagerBytecode,
	wallet

)

export const constructCrnNodeManager = (

	wallet: Wallet

) => new Contract(

	ContractAddresses.CrnNodeManager,
	CrnNodeManagerAbi,
	wallet

)

export const constructFunctions = < Type >(

	contract: Contract

) => contract.functions as unknown as Type