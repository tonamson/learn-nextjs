import { IsNotEmpty, IsString } from 'class-validator'

export class ReloadTaskDto {
    @IsNotEmpty()
    @IsString()
    event_name: string
}
