import {Controller} from '@nestjs/common'
import {UserService} from './user.service'
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import {I18nService} from 'nestjs-i18n'
import {Translate} from '../i18n/translate'

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController extends Translate {
    constructor(
        readonly i18n: I18nService,
        private readonly userService: UserService
    ) {
        super(i18n)
    }

}