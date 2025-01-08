import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Translate } from '../../i18n/translate'
import { I18nService } from 'nestjs-i18n'
import { ConfigService } from '@nestjs/config'
import { TelegramService } from '../../telegram/telegram.service'
import { BlockchainService } from '../../blockchain/blockchain.service'
import { CronjobService } from '../../cronjob/cronjob.service'

@Injectable()
export class WithdrawTokenService extends Translate implements OnModuleInit {
    private readonly logger = new Logger(WithdrawTokenService.name)

    constructor(
        readonly i18n: I18nService,
        private readonly configService: ConfigService,
        private readonly telegramService: TelegramService,
        private readonly cronjobService: CronjobService,
        private readonly blockchainService: BlockchainService
    ) {
        super(i18n)
    }

    onModuleInit(): any {}
}
