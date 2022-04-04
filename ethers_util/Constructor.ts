import { Contract, providers as Providers, Wallet } from 'ethers'
import JsonImporter from '../JsonImporter.js'

export const constructWallet = (

	privateKey: string

) => new Wallet(

	privateKey,
	new Providers.JsonRpcProvider( JsonImporter.Env.CRONOS_RPC_URL )

)

export const constructCrnCrc20 = (

	wallet: Wallet

) => new Contract(

	JsonImporter.Contract_Addresses.CrnCrc20,
	JsonImporter.ABI.Crn_Crc_20,
	wallet

)

export const constructCrnDistribution = (

	wallet: Wallet

) => new Contract(

	JsonImporter.Contract_Addresses.CrnDistribution,
	JsonImporter.ABI.Crn_Distribution,
	wallet

)

export const constructCrnNodeManager = (

	wallet: Wallet

) => new Contract(

	JsonImporter.Contract_Addresses.CrnNodeManager,
	JsonImporter.ABI.Crn_Node_Manager,
	wallet

)

export const constructCronaswapRouter = (

	wallet: Wallet

) => new Contract(

	JsonImporter.Contract_Addresses.CronaswapRouter,
	JsonImporter.ABI.Cronaswap_Router,
	wallet

)

export const constructFunctions = < Type >(

	contract: Contract

) => contract.functions as unknown as Type
