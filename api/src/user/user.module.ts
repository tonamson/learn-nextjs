import {Global, Module} from '@nestjs/common'
import {UserService} from './user.service'
import {UserController} from './user.controller'
import {MongooseModule} from '@nestjs/mongoose'
import {Role, RoleSchema} from './entities/role.entity'
import {User, UserSchema} from './entities/user.entity'
import {BlockchainModule} from '../blockchain/blockchain.module'
import {TelegramModule} from '../telegram/telegram.module'
import {EventLog, EventLogSchema} from '../scan-blockchain/entities/event-log.entity'
import {ConfigSystem, ConfigSystemSchema} from '../config-system/entities/config-system.entity'
import {CronjobModule} from '../cronjob/cronjob.module'
import {WithdrawToken, WithdrawTokenSchema} from './entities/withdraw-token.entity'
import {ConfigSystemModule} from '../config-system/config-system.module'
import {WithdrawTokenService} from './withdraw-token/withdraw-token.service'

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Role.name, schema: RoleSchema },
            { name: EventLog.name, schema: EventLogSchema },
            { name: ConfigSystem.name, schema: ConfigSystemSchema },
            { name: WithdrawToken.name, schema: WithdrawTokenSchema },
        ]),
        BlockchainModule,
        TelegramModule,
        CronjobModule,
        ConfigSystemModule,
    ],
    controllers: [UserController],
    providers: [UserService, WithdrawTokenService, ],
    exports: [UserService, WithdrawTokenService],
})
export class UserModule {}
