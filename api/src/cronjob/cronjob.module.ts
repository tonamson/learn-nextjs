import { Module } from '@nestjs/common'
import { CronjobService } from './cronjob.service'
import { CronjobController } from './cronjob.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { JobSchedule, JobScheduleSchema } from './entities/job-schedule.entity'

@Module({
    imports: [MongooseModule.forFeature([{ name: JobSchedule.name, schema: JobScheduleSchema }])],
    controllers: [CronjobController],
    providers: [CronjobService],
    exports: [CronjobService],
})
export class CronjobModule {}
