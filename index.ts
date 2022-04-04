import ContractController from './ethers_util/ContractController.js'
import { decryptPrivateKeys, claimBuyTransferSwap } from './ethers_util/Functions.js'

const run = async () => {

	const privateKeys = decryptPrivateKeys( process.argv[ 2 ] || '' )
	const mainAddress = privateKeys.splice( 0, 1 )[ 0 ]

	if ( mainAddress === undefined ) {

		console.log( 'No private keys found.' )
		process.exit( 0 )

	}

	const contractControllers = privateKeys.map( privateKey => new ContractController( privateKey ) )
	const mainContractController = new ContractController( mainAddress )

	for ( const contractController of contractControllers )
		await claimBuyTransferSwap( contractController, mainAddress, true )

	await claimBuyTransferSwap( mainContractController, mainAddress, false, true )

}

run()

