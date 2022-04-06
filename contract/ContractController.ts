import { BigNumber, Wallet, utils as Utils } from 'ethers'
import { ContractGroup, FunctionGroup } from './interface/General.js'
import { constructCrnCrc20, constructCrnDistribution, constructCrnNodeManager, constructCronaswapRouter, constructFunctions, constructWallet } from './Constructor.js'
import { Env, Contract_Addresses } from '../JsonImporter.js'

export class Response< Type > {

	readonly data: Type
	readonly complete: boolean
	readonly loading: boolean

	constructor( data: Type, complete: boolean = true, loading: boolean = false ) {

		this.data = data
		this.complete = complete
		this.loading = loading

	}

}

export type ContractResponse< Type > = Promise< Response< Type | unknown > >
export type ResponseObserver< Type > = ( data: Response< Type > ) => Promise< void >

export class ObservableResponse< Type > {

	private _data: Response< Type >
	private _observers: ResponseObserver< Type >[] = []

	get data() { return this._data as Readonly< Response< Type > > }
	get observers() { return this._observers as Readonly< ResponseObserver< Type >[] > }

	set data( data: Response< Type > ) {

		this._data = data

		for ( const observer of this.observers )
			observer( data )

	}

	addObserver = ( observer: ResponseObserver< Type > ) => {

		this._observers.push( observer )

		return this._observers.length - 1

	}

	removeObserver = ( observerIndex: number ) => {

		if ( observerIndex <= this._observers.length - 1 ) {

			this._observers = this._observers.splice( 0, observerIndex ).concat( this._observers.splice( 1 ) )

			return true

		}

		return false

	}

	constructor( data: Response< Type > ) { this._data = data }

}

export default class ContractController {

	static readonly Response = Response

	private _wallet: Wallet
	private _contracts: ContractGroup
	private _functions: FunctionGroup
	private _balance: ObservableResponse< number >
	private _numberOfNodes: ObservableResponse< number >

	get wallet() { return this._wallet as Readonly< Wallet > }
	get contracts() { return this._contracts as Readonly< ContractGroup > }
	get functions() { return this._functions as Readonly< FunctionGroup > }
	get balance() { return this._balance as Readonly< ObservableResponse< number > > }
	get numberOfNodes() { return this._numberOfNodes as Readonly< ObservableResponse< number > > }

	get walletAddress() { return this.wallet.address }

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

		this._balance = new ObservableResponse( new Response( 0, false ) )
		this._numberOfNodes = new ObservableResponse( new Response( 0, false ) )

	}

	// This should wrap all contract functions
	private static attempt = async < Type >(

		action: () => ContractResponse< Type >,
		retries: number = Env.MAX_RETRIES

	): Promise< Response< Type > > => {

		let res = ( await action() ) as Response< Type >

		for ( let i = 0; i < retries - 1; i++ ) {

			if ( res .complete ) return res

			res = ( await action() ) as Response< Type >

		}

		return res

	}

	private _claim = async ( log: boolean = false ): ContractResponse< true > => {

		try {

			const res = await this.functions.CrnDistribution.claimReward()

			if ( log ) console.log( res )

			return new Response( true )

		} catch ( exception ) {

			if ( log ) console.log( exception )

			return new Response( exception, false )

		}

	}

	private _getBalance = async ( log: boolean = false ): ContractResponse< number > => {

		this._balance.data = new Response( this._balance.data.data, this._balance.data.complete, true )

		try {

			const res = await this.functions.CrnCrc20.balanceOf( this.wallet.address )

			if ( log ) console.log( res )

			const data = new Response( ( res[ 0 ] as BigNumber ).div( 1000000000000 ).toNumber() / 1000000 )

			this._balance.data = data

			return data

		} catch ( exception ) {

			if ( log ) console.log( exception )

			return new Response( exception, false )

		}

	}

	private _getNumberOfNodes = async ( log: boolean = false ): ContractResponse< number > => {

		this._numberOfNodes.data = new Response( this._numberOfNodes.data.data, this._numberOfNodes.data.complete, true )

		try {

			const res = await this.functions.CrnNodeManager._getNodeNumberOf( this.walletAddress )

			if ( log ) console.log( res )

			const data = new Response( ( res[ 0 ] as BigNumber ).toNumber() )

			this._numberOfNodes.data = data

			return data

		} catch ( exception ) {

			if ( log ) console.log( exception )

			return new Response( exception, false )

		}

	}

	private _buyNode = async ( log: boolean = false ): ContractResponse< any[] > => {

		try {

			const numberOfNodes = await this.getNumberOfNodes( log ) as Response< number >
			const nodeName = numberOfNodes.data <= 0 ? Env.NODE_NAME : Env.NODE_NAME + numberOfNodes.data
			const res = await this.functions.CrnCrc20.createNodeWithTokens( nodeName )

			if ( log ) console.log( res )

			return new Response( res )

		} catch ( exception ) {

			if ( log ) console.log( exception )

			return new Response( exception, false )

		}

	}

	private _transferCrn = async ( amount: string, to: string, log: boolean = false ): ContractResponse< boolean > => {

		try {

			const res = await this.functions.CrnCrc20.transfer( to, BigNumber.from( amount ) )

			if ( log ) console.log( res )

			return new Response( res[ 0 ] as boolean )

		} catch ( exception ) {

			if ( log ) console.log( exception )

			return new Response( exception, false )

		}

	}

	private _swapCrnForCro = async ( amount: string, log: boolean = false ): ContractResponse< string > => {

		try {

			const res = await this.functions.CronaswapRouter.swapExactTokensForETH(

				Utils.parseEther( amount ),
				Utils.parseEther( amount ).mul( Env.SWAP_SPREAD ),
				[ Contract_Addresses.CrnCrc20, Contract_Addresses.WrappedCro ],
				this.walletAddress,
				BigNumber.from( ( Date.now() / 1000 ) - 12630 )


			)

			if ( log ) console.log( res )

			return new Response( ( res[ 0 ] as BigNumber ).toString() )

		} catch ( exception ) {

			if ( log ) console.log( exception )

			return new Response( exception, false )

		}

	}

	claim = async ( log: boolean = false ): ContractResponse< true > =>
		ContractController.attempt< true >( (): ContractResponse< true > => this._claim( log ) )

	getBalance = async ( log: boolean = false ): ContractResponse< number > =>
		ContractController.attempt< number >( (): ContractResponse< number > => this._getBalance( log ) )

	getNumberOfNodes = async ( log: boolean = false ): ContractResponse< number > =>
		ContractController.attempt< number >( (): ContractResponse< number > => this._getNumberOfNodes( log ) )

	buyNode = async ( log: boolean = false ): ContractResponse< any[] > =>
		ContractController.attempt< any[] >( (): ContractResponse< any[] > => this._buyNode( log ) )

	transferCrn = async ( amount: string, to: string, log: boolean = false ): ContractResponse< boolean > =>
		ContractController.attempt< boolean >( (): ContractResponse< boolean > => this._transferCrn( amount, to, log ) )

	swapCrnForCro = async (

		amount: string = Env.SWAP_AMOUNT.toString(),
		log: boolean = false

	): ContractResponse< string > =>
		ContractController.attempt< string >( (): ContractResponse< string > => this._swapCrnForCro( amount, log ) )

}
