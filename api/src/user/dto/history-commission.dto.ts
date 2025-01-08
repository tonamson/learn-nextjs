import { IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, Min } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { TypeEnum } from '../enums/type.enum'

export class HistoryCommissionDto {
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

    @IsNotEmpty()
    @IsEnum(TypeEnum)
    type: TypeEnum

    @IsOptional()
    @ApiPropertyOptional({ default: {} })
    @IsObject()
    query: any
}
