import { Injectable, Logger } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'
import { InjectModel } from '@nestjs/mongoose'
import { JobSchedule, JobScheduleDocument } from './entities/job-schedule.entity'
import { Model } from 'mongoose'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class CronjobService {
    private readonly logger = new Logger(CronjobService.name)

    constructor(
        private schedulerRegistry: SchedulerRegistry,
        @InjectModel(JobSchedule.name) private mJobSchedule: Model<JobScheduleDocument>,
        private eventEmitter: EventEmitter2
    ) {}

    async getTaskList() {
        return this.mJobSchedule.find()
    }

    async reloadTaskTimeout(event_name: string) {
        const timeout = this.schedulerRegistry.getTimeout(event_name)
        if (timeout) {
            throw Error('Can not reload timeout because it running')
        }
        this.eventEmitter.emit(event_name)
        return true
    }

    async reloadTaskCronjob(event_name: string) {
        const timeout = this.schedulerRegistry.getCronJob(event_name)
        if (timeout) {
            throw Error('Can not reload cronjob because it running')
        }
        this.eventEmitter.emit(event_name)
        return true
    }

    async addCronJob(name: string, cronTime: string, callback: () => void) {
        await this.mJobSchedule.findOneAndUpdate({ task_name: name, type: 'cronjob' }, { task_time: cronTime }, { new: true, upsert: true })

        const job = new CronJob(cronTime, async () => {
            await this.mJobSchedule.findOneAndUpdate({ task_name: name, type: 'cronjob' }, { task_time: cronTime })
            callback()
        })

        this.schedulerRegistry.addCronJob(name, job)
        job.start()

        this.logger.warn(`Cronjob ${name} added for each at ${cronTime}!`)
    }

    async addInterval(name: string, milliseconds: number, callback: () => void) {
        const interval = setInterval(callback, milliseconds)
        this.schedulerRegistry.addInterval(name, interval)
        this.logger.warn(`${name} successfully added to scheduler!`)
        await this.mJobSchedule.findOneAndUpdate({ task_name: name, type: 'interval' }, { task_time: milliseconds }, { new: true, upsert: true })
    }

    async addTimeout(name: string, milliseconds: number, callback: () => void) {
        try {
            const timeout = setTimeout(callback, milliseconds)
            this.schedulerRegistry.addTimeout(name, timeout)
            await this.mJobSchedule.findOneAndUpdate({ task_name: name, type: 'timeout' }, { task_time: milliseconds }, { new: true, upsert: true })
            return true
        } catch (e) {
            this.logger.error(e.message)
            return false
        }
    }

    async deleteTimeout(name: string) {
        try {
            this.schedulerRegistry.deleteTimeout(name)
            await this.mJobSchedule.findOneAndDelete({ task_name: name })
            return true
        } catch (e) {
            // this.logger.error(e.message)
            return false
        }
    }

    async deleteCronjob(name: string) {
        try {
            this.schedulerRegistry.deleteCronJob(name)
            this.logger.warn(`Cronjob ${name} deleted!`)
            await this.mJobSchedule.findOneAndDelete({ task_name: name })
            return true
        } catch (e) {
            // this.logger.error(e.message)
            return false
        }
    }
}
