import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as paginate from 'mongoose-paginate-v2'

@Schema({ versionKey: false, collection: 'config_systems', timestamps: true })
export class ConfigSystem {
    @Prop({ required: true })
    type: string

    @Prop({ required: false, default: null })
    description: string

    @Prop({ type: Object, required: false, default: null })
    value: any
}

export type ConfigSystemDocument = ConfigSystem & Document
export const ConfigSystemSchema = SchemaFactory.createForClass(ConfigSystem)
ConfigSystemSchema.plugin(paginate)
