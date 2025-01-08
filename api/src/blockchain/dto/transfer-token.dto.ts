import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class TransferTokenDto {
    @IsNotEmpty()
    to_wallet: string

    @IsNotEmpty()
    @IsNumber()
    amount: string | number

    @IsNotEmpty()
    token_address: string
}
