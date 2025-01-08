import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class GetBinaryTreeDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    wallet_address: string
}
