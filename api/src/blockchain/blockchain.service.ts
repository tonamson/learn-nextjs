import { Injectable, Logger } from '@nestjs/common'
import { EventLog, formatUnits, JsonRpcProvider, toBigInt } from 'ethers'
import { ConfigService } from '@nestjs/config'
import { Translate } from '../i18n/translate'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class BlockchainService extends Translate {
    private readonly logger = new Logger(BlockchainService.name)

    constructor(
        readonly i18n: I18nService,
        private configService: ConfigService
    ) {
        super(i18n)
    }

    providers() {
        try {
            const mainBscRpc = new JsonRpcProvider('https://cold-greatest-dew.bsc.quiknode.pro/565552a24be1b0dd2f54cb4f985e874341c84120', undefined, { batchMaxCount: 1 })
            const mainBscRpcPublic = new JsonRpcProvider('https://bsc-dataseed.binance.org/', undefined, { batchMaxCount: 1 })
            const localRpc = new JsonRpcProvider('http://127.0.0.1:8545/', undefined, { batchMaxCount: 1 })

            const testnetBsc = new JsonRpcProvider('https://empty-green-arrow.bsc-testnet.quiknode.pro/b44a2ed486e41923804633cd300861bb5ec877e3', undefined, { batchMaxCount: 1 })
            const testnetPublicBsc = new JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/', undefined, { batchMaxCount: 1 })

            return { mainBscRpc, localRpc, testnetBsc, mainBscRpcPublic, testnetPublicBsc }
        } catch (e) {
            this.logger.error(e)
            return null
        }
    }

    async getBlockNumber(provider: JsonRpcProvider) {
        try {
            return provider.getBlockNumber()
        } catch (e) {
            this.logger.error('Provider not found to get block number!')
            return 0
        }
    }

    providerBSC() {
        const JWT_KEY = this.configService.get('JWT_KEY')
        switch (JWT_KEY) {
            case 'development': {
                return this.providers().localRpc
            }
            case 'testnet': {
                return this.providers().testnetBsc
            }
            default: {
                return this.providers().mainBscRpc
            }
        }
    }

    providerPublicBSC() {
        const JWT_KEY = this.configService.get('JWT_KEY')
        switch (JWT_KEY) {
            case 'development': {
                return this.providers().localRpc
            }
            case 'testnet': {
                return this.providers().testnetPublicBsc
            }
            default: {
                return this.providers().mainBscRpcPublic
            }
        }
    }

    async getCallerAddress(log: EventLog): Promise<string> {
        const transactionReceipt = await log.getTransactionReceipt()
        return transactionReceipt.from
    }

    async getTimestampBlock(provider: JsonRpcProvider, blockNumber: number): Promise<number> {
        return (await provider.getBlock(blockNumber)).timestamp
    }

    /**
     * Update 14/7/2024
     * Không còn dùng nữa vì yêu cầu user tự trả phí khi claim
     */
    // async claimTokenERC20(dto: TransferTokenDto, provider: JsonRpcProvider) {
    //     const signer = new Wallet(this.configService.get('POOL_CLAIM_TOKEN'), provider)
    //     const contract = new Contract(
    //         dto.token_address,
    //         [
    //             'function symbol() public view returns (string)',
    //             'function transfer(address to, uint256 value) public returns (bool)',
    //             'function balanceOf(address owner) public view returns (uint256)',
    //             'function decimals() public view returns (uint8)',
    //         ],
    //         signer
    //     )
    //     const symbol = await contract.symbol()
    //     const decimals = await contract.decimals()
    //     const poolBalance = await contract.balanceOf(signer.address)
    //     const amount = parseUnits(String(dto.amount), decimals)
    //     if (poolBalance < amount) {
    //         throw Error(this.t('blockchain.insufficient_balance', { currency: symbol }))
    //     }
    //     try {
    //         const transaction = await contract.transfer(dto.to_wallet, amount)
    //
    //         return {
    //             from: transaction.from,
    //             to: transaction.to,
    //             hash: transaction.hash,
    //         }
    //     } catch (e) {
    //         this.logger.error(`transferToken error: ${e.message} - ${JSON.stringify(dto)}`)
    //         throw Error(e.message)
    //     }
    // }

    convertDataERC20(value: any, attribute_convert: any) {
        let result = null
        const type = attribute_convert.type
        const convert = attribute_convert.convert
        switch (type) {
            case 'string': {
                result = value
                break
            }
            case 'hex': {
                result = Number(toBigInt(value.toString()).toString())
                break
            }
            case 'bignumber': {
                result = toBigInt(value.toString()).toString()
                break
            }
            default:
                result = null
                break
        }

        switch (convert) {
            case 'number': {
                result = Number(result)
                break
            }
            case 'ether': {
                result = formatUnits(String(result), 18)
                break
            }
            case 'ether_number': {
                result = Number(formatUnits(String(result), 18))
                break
            }
            case 'usdt_number': {
                result = Number(formatUnits(String(result), 6))
                break
            }
            default:
                result = String(result)
                break
        }
        return result
    }

    money(money: number | string, fixed = 4) {
        money = Number(money ?? 0) || 0
        const number = new Intl.NumberFormat('en', { currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: fixed })
        return number.format(money)
    }
}
