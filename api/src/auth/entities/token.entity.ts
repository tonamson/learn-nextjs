import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema({ versionKey: false, collection: 'verify_tokens', timestamps: true })
export class Token {
    @Prop({ required: true, index: true })
    token: string

    @Prop({ required: false, uppercase: true, default: 'AUTH' })
    module: string

    @Prop({ required: false, default: Date.now, expires: '10m' })
    expireAt: Date
}

export type TokenDocument = HydratedDocument<Token>
export const TokenSchema = SchemaFactory.createForClass(Token)
TokenSchema.index({ token: 1, module: 1 }, { background: true, sparse: true })
