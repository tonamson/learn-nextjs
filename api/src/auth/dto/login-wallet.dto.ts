import { IsEthereumAddress, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginWalletDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ default: '' })
    wallet_address: string
}
