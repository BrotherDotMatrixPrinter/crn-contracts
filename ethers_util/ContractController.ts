import { BigNumber, Wallet } from 'ethers'
import { constructCrnCrc20, constructCrnDistribution, constructCrnNodeManager, constructFunctions, constructWallet } from './Constructor'
import { ContractGroup, FunctionGroup } from './interface/General'
import ENV from '../ENV'

export default class ContractController {

	#Wallet: Wallet
	#Contracts: ContractGroup
	#Functions: FunctionGroup

	get Wallet() { return this.#Wallet as Readonly< Wallet > }
	get Contracts() { return this.#Contracts as Readonly< ContractGroup > }
	get Functions() { return this.#Functions as Readonly< FunctionGroup > }

	getBalance = async () => {

		const res = ( await this.Functions.CrnCrc20.balanceOf( this.Wallet.address ) )[ 0 ] as BigNumber

		if ( res._isBigNumber )
			return res.div( 1000000000000 ).toNumber() / 1000000

		return res.toNumber()

	}

	getNumberOfNodes = async () =>
		( ( await this.Functions.CrnNodeManager._getNodeNumberOf( this.Wallet.address ) )[ 0 ] as BigNumber ).toNumber()

	claimRewards = async ( log: boolean = false ) => {

		try {

			await this.Functions.CrnDistribution.claimReward()

			return true

		} catch ( exception ) {

			if ( log ) console.log( exception )

			return false

		}

	}

	buyNode = async ( log: boolean = false ) => {

		try {

			const nodeName = ENV.NODE_NAME + await this.getNumberOfNodes()

			await this.Functions.CrnCrc20.createNodeWithTokens( nodeName )

			return true

		} catch ( exception ) {

			if ( log ) console.log( exception )

			return false

		}

	}

	constructor( privateKey: string ) {

		this.#Wallet = constructWallet( privateKey )

		this.#Contracts = {

			CrnCrc20: constructCrnCrc20( this.#Wallet ),
			CrnDistribution: constructCrnDistribution( this.#Wallet ),
			CrnNodeManager: constructCrnNodeManager( this.#Wallet )

		}

		this.#Functions = {

			CrnCrc20: constructFunctions( this.#Contracts.CrnCrc20 ),
			CrnDistribution: constructFunctions( this.#Contracts.CrnDistribution ),
			CrnNodeManager: constructFunctions( this.#Contracts.CrnNodeManager )

		}

	}

}
