import { Global, Module } from '@nestjs/common'
import { SocketGateway } from './socket.gateway'
import { User, UserSchema } from '../user/entities/user.entity'
import { MongooseModule } from '@nestjs/mongoose'

@Global()
@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [SocketGateway],
    exports: [SocketGateway],
})
export class SocketModule {}
