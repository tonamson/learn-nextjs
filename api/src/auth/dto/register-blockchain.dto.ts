import { IsEthereumAddress, IsMongoId, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { ZeroAddress } from 'ethers'

export class RegisterBlockchainDto {
    @IsNotEmpty()
    @IsEthereumAddress()
    @ApiProperty({ default: ZeroAddress })
    wallet_address: string

    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty({ default: '' })
    parent_id: string
}
