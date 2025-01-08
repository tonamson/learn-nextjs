import { IsInt, IsNotEmpty, IsObject, IsOptional, Min } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class HistoryMiningDto {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @ApiProperty({ default: 1 })
    page: number

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @ApiProperty({ default: 10 })
    limit: number
    
    @IsOptional()
    @ApiPropertyOptional({ default: {} })
    @IsObject()
    query: any
}
