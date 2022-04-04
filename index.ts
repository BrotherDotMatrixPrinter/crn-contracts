import ContractController from './ethers_util/ContractController.js'
import ContractFunctions, { decryptPrivateKeys, retry } from './ethers_util/Functions.js'

const privateKeys = decryptPrivateKeys( process.argv[ 2 ] || '' )
const mainAddress = privateKeys.splice( 0, 1 )[ 0 ]

if ( mainAddress === undefined ) {

	console.log( 'No private keys found.' )
	process.exit( 0 )

}

const contractControllers = privateKeys.map( privateKey => new ContractController( privateKey ) )
const mainContractController = new ContractController( mainAddress )

const claimBuyTransferSwap = async (

	contractController: ContractController,
	retries: number,
	transfer: boolean = false,
	transferLimit: number = 10,
	swap: boolean = false,
	swapAmount: number = 1

) => {

	let balance = await ContractFunctions.getCrnBalance( contractController )
	let numberOfNodes = await ContractFunctions.getNumberOfNodes( contractController )
	const hasClaimed = await ContractFunctions.hasClaimedNodeRewards( contractController )

	console.log( '====================' )
	console.log( `Address: ${ contractController.wallet.address }` )
	console.log( `Balance: ${ balance } CRN` )
	console.log( `Nodes: ${ numberOfNodes }` )
	console.log( `Claimed: ${ hasClaimed }` )

	if ( ! hasClaimed ) {

		console.log( 'Claiming...' )

		if ( ! await retry( retries, () => ContractFunctions.claimNodeRewards( contractController ) ) )
			console.log( 'Failed to claim' )

	}

	if ( balance >= 20 && numberOfNodes < 100 ) console.log( 'Buying node...' )

	while ( balance >= 20 && numberOfNodes < 100 )
		if ( await retry( retries, () => ContractFunctions.buyNode( contractController ) ) ) {

			balance = balance - 20
			numberOfNodes = numberOfNodes + 1

		} else {

			console.log( 'Failed to buy node' )

			break

		}

	console.log( `Balance: ${ balance }` )
	console.log( `Nodes: ${ numberOfNodes }` )

	if ( balance - ( swap ? swapAmount : 0 ) >= transferLimit && transfer ) {

		console.log( 'Transferring...' )

		if ( ! await retry( retries, () => ContractFunctions.transferCrn( contractController, balance - swapAmount, mainAddress ) ) )
			console.log( 'Failed to transfer' )
		else balance = balance - swapAmount

		if ( swap ) console.log( 'Swapping...' )

		if ( ! await retry( retries, () => ContractFunctions.swapCrnForCro( contractController ) ) )
			console.log( 'Failed to swap' )

	}

	console.log( '====================' )

}

claimBuyTransferSwap( mainContractController, 5 )

for ( const contractController of contractControllers )
	claimBuyTransferSwap( contractController, 5, true )

