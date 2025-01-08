import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {Event, EventSchema} from './entities/event.entity'
import {EventLog, EventLogSchema} from './entities/event-log.entity'
import {TelegramModule} from '../telegram/telegram.module'
import {BlockchainModule} from '../blockchain/blockchain.module'
import {CronjobModule} from '../cronjob/cronjob.module'
import {User, UserSchema} from '../user/entities/user.entity'
import {Role, RoleSchema} from '../user/entities/role.entity'
import {UserModule} from '../user/user.module'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Event.name, schema: EventSchema },
            { name: User.name, schema: UserSchema },
            { name: EventLog.name, schema: EventLogSchema },
            { name: Role.name, schema: RoleSchema },
        ]),
        TelegramModule,
        BlockchainModule,
        CronjobModule,
        UserModule,
    ],
    providers: [],
})
export class ScanBlockchainModule {}
