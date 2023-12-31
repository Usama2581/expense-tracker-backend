import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class savePasswordDTO {
    @IsNotEmpty()
    @IsString()
    data: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}