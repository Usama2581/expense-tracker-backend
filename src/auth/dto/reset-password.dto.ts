import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class resetPasswordDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    newPassword: string;
}