import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { AccountModel } from "src/account/entities/account.entity";
import { CategoryModel } from "src/category/entities/category.entity";

@Schema()
export class Auth {

    @Prop({ })
    name: string;

    @Prop({ unique: true })
    email: string;
    
    @Prop({ })
    password: string;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({})
    expireIn: number;

    @Prop({})
    token: string;
}


export const AuthSchema = SchemaFactory.createForClass(Auth) 
export const AuthModel = 'Auth'
export type AuthDocument = Auth & Document
