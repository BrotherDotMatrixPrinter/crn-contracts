
import fs from 'fs'
import ContractController from './contract/ContractController.js'
import { encryptPrivateKeys, decryptPrivateKeys } from './contract/Functions.js'

fs.writeFileSync( 'PrivateKeys.json', JSON.stringify( encryptPrivateKeys( process.argv[ 2 ] || '' ) ), 'utf8' )

const privateKeys = decryptPrivateKeys( process.argv[ 2 ] || '' )
const mainAddress = privateKeys.splice( 0, 1 )[ 0 ]

if ( mainAddress === undefined ) {

	console.log( 'No private keys found.' )
	process.exit( 0 )

}

const mainContractController = new ContractController( mainAddress )

mainContractController.balance.addObserver( async response => {

	if ( response.loading ) console.log( 'Loading balance...' )
	else if ( response.complete ) console.log( `Balance: ${ response.data } CRN` )
	else console.log( 'Failed to load balance' )

} )

mainContractController.numberOfNodes.addObserver( async response => {

	if ( response.loading ) console.log( 'Loading number of nodes...' )
	else if ( response.complete ) console.log( `Number of nodes: ${ response.data }` )
	else console.log( 'Failed to load number of nodes' )

} )

mainContractController.getBalance()
mainContractController.getNumberOfNodes()