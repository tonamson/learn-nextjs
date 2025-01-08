import { Module } from '@nestjs/common'
import { BlockchainService } from './blockchain.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigSystem, ConfigSystemSchema } from '../config-system/entities/config-system.entity'

@Module({
    imports: [MongooseModule.forFeature([{ name: ConfigSystem.name, schema: ConfigSystemSchema }])],
    providers: [BlockchainService],
    exports: [BlockchainService],
})
export class BlockchainModule {}
