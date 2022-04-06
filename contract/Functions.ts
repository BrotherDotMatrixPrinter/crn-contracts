import crypto from 'crypto'
import { Private_Keys } from '../JsonImporter.js'

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

export default {

	encryptPrivateKeys,
	decryptPrivateKeys

}
