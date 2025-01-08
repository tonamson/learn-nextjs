import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from '../user/entities/user.entity'
import { Model } from 'mongoose'
import { Translate } from '../i18n/translate'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class RoleGuard extends Translate implements CanActivate {
    constructor(
        readonly i18n: I18nService,
        private jwtService: JwtService,
        private reflector: Reflector,
        private configService: ConfigService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectModel(User.name) private mUser: Model<UserDocument>
    ) {
        super(i18n)
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ability = this.reflector.get<any[]>('ability', context.getHandler())
        if (!ability) {
            return true
        }
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        try {
            request['user'] = await this.jwtService.verifyAsync(token, {
                secret: await this.configService.get('JWT_KEY'),
            })
        } catch {
            throw new UnauthorizedException(this.t('auth.please_login_again'))
        }
        // const user = request['user']
        // const current_user_roles = user.ability
        //
        // let next = false
        // for (let i = 0; i < current_user_roles.length; i++) {
        //     // check require role
        //     if (ability.includes(current_user_roles[i])) {
        //         next = true
        //         break
        //     }
        // }
        // if (!next) {
        //     throw new UnauthorizedException(this.t('auth.access_denied'))
        // }
        // return next
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
