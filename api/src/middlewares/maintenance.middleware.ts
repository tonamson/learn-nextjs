import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class MaintenanceMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        throw Error(`System is maintenance`)
    }
}
