import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class IPMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        let ip = req.headers['x-real-ip'] || req['connection']['remoteAddress']
        const whitelist: string[] = process.env.IPS.split(',')
        ip = ip.toString().replace('::ffff:', '')
        if (whitelist.indexOf(ip) !== -1) {
            return next()
        }
        throw Error(`Ip ${String(ip)} is not validate`)
    }
}
