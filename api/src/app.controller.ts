import { Body, Controller, Get, Post, Res } from '@nestjs/common'
import { I18n, I18nContext, I18nService } from 'nestjs-i18n'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly i18n: I18nService
    ) {}

    @Post()
    async getHello(@I18n() i18n: I18nContext) {
        return {
            data: this.appService.getHello(),
            message: i18n.t('test.hello'),
        }
    }
}
