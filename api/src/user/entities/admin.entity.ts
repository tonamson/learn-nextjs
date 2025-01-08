import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'
import { Type } from 'class-transformer'
import * as paginate from 'mongoose-paginate-v2'
import { Role } from './role.entity'

@Schema({ versionKey: false, collection: 'admins', timestamps: true })
export class Admin {
    @Prop({ required: true, unique: true, lowercase: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
        ref: Role.name,
    })
    @Type(() => Role)
    role_id: Role
}

export type AdminDocument = HydratedDocument<Admin>
export const AdminSchema = SchemaFactory.createForClass(Admin)
AdminSchema.plugin(paginate)
