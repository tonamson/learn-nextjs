import {Injectable, Logger, OnModuleInit} from '@nestjs/common'
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {Role, RoleDocument} from '../user/entities/role.entity'
import {User, UserDocument} from '../user/entities/user.entity'
import {ConfigSystem, ConfigSystemDocument} from '../config-system/entities/config-system.entity'
import {ConfigService} from '@nestjs/config'
import {Event, EventDocument} from '../scan-blockchain/entities/event.entity'
import * as bcrypt from 'bcrypt'
import {Admin, AdminDocument} from '../user/entities/admin.entity'

@Injectable()
export class SetupService implements OnModuleInit {
    private readonly logger = new Logger(SetupService.name)

    constructor(
        private configService: ConfigService,
        @InjectModel(Role.name) private mRole: Model<RoleDocument>,
        @InjectModel(User.name) private mUser: Model<UserDocument>,
        @InjectModel(Admin.name) private mAdmin: Model<AdminDocument>,
        @InjectModel(ConfigSystem.name) private mConfigSystem: Model<ConfigSystemDocument>,
        @InjectModel(Event.name) private mEvent: Model<EventDocument>,
    ) {}

    async onModuleInit() {
        if (this.configService.get('AUTO_SETUP') == 'true') {
            // chỉ cài đặt khi AUTO_SETUP = true ở .env
            if (Number(process.env.NODE_APP_INSTANCE) || 0 > 0) {
                return
            }
            await this.setupRole()
            await Promise.all([this.setupAdmin()])
            await Promise.all([])
        }
        this.logger.warn('Call event setup success')
    }
    
    private async setupRole() {
        const data = [
            {
                name: 'User',
                keys: ['member.full'],
            },
            {
                name: 'Admin',
                keys: ['admin.full'],
            },
        ]
        for (let i = 0; i < data.length; i++) {
            const check = await this.mRole.findOneAndUpdate(
                {
                    name: data[i].name,
                },
                {
                    keys: data[i].keys,
                },
                { upsert: true, new: true }
            )
        }
        return true
    }

    private async setupAdmin() {
        const role = await this.mRole.findOne({ name: 'Admin' })
        const admin = [
            {
                username: 'admin',
                password: bcrypt.hashSync('admin@123', 8),
                role_id: role._id,
                email: 'admin@localhost.com',
            },
            {
                username: 'kanni',
                password: bcrypt.hashSync('admin@123', 8),
                role_id: role._id,
                email: 'kanni@localhost.com',
            },
        ]
        for (const user of admin) {
            await this.mAdmin.findOneAndUpdate({ username: user.username }, user, { upsert: true })
        }
    }
}
