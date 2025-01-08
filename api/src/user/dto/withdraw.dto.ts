import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ZeroAddress } from 'ethers'

export class WithdrawDto {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @ApiProperty({ default: 1 })
    amount: number

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ default: 'USDT' })
    symbol: string
}
