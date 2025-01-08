import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDAppDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ default: '' })
    signature: string
}
