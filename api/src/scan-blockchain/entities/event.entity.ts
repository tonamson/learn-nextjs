import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as paginate from 'mongoose-paginate-v2'
import { EventStatus } from '../enums/event-status.enum'

@Schema({ versionKey: false, timestamps: true, collection: 'events' })
export class Event {
    @Prop({ required: true })
    contract_address: string

    @Prop({ required: false, default: false })
    mainnet: boolean

    @Prop({ required: true })
    event_name: string

    @Prop({ required: true })
    abi: string

    @Prop({ required: false, default: 0 })
    block: number

    @Prop({ type: Array, required: true })
    attrs: []

    @Prop({ required: false, default: EventStatus.IN_ACTIVE, enum: EventStatus })
    status: EventStatus

    @Prop({ required: false, default: false })
    multiple_event: boolean
}

export type EventDocument = HydratedDocument<Event>
export const EventSchema = SchemaFactory.createForClass(Event)
EventSchema.plugin(paginate)
