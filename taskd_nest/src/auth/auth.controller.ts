import {Body, Controller, Post, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDto, UserLoginDto} from "../dto/user.dto";
import {Response} from "express";

/**
 * Auth controller for handling auth login and registration
 */
@Controller('auth')
export class AuthController {
    //inject auth service to use login and registration methods
    constructor(private authService: AuthService) {}

    /**
     * This method logs a user in and sends back a jwt token in secure cookies
     * @method POST
     * @param user
     * @param response
     */
    @Post('login')
    async login(@Body() user: UserLoginDto, @Res({passthrough: true}) response: Response) {
        let result : any;

        try {
            //attempt login
            result = await this.authService.login(user.email, user.password);
        } catch (error) {
            //this means the server or db crashed, send 500
            return response.status(500).send({
                error: true,
                statusCode: 500,
                message: 'Error trying to sign in, please try again later.'
            })
        }

        //if the result is undefined that means the user does not exist so send back 401
        if(!result) {
            return response.status(401).send({
                error: true,
                statusCode: 401,
                message: 'Error trying to sign in, please try again later.'
            })
        }

        //send back correct result with user_token holding a jwt token and the response sets it into the browser's
        // cookie so the browser does not have to access it at all
        response
            .status(200)
            .cookie('user_token', result.userToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            .send(result);
    }

    /**
     * This method registers a new user in and sends back a jwt token in secure cookies
     * @method POST
     * @param user
     * @param response
     */
    @Post('register')
    async register(@Body() user: UserDto, @Res() response: Response) {
        let result : any;

        try {
            //attempt login
            result = await this.authService.register(user);
        } catch (error) {
            //this means the server or db crashed, send 500
            return response.status(401).send({
                error: true,
                statusCode: 401,
                message: error.message
            })
        }

        //if the result is undefined that means the user does not exist so send back 401
        if(!result) {
            return response.status(401).send({
                error: true,
                statusCode: 401,
                message: 'Error trying to register, please try again later.'
            })
        }

        //send back correct result with user_token holding a jwt token and the response sets it into the browser's
        // cookie so the browser does not have to access it at all
        response
            .cookie('user_token', result.userToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            .status(200)
            .send(result);
    }

    /**
     * This is a simple endpoint to log the user out from the browser by deleting the userToken cookie
     * @param response
     */
    @Post('logout')
    logout(@Res() response: Response) {
        response
            .status(200)
            .clearCookie('user_token')
            .send({});
    }
}
