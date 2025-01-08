import { ConfigModule, ConfigService } from '@nestjs/config'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SetupModule } from './setup/setup.module'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import * as path from 'path'
import { join } from 'path'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter'
import { JwtModule } from '@nestjs/jwt'
import { CronjobModule } from './cronjob/cronjob.module'
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { SocketModule } from './socket/socket.module'
import { TelegramModule } from './telegram/telegram.module'
import { BlockchainModule } from './blockchain/blockchain.module'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { ScanBlockchainModule } from './scan-blockchain/scan-blockchain.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ConfigSystemModule } from './config-system/config-system.module'
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n'
import { MaintenanceMiddleware } from './middlewares/maintenance.middleware'

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        ThrottlerModule.forRoot({
            errorMessage: 'You are doing that too much. Please try again after 60 seconds.',
            throttlers: [
                {
                    ttl: 60000,
                    limit: 50,
                },
            ],
        }),
        CacheModule.register({
            isGlobal: true,
            ttl: 0,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_KEY'),
                signOptions: { expiresIn: '5d' },
            }),
            inject: [ConfigService],
            global: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '/i18n/'),
                watch: true,
            },
            resolvers: [
                {
                    use: QueryResolver,
                    options: ['x-lang'],
                },
                new HeaderResolver(['x-lang']),
                new CookieResolver(['x-lang']),
                AcceptLanguageResolver,
            ],
        }),
        ScheduleModule.forRoot(),
        SetupModule,
        AuthModule,
        UserModule,
        SocketModule,
        CronjobModule,
        TelegramModule,
        BlockchainModule,
        ScanBlockchainModule,
        EventEmitterModule.forRoot(),
        ConfigSystemModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        // consumer.apply(MaintenanceMiddleware).forRoutes('*')
    }
}
