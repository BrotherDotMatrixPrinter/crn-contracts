import crypto from 'crypto'
import { Env, Private_Keys } from '../JsonImporter.js'
import ContractController, { Response } from './ContractController.js'

export const encryptPrivateKeys = ( password: string ) => {

	const cipher = crypto.createCipher( 'aes256', password )
	const encryptedKeys = []

	for ( const privateKey of Private_Keys )
		if ( ! ( privateKey[ 1 ] ) )
			encryptedKeys.push( [ cipher.update( privateKey[ 0 ] as string, 'utf8', 'hex' ) + cipher.final( 'hex' ), true ] )
		else encryptedKeys.push( privateKey )

	return encryptedKeys

}

export const decryptPrivateKeys = ( password: string ) => {

	const decipher = crypto.createDecipher( 'aes256', password )

	const decryptedKeys = []

	for ( const privateKey of Private_Keys )
		decryptedKeys.push( decipher.update( privateKey[ 0 ] as string, 'hex', 'utf8' ) + decipher.final( 'utf8' ) )

	return decryptedKeys

}

export const claimBuyTransferSwap = async (

	contractController: ContractController,
	to: string,
	claim: boolean = false,
	buy: boolean = false,
	transfer: boolean = false,
	swap: boolean = false

) => {

	console.log( '====================' )
	console.log( `Address: ${ contractController.walletAddress }` )

	let balance = await contractController.getBalance() as Response< number >
	let numberOfNodes = await contractController.getNumberOfNodes() as Response< number >
	const hasClaimed = await contractController.hasClaimed() as Response< boolean >

	if ( claim && hasClaimed.complete && hasClaimed.data === false ) {

		console.log( 'Claiming...' )

		if ( ! ( await contractController.claim() ).complete )
			console.log( 'Failed to claim' )

		else {

			balance = await contractController.getBalance() as Response< number >

			console.log( 'Finished claiming' )
			console.log( `Balance: ${ balance } CRN` )

		}

	}

	while ( buy && balance.complete && balance.data >= 20 && numberOfNodes.complete && numberOfNodes.data < 100 ) {

		console.log( 'Buying node...' )

		if ( ! ( await contractController.buyNode() ).complete ) {

			console.log( 'Failed to buy node' )

			break

		} else {

			balance = await contractController.getBalance() as Response< number >
			numberOfNodes = await contractController.getNumberOfNodes() as Response< number >

			console.log( 'Finished buying node' )
			console.log( `Balance: ${ balance } CRN` )

		}

	}

	if ( transfer && balance.complete && balance.data >= Env.TRANSFER_LIMIT + Env.SWAP_AMOUNT ) {

		const amount = balance.data - Env.SWAP_AMOUNT

		console.log( 'Transferring...' )

		if ( ! ( await contractController.transferCrn( amount.toString(), to ) ).complete )
			console.log( 'Failed to transfer' )

		else {

			balance = await contractController.getBalance() as Response< number >

			console.log( 'Finished transferring' )
			console.log( `Balance: ${ balance } CRN` )

		}

	}

	if ( swap && balance.complete && balance.data >= Env.SWAP_AMOUNT ) {

		console.log( 'Swapping...' )

		if ( ! ( await contractController.swapCrnForCro( Env.SWAP_AMOUNT.toString() ) ).complete )
			console.log( 'Failed to swap' )

		else {

			balance = await contractController.getBalance() as Response< number >

			console.log( 'Finished swapping' )
			console.log( `Balance: ${ balance } CRN` )

		}

	}

	console.log( '====================' )

}

export default {

	encryptPrivateKeys,
	decryptPrivateKeys,
	claimBuyTransferSwap

}
