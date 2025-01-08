import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_KEY,
        })
    }

    async validate(payload: { roles: [string] }) {
        return payload
    }
}
