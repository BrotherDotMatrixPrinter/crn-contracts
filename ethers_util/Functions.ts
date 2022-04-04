import crypto from 'crypto'
import { BigNumber, utils as Utils } from 'ethers'
import { Env, Private_Keys, Contract_Addresses } from '../JsonImporter.js'
import ContractController from './ContractController.js'

export const encryptPrivateKeys = ( password: string ) => {

	const cipher = crypto.createCipher( Env.CRYPTO_ALGO, password )
	const encryptedKeys = []

	for ( const privateKey of Private_Keys )
		encryptedKeys.push( cipher.update( privateKey, 'utf8', 'hex' ) + cipher.final( 'hex' ) )

	return encryptedKeys

}

export const decryptPrivateKeys = ( password: string ) => {

	const decipher = crypto.createDecipher( Env.CRYPTO_ALGO, password )

	const decryptedKeys = []

	for ( const privateKey of Private_Keys )
		decryptedKeys.push( decipher.update( privateKey, 'hex', 'utf8' ) + decipher.final( 'utf8' ) )

	return decryptedKeys

}

export const retry = async ( retries: number, callback: () => Promise< boolean > ) => {

	for ( let i = 0; i < retries; i++ )
		if ( await callback() ) return true

	return false

}

export const transferCrn = async ( contractController: ContractController, amount: number, to: string, log: boolean = false ) => {

	try {

		await contractController.functions.CrnCrc20.transfer( to, BigNumber.from( amount ) )

		return true

	} catch ( exception ) {

		if ( log ) console.log( exception )

		return false

	}

}

export const getCrnBalance = async ( contractController: ContractController ) => {

	const balance = ( await contractController.functions.CrnCrc20.balanceOf( contractController.wallet.address ) )[ 0 ]

	return ( balance?._isBigNumber
		? ( balance as BigNumber ).div( 1000000000000 ).toNumber() / 1000000
		: balance?.toNumber() ) || 0

}

export const swapCrnForCro = async ( contractController: ContractController, log: boolean = false ) => {

	const balance = await getCrnBalance( contractController )
	const amount = Utils.parseEther( balance.toString() )
	const min = amount.mul( Env.SWAP_SPREAD )
	const path = [ Contract_Addresses.CrnCrc20, Contract_Addresses.WrappedCro ]
	const to = contractController.wallet.address
	const deadline = BigNumber.from( ( Date.now() / 1000 ) - 12630 )

	try {

		// This actually swaps for whatever the chain's native currency is, I think
		// The path it takes is CRN -> WCRO -> CRO
		await contractController.functions.CronaswapRouter.swapExactTokensForETH( amount, min, path, to, deadline )

		return true

	} catch ( exception ) {

		if ( log ) console.log( exception )

		return false

	}

}

export const getNumberOfNodes = async ( contractController: ContractController ) =>
	( await contractController.functions.CrnNodeManager._getNodeNumberOf( contractController.wallet.address ) )[ 0 ]?.toNumber() || 0

export const hasClaimedNodeRewards = async ( contractController: ContractController ) =>
	( await contractController.functions.CrnDistribution.HasClaimed( contractController.wallet.address ) )[ 0 ] || false

export const claimNodeRewards = async ( contractController: ContractController, log: boolean = false ) => {

	try {

		await contractController.functions.CrnDistribution.claimReward()

		return true

	} catch ( exception ) {

		if ( log ) console.log( exception )

		return false

	}

}

export const buyNode = async ( contractController: ContractController, log: boolean = false ) => {

	try {

		const numberOfNodes = await getNumberOfNodes( contractController ) || 0
		const nodeName = Env.NODE_NAME + numberOfNodes

		await contractController.functions.CrnCrc20.createNodeWithTokens( nodeName )

		return true

	} catch ( exception ) {

		if ( log ) console.log( exception )

		return false

	}

}

export const claimAndBuy = async ( privateKey: string ) => {

	const contractController = new ContractController( privateKey )
	const balance = await getCrnBalance( contractController )
	const numberOfNodes = await getNumberOfNodes( contractController )

	console.log( `Address: ${ contractController.wallet.address }` )
	console.log( `Balance: ${ balance }` )
	console.log( `Number of Nodes: ${ numberOfNodes }` )

	if ( ! ( await hasClaimedNodeRewards( contractController ) ) ) {

		console.log( 'Claiming...' )

		let res = false
		let counter = 1

		while ( ! res || counter <= Env.MAX_RETRIES ) {

			res = await claimNodeRewards( contractController )

			if ( ! res && counter < Env.MAX_RETRIES ) {

				console.log( `Retrying... Attempt: ${ counter }/${ Env.MAX_RETRIES }` )
				counter++

			}

		}

		if ( ! res ) console.log( 'Failed to claim' )

	} else console.log( 'Cannot claim' )

	if ( balance >= 20 ) {

		let res = false
		let counter = 1

		while ( ( balance >= 20 && numberOfNodes < 100 ) && ( ! res && counter <= Env.MAX_RETRIES ) ) {

			res = await buyNode( contractController )

			if ( ( balance >= 20 && numberOfNodes < 100 ) && ( ! res && counter < Env.MAX_RETRIES ) ) {

				console.log( `Retrying... Attempt: ${ counter }` )
				counter++

			}

		}

		if ( ! res ) console.log( 'Failed to buy node' )

	} else console.log( 'Cannot buy new node' )

}

export default {

	encryptPrivateKeys,
	decryptPrivateKeys,
	retry,
	transferCrn,
	getCrnBalance,
	swapCrnForCro,
	getNumberOfNodes,
	hasClaimedNodeRewards,
	claimNodeRewards,
	buyNode,
	claimAndBuy

}
