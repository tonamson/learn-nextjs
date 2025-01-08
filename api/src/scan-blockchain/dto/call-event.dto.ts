import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CallEventDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    event_name: string
}
