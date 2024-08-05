import {Body, Controller, Post, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDto, UserLoginDto} from "../dto/user.dto";
import {Response} from "express";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('login')
    async login(@Body() user: UserLoginDto, @Res({passthrough: true}) response: Response) {
        let result : any;

        try {
            result = await this.authService.login(user.email, user.password);
        } catch (error) {
            return response.status(401).send({
                error: true,
                statusCode: 401,
                message: 'Error trying to sign in, please try again later.'
            })
        }

        if(!result) {
            return response.status(401).send({
                error: true,
                statusCode: 401,
                message: 'Error trying to sign in, please try again later.'
            })
        }

        response
            .status(200)
            .cookie('user_token', result.userToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })

        return result;

    }

    @Post('register')
    async register(@Body() user: UserDto, @Res() response: Response) {
        let result : any;

        try {
            result = await this.authService.register(user);
        } catch (error) {
            return response.status(401).send({
                error: true,
                statusCode: 401,
                message: error.message
            })
        }

        if(!result) {
            return response.status(401).send({
                error: true,
                statusCode: 401,
                message: 'Error trying to register, please try again later.'
            })
        }

        response
            .cookie('user_token', result.userToken, {httpOnly: true})
            .status(200)

        return result;

    }

    @Post('logout')
    logout(@Res() response: Response) {
        response
            .status(200)
            .clearCookie('user_token')
            .send({});
    }
}
