import { Schema, model as Model } from 'mongoose'

const ClaimSchema = new Schema( {

	date: { type: String },
	reward: { type: String }

} )

export const ClaimModel = Model( 'Claims', ClaimSchema )

const BuySchema = new Schema( {

	date: { type: String },
	address: { type: String },
	price: { type: String }

} )

export const BuyModel = Model( 'Buys', BuySchema )

const TransferSchema = new Schema( {

	date: { type: String },
	fromAddress: { type: String },
	toAddress: { type: String },
	token: { type: String },
	amount: { type: String }

} )

export const TransferModel = Model( 'Transfers', TransferSchema )

const SwapSchema = new Schema( {

	date: { type: String },
	address: { type: String },
	fromToken: { type: String },
	toToken: { type: String },
	amount: { type: String }

} )

export const SwapModel = Model( 'Swaps', SwapSchema )