import { getAddress } from 'ethers'

export class ERC20Token {
    chainId: number
    address: string
    name: string
    symbol: string
    decimals: number

    constructor(chainId: number, address: string, name: string, symbol: string, decimals: number) {
        this.chainId = chainId
        this.address = getAddress(address)
        this.name = name
        this.symbol = symbol
        this.decimals = decimals
    }
}
