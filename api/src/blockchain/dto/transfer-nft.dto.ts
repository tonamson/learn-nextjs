import { IsEthereumAddress, IsInt, IsNotEmpty } from 'class-validator'

export class TransferNFTDto {
    @IsNotEmpty()
    @IsEthereumAddress()
    to_wallet: string

    @IsNotEmpty()
    @IsInt()
    box_id: number
}
