import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginAdminDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @ApiProperty({ default: 'kanni' })
    username: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @ApiProperty({ default: '' })
    password: string
}
