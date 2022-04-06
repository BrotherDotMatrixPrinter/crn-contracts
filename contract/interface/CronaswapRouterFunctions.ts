import { BigNumber } from 'ethers'

export default interface CronaswapRouterFunctions {
	WETH(): Promise< string[] >

	addLiquidity(
		tokenA: string,
		tokenB: string,
		amountA: BigNumber,
		amountB: BigNumber,
		minA: BigNumber,
		minB: BigNumber,
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	addLiquidityETH(
		token: string,
		amount: BigNumber,
		min: BigNumber,
		ethMin: BigNumber,
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	factory(): Promise< string[] >

	getAmountIn(
		amountOut: BigNumber,
		reserveIn: BigNumber,
		reserveOut: BigNumber
	): Promise< BigNumber[] >

	getAmountOut(
		amountOut: BigNumber,
		reserveIn: BigNumber,
		reserveOut: BigNumber
	): Promise< BigNumber[] >

	getAmountsIn( amount: BigNumber, path: string[] ): Promise< BigNumber[] >
	getAmountsOut( amount: BigNumber, path: string[] ): Promise< BigNumber[] >

	quote(
		amount: BigNumber,
		reserveA: BigNumber,
		reserveB: BigNumber
	): Promise< BigNumber[] >

	removeLiquidity(
		tokenA: string,
		tokenB: string,
		liquidity: BigNumber,
		minA: BigNumber,
		minB: BigNumber,
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	removeLiquidityETH(
		token: string,
		liquidity: BigNumber,
		min: BigNumber,
		ethMin: BigNumber,
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	removeLiquidityETHSupportingFeeOnTransferTokens(
		token: string,
		liquidity: BigNumber,
		min: BigNumber,
		ethMin: BigNumber,
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	removeLiquidityETHWithPermit(
		token: string,
		liquidity: BigNumber,
		min: BigNumber,
		ethMin: BigNumber,
		to: string,
		deadline: BigNumber,
		max: boolean,
		v: BigNumber, // revisit uint8
		r: BigNumber, // revisit bytes32
		s: BigNumber // revisit bytes32

	): Promise< BigNumber[] >

	removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
		token: string,
		liquidity: BigNumber,
		min: BigNumber,
		ethMin: BigNumber,
		to: string,
		deadline: BigNumber,
		max: boolean,
		v: BigNumber, // revisit uint8
		r: BigNumber, // revisit bytes32
		s: BigNumber // revisit bytes32

	): Promise< BigNumber[] >

	removeLiquidityWithPermit(
		tokenA: string,
		tokenB: string,
		liquidity: BigNumber,
		minA: BigNumber,
		minB: BigNumber,
		to: string,
		deadline: BigNumber,
		max: boolean,
		v: BigNumber, // revisit uint8
		r: BigNumber, // revisit bytes32
		s: BigNumber // revisit bytes32
	): Promise< BigNumber[] >

	swapETHForExactTokens(
		amount: BigNumber,
		path: string[],
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	swapExactETHForTokens(
		amount: BigNumber,
		path: string[],
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	swapExactETHForTokensSupportingFeeOnTransferTokens(
		amount: BigNumber,
		path: string[],
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	swapExactTokensForETH(
		amount: BigNumber,
		min: BigNumber,
		path: string[],
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	swapExactTokensForETHSupportingFeeOnTransferTokens(
		amount: BigNumber,
		min: BigNumber,
		path: string[],
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	swapExactTokensForTokens(
		amount: BigNumber,
		min: BigNumber,
		path: string[],
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	swapExactTokensForTokensSupportingFeeOnTransferTokens(
		amount: BigNumber,
		min: BigNumber,
		path: string[],
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	swapTokensForExactETH(
		amount: BigNumber,
		max: BigNumber,
		path: string[],
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >

	swapTokensForExactTokens(
		amount: BigNumber,
		max: BigNumber,
		path: string[],
		to: string,
		deadline: BigNumber
	): Promise< BigNumber[] >
}