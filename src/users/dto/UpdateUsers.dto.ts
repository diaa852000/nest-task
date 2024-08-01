import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter correct email"})
    @IsOptional()
    readonly email?: string;

    @IsNotEmpty()
    @IsOptional()
    @MinLength(6)
    @IsString()
    readonly password?: string;
}