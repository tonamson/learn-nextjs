import {Inject, Injectable, Logger} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {User, UserDocument} from './entities/user.entity'
import {PaginateModel} from 'mongoose'
import {EventEmitter2} from '@nestjs/event-emitter'
import {CACHE_MANAGER} from '@nestjs/cache-manager'
import {Cache} from 'cache-manager'
import {ConfigService} from '@nestjs/config'
import {I18nService} from 'nestjs-i18n'
import {Translate} from '../i18n/translate'
import {EventLog, EventLogDocument} from '../scan-blockchain/entities/event-log.entity'

@Injectable()
export class UserService extends Translate {
    private readonly logger = new Logger(UserService.name)

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private eventEmitter: EventEmitter2,
        private readonly configService: ConfigService,
        readonly i18n: I18nService,
        @InjectModel(EventLog.name) private mEventLog: PaginateModel<EventLogDocument>,
        @InjectModel(User.name) private mUser: PaginateModel<UserDocument>
    ) {
        super(i18n)
    }

}
