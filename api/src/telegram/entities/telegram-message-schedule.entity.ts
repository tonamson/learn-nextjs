import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema({
    versionKey: false,
    collection: 'telegram_message_schedules',
    timestamps: true,
})
export class TelegramMessageSchedule {
    @Prop({ required: true })
    message: string

    @Prop({ required: true })
    room_id: string

    @Prop({ required: false, default: {}, type: Object })
    options: any

    @Prop({ required: false, default: null, type: Array })
    images: []
}
export type TelegramMessageScheduleDocument = HydratedDocument<TelegramMessageSchedule>
export const TelegramMessageScheduleSchema = SchemaFactory.createForClass(TelegramMessageSchedule)
