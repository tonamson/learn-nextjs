import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema({ versionKey: false, collection: 'roles', timestamps: true })
export class Role {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    keys: string[]
}

export type RoleDocument = HydratedDocument<Role>
export const RoleSchema = SchemaFactory.createForClass(Role)
