import { IsNotEmpty, IsString } from 'class-validator'

export class ReloadTimeoutDto {
    @IsNotEmpty()
    @IsString()
    event_name: string
}
