import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { CustomSocketAdapter } from './socket/socket.adapter'
import * as fs from 'fs'
import * as path from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'
import { I18nValidationPipe } from 'nestjs-i18n'
import * as basicAuth from 'express-basic-auth'

/**
 * Thư viện hỗ trợ lưu log ra file
 */
import 'winston-daily-rotate-file'
import { WinstonModule, utilities } from 'nest-winston'
import * as winston from 'winston'

async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync(path.join(__dirname, '..', '/ssl/' + process.env.SSL_PRIVATE_KEY)),
        cert: fs.readFileSync(path.join(__dirname, '..', '/ssl/' + process.env.SSL_PRIVATE_CRT)),
        cors: true,
    }
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        httpsOptions,
        cors: true,
        logger: WinstonModule.createLogger({
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: `logs/%DATE%-error.log`,
                    level: 'error',
                    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
                    datePattern: 'YYYY-MM-DD',
                    maxSize: '20m',
                    maxFiles: '30d',
                }),
                new winston.transports.DailyRotateFile({
                    filename: `logs/%DATE%-warn.log`,
                    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
                    level: 'warn',
                    datePattern: 'YYYY-MM-DD',
                    maxSize: '20m',
                    maxFiles: '30d',
                }),
                new winston.transports.Console({
                    silent: !(process.env.DEBUG === 'true'),
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        utilities.format.nestLike('OmBank', {
                            colors: true,
                            prettyPrint: true,
                            processId: true,
                        })
                    ),
                }),
            ],
        }),
    })
    app.disable('x-powered-by')

    app.enableCors((req, callback) => {
        // let corsOptions
        //
        // if (process.env.JWT_KEY == 'development' || String(req.header('Origin')).includes(process.env.DOMAIN)) {
        //     corsOptions = {
        //         credentials: true,
        //         origin: true,
        //         methods: ['GET', 'POST'],
        //     }
        // } else {
        //     corsOptions = { origin: false } // disable CORS for this request
        // }
        // callback(null, corsOptions) // callback expects two parameters: error and options
        callback(null, {
            credentials: true,
            origin: '*',
            methods: ['GET', 'POST'],
        }) // callback expects two parameters: error and options
    })

    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalPipes(new I18nValidationPipe())
    // redis
    const redisIoAdapter = new CustomSocketAdapter(app)
    await redisIoAdapter.connectToRedis()
    app.useWebSocketAdapter(redisIoAdapter)
    app.use(compression())

    app.useGlobalPipes(new ValidationPipe({ transform: true }))

    app.use(
        // Paths you want to protect with basic auth
        '/api*',
        basicAuth({
            challenge: true,
            users: { admin: process.env.API_DOCUMENT_PASSWORD },
        })
    )

    const config = new DocumentBuilder()
        .setTitle('API Docs')
        .setDescription('API Docs')
        .setVersion('1.0')
        .addBearerAuth()
        .addGlobalParameters({
            in: 'header',
            required: false,
            name: 'x-lang',
            schema: { example: 'en' },
        })
        .build()
    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('api', app, document)

    // folder upload file image, mp3
    app.useStaticAssets(path.resolve(process.cwd(), `storages`), { index: false, prefix: '/uploads' })

    app.useStaticAssets(path.join(__dirname, '..', 'public'), { prefix: '/public/' })

    await app.listen(process.env.PORT)
    console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
