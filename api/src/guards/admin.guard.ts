import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { I18nService } from 'nestjs-i18n'
import { Translate } from '../i18n/translate'

@Injectable()
export class AdminGuard extends Translate implements CanActivate {
    constructor(
        readonly i18n: I18nService,
        private jwtService: JwtService,
        private reflector: Reflector,
        private configService: ConfigService
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
        const user = request['user']
        const current_user_roles = user.ability

        let next = false
        for (let i = 0; i < current_user_roles.length; i++) {
            // check require role
            if (ability.includes(current_user_roles[i])) {
                next = true
                break
            }
        }
        if (!next) {
            throw new UnauthorizedException(this.t('auth.access_denied'))
        }

        return next
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
