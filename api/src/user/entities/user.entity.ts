import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

import { Type } from 'class-transformer'
import * as paginate from 'mongoose-paginate-v2'
import { Role } from './role.entity'
import { UserStatusEnum } from '../enums/user-status.enum'

@Schema({ versionKey: false, collection: 'users', timestamps: true })
export class User {
    @Prop({ required: true, lowercase: true, unique: true, index: true })
    username: string

    @Prop({ required: true, unique: true, index: true })
    wallet_address: string

    @Prop({
        required: false,
        enum: UserStatusEnum,
        default: UserStatusEnum.IN_ACTIVE,
    })
    status: UserStatusEnum

    @Prop({
        required: false,
        type: SchemaTypes.ObjectId,
        ref: User.name,
        default: null,
    })
    @Type(() => User)
    parent_id: User

    // 2FA
    @Prop({ required: false, default: null })
    two_factor: string

    @Prop({ required: false, default: null })
    two_factor_ts: number

    @Prop({ required: false, default: null })
    two_factor_enabled: boolean
    // end 2FA

    // check login
    @Prop({ required: false, default: '0.0.0.1' })
    ip: string

    @Prop({ required: false, default: null })
    avatar: string

    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
        ref: Role.name,
    })
    @Type(() => Role)
    role_id: Role

    /**
     * Kích hoạt NFT chưa
     */
    @Prop({ required: false, default: false })
    is_active_nft: boolean

    @Prop({ required: false, default: 0 })
    level_nft: number

    @Prop({ required: false, default: 0 })
    expire_active_at: number

    @Prop({ required: false, default: null })
    wallet_otc: string
}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.plugin(paginate)
UserSchema.index({ username: 1 }, { background: true, unique: true })
UserSchema.index({ wallet_address: 1 }, { background: true, unique: true })
UserSchema.index({ parent_id: 1 }, { background: true, sparse: true })
UserSchema.index({ is_active_nft: 1, expire_active_at: 1 }, { background: true, sparse: true })
