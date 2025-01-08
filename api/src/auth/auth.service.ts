import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../user/entities/user.entity'
import { Role, RoleDocument } from '../user/entities/role.entity'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { v4 as uuidv4 } from 'uuid'
import { Translate } from '../i18n/translate'
import { I18nService } from 'nestjs-i18n'
import { Token, TokenDocument } from './entities/token.entity'
import { getAddress, verifyMessage } from 'ethers'
import { LoginWalletDto } from './dto/login-wallet.dto'
import axiosCRM from '../utils/axios'
import { LoginDAppDto } from './dto/login-dapp.dto'
import { LoginAdminDto } from './dto/login-admin.dto'
import { Admin, AdminDocument } from '../user/entities/admin.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService extends Translate {
    private readonly logger = new Logger(AuthService.name)

    constructor(
        readonly i18n: I18nService,
        private eventEmitter: EventEmitter2,
        private readonly configService: ConfigService,
        private jwtService: JwtService,

        @InjectModel(User.name) private mUser: Model<UserDocument>,
        @InjectModel(Admin.name) private mAdmin: Model<AdminDocument>,
        @InjectModel(Role.name) private mRole: Model<RoleDocument>,
        @InjectModel(Token.name) private mToken: Model<TokenDocument>
    ) {
        super(i18n)
    }

    async checkValidateToken(token: string, module = 'AUTH') {
        const tokenDoc = await this.mToken.findOne({ token, module })
        if (!tokenDoc) return false
        await this.mToken.findByIdAndDelete(tokenDoc._id)
        return true
    }

    async getRandomMessage(module: string) {
        const token = uuidv4()
        await this.mToken.create({ token, module })
        return token
    }

    async loginDApp(dto: LoginDAppDto): Promise<{ user: any; access_token: string }> {
        // eslint-disable-next-line prefer-const
        let { signature } = dto
        let signerAddress = ''
        try {
            signerAddress = getAddress(verifyMessage('Login wallet', signature))
        } catch (e) {
            throw Error(e.message)
        }

        const payload: any = {}

        try {
            const response: any = await axiosCRM('POST', '/login', {
                UserName: signerAddress,
            })
            const { status, message, data } = response
            if (status !== 200) throw Error(message)
            payload.access_token = data.access_token
            payload.wallet_address = signerAddress
        } catch (e) {
            this.logger.error(e)
            throw Error(e.message ?? e)
        }

        return {
            user: payload,
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async loginWalletByAdmin(loginDto: LoginWalletDto): Promise<{ user: any; access_token: string }> {
        const { wallet_address } = loginDto

        const signerAddress = wallet_address

        const payload: any = {}

        try {
            const response: any = await axiosCRM('POST', '/login', {
                UserName: signerAddress,
            })
            const { status, message, data } = response
            if (status !== 200) throw Error(message)

            payload.wallet_address = wallet_address
            payload.access_token = data.access_token
        } catch (e) {
            this.logger.error(e)
            throw Error(e.message ?? e)
        }

        return {
            user: payload,
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async loginAdmin(dto: LoginAdminDto) {
        const { username, password } = dto

        const user = await this.mAdmin.findOne({ username: username.trim().toLowerCase() }).populate('role_id')
        if (!user) throw Error('Wrong username or Password')
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw new Error('Wrong username or password')
        }
        const ability = user.role_id.keys

        const payload = {
            id: user.id,
            username: user.username,
            ability,
        }

        return {
            payload,
            token: await this.jwtService.signAsync(payload),
        }
    }
}
