import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as paginate from 'mongoose-paginate-v2'

@Schema({ versionKey: false, timestamps: true, collection: 'job_schedules' })
export class JobSchedule {
    @Prop({ required: true, unique: true })
    task_name: string

    @Prop({ required: true })
    task_time: string

    @Prop({ required: true, uppercase: true })
    type: string
}

export type JobScheduleDocument = HydratedDocument<JobSchedule>
export const JobScheduleSchema = SchemaFactory.createForClass(JobSchedule)
JobScheduleSchema.plugin(paginate)
