import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { AuthModel } from "src/auth/entities/auth.entity";

@Schema({})
export class Category {

    @Prop({ required: true })
    name: string[];

    @Prop({ type: Types.ObjectId, ref: AuthModel })
    user: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category)
export const CategoryModel = 'Category'
export type CategoryDocument = Document & Category
