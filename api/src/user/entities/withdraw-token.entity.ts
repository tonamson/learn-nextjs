import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'
import { Type } from 'class-transformer'
import { User } from './user.entity'
import { WithdrawStatusEnum } from '../enums/withdraw-status.enum'
import * as paginate from 'mongoose-paginate-v2'

/**
 * Rút từ trang overview claim token
 */
@Schema({ versionKey: false, collection: 'withdraw_token_histories', timestamps: true })
export class WithdrawToken {
    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
        ref: User.name,
    })
    @Type(() => User)
    user_id: User

    @Prop({ required: true, enum: ['USDT', 'OM', 'BOM'] })
    symbol: string

    @Prop({ required: true })
    amount: number

    @Prop({ required: true })
    to_wallet: string

    @Prop({ required: false, default: null })
    transaction_hash: string

    @Prop({ required: false, default: WithdrawStatusEnum.PENDING, enum: WithdrawStatusEnum })
    status: string

    @Prop({ required: true })
    deadline: number

    @Prop({ required: true, unique: true, index: true })
    signature: string
}

export type WithdrawTokenDocument = HydratedDocument<WithdrawToken>
export const WithdrawTokenSchema = SchemaFactory.createForClass(WithdrawToken)
WithdrawTokenSchema.plugin(paginate)
WithdrawTokenSchema.index({ deadline: 1, status: 1 }, { background: true, sparse: true })
WithdrawTokenSchema.index({ user_id: 1 }, { background: true, sparse: true })
