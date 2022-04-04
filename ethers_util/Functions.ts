import ContractController from './ContractController'
import ENV from '../ENV'

export const claimAndBuy = async ( privateKey: string ) => {

	const contractController = new ContractController( privateKey )
	const balance = await contractController.getBalance()
	const numberOfNodes = await contractController.getNumberOfNodes()

	console.log( `Address: ${ contractController.Wallet.address }` )
	console.log( `Balance: ${ balance }` )
	console.log( `Number of Nodes: ${ numberOfNodes }` )

	let res = false
	let counter = 1

	while ( ! res || counter <= ENV.MAX_RETRIES ) {

		res = await contractController.claimRewards()

		if ( ! res ) {

			console.log( `Retrying... Attempt: ${ counter }` )
			counter++

		}

	}

	if ( ! res ) console.log( 'Failed to claim!' )

	res = false
	counter = 1

	while ( balance >= 50 && numberOfNodes < 100 && ! res && counter <= ENV.MAX_RETRIES ) {

		res = await contractController.buyNode()

		if ( ! res ) {

			console.log( `Retrying... Attempt: ${ counter }` )
			counter++

		}

	}

	if ( ! res ) console.log( 'Failed to buy node!' )

}
