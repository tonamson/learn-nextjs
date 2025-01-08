import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CronjobService } from './cronjob.service'
import { ReloadTimeoutDto } from './dto/reload-timeout.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/enums/role.enum'
import { AdminGuard } from '../guards/admin.guard'
import { ReloadTaskDto } from './dto/reload-task.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Cronjob')
@Controller('cronjob')
@ApiBearerAuth()
export class CronjobController {
    constructor(private readonly cronjobService: CronjobService) {}

    @Roles(Role.ADMIN_FULL)
    @UseGuards(AdminGuard)
    @Post('task-list')
    async getTaskList() {
        return this.cronjobService.getTaskList()
    }

    @Roles(Role.ADMIN_FULL)
    @UseGuards(AdminGuard)
    @Post('reload-timeout')
    async reloadTaskTimeout(@Body() dto: ReloadTimeoutDto) {
        return this.cronjobService.reloadTaskTimeout(dto.event_name)
    }

    @Roles(Role.ADMIN_FULL)
    @UseGuards(AdminGuard)
    @Post('reload-cronjob')
    async reloadTaskCronjob(@Body() dto: ReloadTaskDto) {
        return this.cronjobService.reloadTaskCronjob(dto.event_name)
    }
}
