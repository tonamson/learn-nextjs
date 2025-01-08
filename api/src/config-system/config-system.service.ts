import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { GetSpecialConfigDto } from './dto/get-special-config.dto'
import { ConfigSystem, ConfigSystemDocument } from './entities/config-system.entity'
import { UserInterface } from '../auth/interfaces/user.interface'
import { UpdateConfigDto } from './dto/update-config.dto'

@Injectable()
export class ConfigSystemService {
    private readonly logger = new Logger(ConfigSystemService.name)

    constructor(
        private configService: ConfigService,

        @InjectModel(ConfigSystem.name) private mConfigSystem: Model<ConfigSystemDocument>
    ) {}

    getSpecialConfig(dto: GetSpecialConfigDto) {
        return this.mConfigSystem.findOne({ type: dto.type }).select('type description value')
    }

    getAllConfig() {
        return this.mConfigSystem.find()
    }

    async updateConfig(dto: UpdateConfigDto, user: UserInterface) {
        return this.mConfigSystem.findOneAndUpdate(
            {
                type: dto.type,
            },
            { value: dto.value },
            { new: true }
        )
    }
}
