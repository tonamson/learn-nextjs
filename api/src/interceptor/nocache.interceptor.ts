import { CacheInterceptor } from '@nestjs/cache-manager'
import { ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class NoCacheInterceptor extends CacheInterceptor {
    intercept(context: ExecutionContext, next: any) {
        const request = context.switchToHttp().getRequest()
        const disableCache = this.reflector.get<boolean>('disableCache', context.getHandler())

        if (disableCache && request.method === 'GET') {
            return next.handle()
        }

        return super.intercept(context, next)
    }
}
