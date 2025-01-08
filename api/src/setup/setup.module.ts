import {Module} from '@nestjs/common'
import {SetupService} from './setup.service'
import {MongooseModule} from '@nestjs/mongoose'
import {Role, RoleSchema} from '../user/entities/role.entity'
import {User, UserSchema} from '../user/entities/user.entity'
import {ConfigSystem, ConfigSystemSchema} from '../config-system/entities/config-system.entity'
import {Event, EventSchema} from '../scan-blockchain/entities/event.entity'
import {BlockchainModule} from '../blockchain/blockchain.module'
import {UserModule} from '../user/user.module'
import {Admin, AdminSchema} from '../user/entities/admin.entity'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Role.name, schema: RoleSchema },
            { name: User.name, schema: UserSchema },
            { name: Admin.name, schema: AdminSchema },
            { name: ConfigSystem.name, schema: ConfigSystemSchema },
            { name: Event.name, schema: EventSchema },
        ]),
        BlockchainModule,
        UserModule,
    ],
    providers: [SetupService],
    controllers: [],
})
export class SetupModule {}
