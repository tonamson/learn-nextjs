import { Module } from '@nestjs/common'
import { ConfigSystemService } from './config-system.service'
import { ConfigSystemController } from './config-system.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigSystem, ConfigSystemSchema } from './entities/config-system.entity'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ConfigSystem.name, schema: ConfigSystemSchema },
        ]),
    ],
    controllers: [ConfigSystemController],
    providers: [ConfigSystemService],
    exports: [ConfigSystemService],
})
export class ConfigSystemModule {}
