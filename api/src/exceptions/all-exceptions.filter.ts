import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import * as _ from 'lodash'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name)

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: HttpException, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost
        const ctx = host.switchToHttp()

        let message: any = 'Error Unknown'

        this.logger.error(exception)

        if (exception['inner']) {
            message = exception['inner']['message']
        } else if (exception['response']) {
            message = exception['response']['message'] ? exception['response']['message'] : exception['response']
        } else {
            message = exception['message']
        }
        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const responseBody = {
            success: false,
            data: null,
            message: _.isArray(message) ? message.join(',') : message,
            // status: httpStatus,
            // timestamp: new Date().toISOString(),
            // path: httpAdapter.getRequestUrl(ctx.getRequest()),
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
    }
}
