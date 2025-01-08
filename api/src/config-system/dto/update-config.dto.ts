import { IsNotEmpty } from 'class-validator'

export class UpdateConfigDto {
    @IsNotEmpty()
    type: string

    @IsNotEmpty()
    value: any
}
