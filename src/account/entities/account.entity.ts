import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { AuthModel } from "src/auth/entities/auth.entity";

@Schema({})

export class Account {
    @Prop({ })
    // account: [];
    account: { accountType: string; balance: number }[];

    @Prop({ required: true, type: Types.ObjectId, ref: AuthModel })
    user: Types.ObjectId;
}

export const AccountSchema = SchemaFactory.createForClass(Account)
export const AccountModel = 'Account'
export type AccountDocument = Document & Account

