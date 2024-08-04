import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";


export class UserDto {

    @IsOptional()
    userId: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    userToken: string;

    setUserId(userId: string): void {
        this.userId = userId;
    }

    setUserPassword(password: string) : void {
        this.password = password;
    }
}

export class UserLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}