import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { LoginAdminDto } from './dto/login-admin.dto'
import { I18nService } from 'nestjs-i18n'
import { Translate } from '../i18n/translate'
import { LoginWalletDto } from './dto/login-wallet.dto'
import { LoginDAppDto } from './dto/login-dapp.dto'

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController extends Translate {
    constructor(
        readonly i18n: I18nService,
        private readonly authService: AuthService
    ) {
        super(i18n)
    }

    @Post('get-login-token')
    async getRandomMessage() {
        return this.authService.getRandomMessage('AUTH')
    }

    @Post('login-dapp')
    async loginDApp(@Body() loginDto: LoginDAppDto) {
        return {
            data: await this.authService.loginDApp(loginDto),
            message: this.t('auth.login_successfully'),
        }
    }

    @Post('login-wallet-by-admin')
    async loginWalletByAdmin(@Body() loginDto: LoginWalletDto) {
        return {
            data: await this.authService.loginWalletByAdmin(loginDto),
            message: this.t('auth.login_successfully'),
        }
    }

    @Post('login-admin')
    async loginAdmin(@Body() dto: LoginAdminDto) {
        return this.authService.loginAdmin(dto)
    }
}
