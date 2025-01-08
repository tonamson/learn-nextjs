import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as paginate from 'mongoose-paginate-v2'
import { EventLogStatusEnum } from '../enums/event-log-status.enum'

@Schema({ versionKey: false, timestamps: true, collection: 'event_logs' })
export class EventLog {
    @Prop({ required: true })
    contract_address: string

    @Prop({ required: true })
    transaction_hash: string

    @Prop({ required: true })
    caller: string

    @Prop({ required: true })
    event_name: string

    @Prop({ required: true })
    block: number

    @Prop({ required: true })
    block_timestamp: number

    @Prop({ type: Object, required: true })
    result: any

    @Prop({ required: false, default: EventLogStatusEnum.PENDING, enum: EventLogStatusEnum })
    status: EventLogStatusEnum

    @Prop({ required: false, default: null })
    error_msg: string
}

export type EventLogDocument = HydratedDocument<EventLog>
export const EventLogSchema = SchemaFactory.createForClass(EventLog)
EventLogSchema.index({ contract_address: -1, transaction_hash: -1, event_name: -1 }, { background: true, sparse: true, unique: true })
EventLogSchema.plugin(paginate)
