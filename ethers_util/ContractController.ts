import { Wallet } from 'ethers'
import { ContractGroup, FunctionGroup } from './interface/General.js'
import { constructCrnCrc20, constructCrnDistribution, constructCrnNodeManager, constructCronaswapRouter, constructFunctions, constructWallet } from './Constructor.js'

export default class ContractController {

	private _wallet: Wallet
	private _contracts: ContractGroup
	private _functions: FunctionGroup

	get wallet() { return this._wallet as Readonly< Wallet > }
	get contracts() { return this._contracts as Readonly< ContractGroup > }
	get functions() { return this._functions as Readonly< FunctionGroup > }

	constructor( privateKey: string ) {

		this._wallet = constructWallet( privateKey )

		this._contracts = {

			CrnCrc20: constructCrnCrc20( this._wallet ),
			CrnDistribution: constructCrnDistribution( this._wallet ),
			CrnNodeManager: constructCrnNodeManager( this._wallet ),
			CronaswapRouter: constructCronaswapRouter( this._wallet )

		}

		this._functions = {

			CrnCrc20: constructFunctions( this._contracts.CrnCrc20 ),
			CrnDistribution: constructFunctions( this._contracts.CrnDistribution ),
			CrnNodeManager: constructFunctions( this._contracts.CrnNodeManager ),
			CronaswapRouter: constructFunctions( this._contracts.CronaswapRouter )

		}

	}

}
