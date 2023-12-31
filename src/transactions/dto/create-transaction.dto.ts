import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    userId: string;
    
    @IsString()
    @IsNotEmpty()
    category: string;
    
    @IsNotEmpty()
    @IsNumber()
    amount: number;
    
    @IsString()
    @IsNotEmpty()
    transactionType: string;
    
    @IsNotEmpty()
    @IsString()
    accountType: string;
}
