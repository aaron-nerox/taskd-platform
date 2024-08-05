import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";

/**
 * User data transfer object
 * This is a model used in user registration
 * It uses class-validator to do input validation before the endpoint operation happens
 */
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

/**
 * User login data transfer object
 * This is a model used in user login
 * It uses class-validator to do input validation before the endpoint operation happens
 */
export class UserLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}