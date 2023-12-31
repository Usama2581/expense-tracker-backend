import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { AuthModel } from "src/auth/entities/auth.entity";

@Schema({
    timestamps: true
})

export class Transaction {

    @Prop({ required: true, type: Types.ObjectId, ref: AuthModel })
    userId: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    transactionType: string;

    @Prop({ required: true })
    accountType: string;
}


export const TransactionSchema = SchemaFactory.createForClass(Transaction)
export const TransactionModel = 'Transaction'
export type TransactionDocument = Document & Transaction
