import { IsEmail, IsNotEmpty } from "class-validator";

export class ResendLinkDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}