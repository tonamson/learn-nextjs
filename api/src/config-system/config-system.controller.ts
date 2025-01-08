import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ConfigSystemService } from './config-system.service'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/enums/role.enum'
import { AdminGuard } from '../guards/admin.guard'
import { UpdateConfigDto } from './dto/update-config.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('System config')
@Controller('config')
export class ConfigSystemController {
    constructor(private readonly configSystemService: ConfigSystemService) {}

    @Roles(Role.ADMIN_FULL)
    @UseGuards(AdminGuard)
    @Post('get-all-config')
    async getAllConfig() {
        return this.configSystemService.getAllConfig()
    }

    @Roles(Role.ADMIN_FULL)
    @UseGuards(AdminGuard)
    @Post('update-config')
    async updateConfig(@Body() dto: UpdateConfigDto, @Req() req: any) {
        return this.configSystemService.updateConfig(dto, req.user)
    }
}
