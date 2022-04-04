import ENV from './ENV.json' assert { type: 'json' }
import PrivateKeys from './PrivateKeys.json' assert { type: 'json' }
import ContractAddresses from './ethers_util/constant/ContractAddresses.json' assert { type: 'json' }
import ContractEvents from './ethers_util/constant/ContractEvents.json' assert { type: 'json' }
import CrnCrc20 from './ethers_util/constant/abi/CrnCrc20.json' assert { type: 'json' }
import CrnDistribution from './ethers_util/constant/abi/CrnDistribution.json' assert { type: 'json' }
import CrnNodeManager from './ethers_util/constant/abi/CrnNodeManager.json' assert { type: 'json' }
import CronaswapRouter from './ethers_util/constant/abi/CronaswapRouter.json' assert { type: 'json' }

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