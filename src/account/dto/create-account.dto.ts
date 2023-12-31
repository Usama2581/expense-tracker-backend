import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAccountDto {

    @IsNotEmpty()
    @IsString()
    accountType: string;
    
    @IsNumber()
    @IsNotEmpty()
    balance: number;
}
