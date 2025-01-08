import { SetMetadata, UseInterceptors, applyDecorators } from '@nestjs/common'
import { NoCacheInterceptor } from '../interceptor/nocache.interceptor'

export function NoCache(disableCache = true) {
    return applyDecorators(SetMetadata('disableCache', disableCache), UseInterceptors(NoCacheInterceptor))
}
