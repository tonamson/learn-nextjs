import { IsNotEmpty, IsString } from 'class-validator'

export class TransferNlpDto {
    @IsNotEmpty()
    to_wallet: string

    @IsNotEmpty()
    @IsString()
    amount: string
}
