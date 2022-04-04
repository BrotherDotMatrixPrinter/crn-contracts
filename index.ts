import ContractController from './ethers_util/ContractController.js'
import ContractFunctions from './ethers_util/Functions.js'

const run = async () => {

	const privateKeys = ContractFunctions.decryptPrivateKeys( process.argv[ 2 ] || '' )
	const mainAddress = privateKeys.splice( 0, 1 )[ 0 ]

	if ( mainAddress === undefined ) {

		console.log( 'No private keys found.' )
		process.exit( 0 )

	}

	const contractControllers = privateKeys.map( privateKey => new ContractController( privateKey ) )
	const mainContractController = new ContractController( mainAddress )

	for ( const contractController of contractControllers )
		await ContractFunctions.claimBuyTransferSwap( contractController, mainAddress, true )

	await ContractFunctions.claimBuyTransferSwap( mainContractController, mainAddress, false, true )

}

run()

