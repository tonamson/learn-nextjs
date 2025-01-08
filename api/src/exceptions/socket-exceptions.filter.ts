import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import * as _ from 'lodash'
import { BaseWsExceptionFilter } from '@nestjs/websockets'

@Catch()
export class SocketExceptionsFilter extends BaseWsExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        super.catch(exception, host)
    }
}
