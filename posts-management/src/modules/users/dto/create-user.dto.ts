import { IsEnum, IsEmail, IsNotEmpty,IsString } from "class-validator";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    email:string;

    @IsEnum(["ADMIN", "POSTER"],{message: 'Valid role is required'})
    role: "ADMIN"| "POSTER"
}

