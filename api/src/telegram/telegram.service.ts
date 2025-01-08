import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as TelegramBot from 'node-telegram-bot-api'
import { Cron } from '@nestjs/schedule'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { TelegramMessageSchedule, TelegramMessageScheduleDocument } from './entities/telegram-message-schedule.entity'

@Injectable()
export class TelegramService {
    private readonly logger = new Logger(TelegramService.name)
    private bot: TelegramBot = null
    private isEnable = false

    constructor(
        private configService: ConfigService,
        @InjectModel(TelegramMessageSchedule.name)
        private mTelegramMessageSchedule: Model<TelegramMessageScheduleDocument>
    ) {
        const TELEGRAM_PRIVATE_KEY = this.configService.get('TELEGRAM_PRIVATE_KEY') || ''

        if (TELEGRAM_PRIVATE_KEY && this.configService.get('TELEGRAM_ENABLE') === 'true') {
            this.bot = new TelegramBot(this.configService.get('TELEGRAM_PRIVATE_KEY'), {
                polling: true,
            })
        }
        this.isEnable = this.configService.get('TELEGRAM_ENABLE') === 'true' && TELEGRAM_PRIVATE_KEY.length > 0
        if (!this.isEnable) {
            this.logger.fatal('Telegram is not enable')
        } else {
            this.logger.fatal('Telegram is enable')
            this.cronTelegramMessage()
        }
    }

    sleep(seconds: number) {
        return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
    }

    async cronTelegramMessage() {
        if (!this.isEnable) {
            this.logger.fatal('Telegram is not enable')
        } else {
            const messages = await this.mTelegramMessageSchedule.find().sort({ createdAt: 1 })
            let countError = 0
            let countSuccess = 0
            if (messages.length > 0) {
                this.logger.warn(`Find ${messages.length} messages, sending...`)
            }
            for (let i = 0; i < messages.length; i++) {
                try {
                    if (!messages[i]['room_id']) continue
                    if (messages[i]['images']) {
                        await this.bot.sendMessage(messages[i]['room_id'], messages[i]['message'], {
                            parse_mode: 'HTML',
                            ...messages[i]['options'],
                        })
                        await this.bot.sendMediaGroup(messages[i]['room_id'], messages[i]['images'])
                        await this.mTelegramMessageSchedule.findByIdAndDelete(messages[i]['_id'])
                    } else {
                        await this.bot.sendMessage(messages[i]['room_id'], messages[i]['message'], {
                            parse_mode: 'HTML',
                            ...messages[i]['options'],
                        })
                        await this.mTelegramMessageSchedule.findByIdAndDelete(messages[i]['_id'])
                    }
                    countSuccess++
                } catch (e) {
                    this.logger.error(e.message)
                    countError++
                } finally {
                    await this.sleep(10)
                }
            }

            if (countSuccess != 0 || countError != 0) {
                this.logger.warn(`Send success ${countSuccess} messages, error: ${countError} messages`)
            }
        }

        await this.sleep(1)
        await this.cronTelegramMessage()
    }

    getBot() {
        return this.bot
    }

    async sendMessage(message: string, room_id: string = this.configService.get('TELEGRAM_DEFAULT_ROOM_ID'), options: any = {}, images: any = null) {
        return this.mTelegramMessageSchedule.create({
            message,
            room_id,
            options,
            images,
        })
    }
}
