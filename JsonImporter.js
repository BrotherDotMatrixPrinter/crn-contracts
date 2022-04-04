import ENV from './ENV.json'
import PrivateKeys from './PrivateKeys.json'
import ContractAddresses from './ethers_util/constant/ContractAddresses.json'
import ContractEvents from './ethers_util/constant/ContractEvents.json'
import CrnCrc20 from './ethers_util/constant/abi/CrnCrc20.json'
import CrnDistribution from './ethers_util/constant/abi/CrnDistribution.json'
import CrnNodeManager from './ethers_util/constant/abi/CrnNodeManager.json'
import CronaswapRouter from './ethers_util/constant/abi/CronaswapRouter.json'

export const Env = ENV
export const Private_Keys = PrivateKeys
export const Contract_Addresses = ContractAddresses
export const Contract_Events = ContractEvents
export const Crn_Crc_20 = CrnCrc20
export const Crn_Distribution = CrnDistribution
export const Crn_Node_Manager = CrnNodeManager
export const Cronaswap_Router = CronaswapRouter

export default {

	Env,
	Contract_Addresses,
	Contract_Events,

	ABI: {

		Crn_Crc_20,
		Crn_Distribution,
		Crn_Node_Manager,
		Cronaswap_Router

	}

}