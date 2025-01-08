import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../user/entities/user.entity'
import { Role, RoleSchema } from '../user/entities/role.entity'
import { Token, TokenSchema } from './entities/token.entity'
import { Admin, AdminSchema } from '../user/entities/admin.entity'

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Admin.name, schema: AdminSchema },
            { name: Role.name, schema: RoleSchema },
            { name: Token.name, schema: TokenSchema },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
