import { Module } from '@nestjs/common'
import { TelegramService } from './telegram.service'
import { MongooseModule } from '@nestjs/mongoose'
import { TelegramMessageSchedule, TelegramMessageScheduleSchema } from './entities/telegram-message-schedule.entity'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TelegramMessageSchedule.name,
                schema: TelegramMessageScheduleSchema,
            },
        ]),
    ],
    controllers: [],
    providers: [TelegramService],
    exports: [TelegramService],
})
export class TelegramModule {}
