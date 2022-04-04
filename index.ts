import ContractController from './ethers_util/ContractController.js'
import ContractFunctions, { decryptPrivateKeys, retry } from './ethers_util/Functions.js'

const privateKeys = decryptPrivateKeys( process.argv[ 2 ] || '' )
const mainAddress = privateKeys.splice( 0, 1 )[ 0 ]

if ( mainAddress === undefined ) {

	console.log( 'No private keys found.' )
	process.exit( 0 )

}

const mainContractController = new ContractController( mainAddress )

const run = async () => {

	console.log( 'Claiming...' )

	if ( await retry( 5, () => ContractFunctions.claimNodeRewards( mainContractController ) ) )
		console.log( 'Success' )
	else console.log( 'Fail' )

}

run()
