import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from "bcrypt";
import {User} from "../schemas/user.schema";
import {JwtService} from "@nestjs/jwt";
import {UserDto} from "../dto/user.dto";

/**
 * This is the service responsible for handling auth and authorization
 */
@Injectable()
export class AuthService {

    //inject user service for handling users
    //inject jwt service to generate jwt tokens on registration
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    /**
     * Login method is a method that looks for the user using its email
     * @param userEmail
     * @param password
     */
    async login(userEmail: string, password: string) {
        let user: User;

        try {
            //find the user by their email
            user = await this.userService.findUser(userEmail);
        } catch (error) {
            //handle server crashes by sending response internal server error
            throw new HttpException(
                'Error finding the user record, please try again later',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        //This means the user is not found so send back 404
        if(!user) {
            throw new HttpException('This user record is not found', HttpStatus.NOT_FOUND);
        }

        //since we are using bcrypt during registration to hash passwords,
        // we compare the hashed password with the request password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        //if the passwords do not match that means they got a wrong password so send back 401
        if(!isPasswordMatch) {
            throw new UnauthorizedException();
        }

        //if passwords match the user is authenticated, create a jwt token using userId and email
        const payload = { sub : user.userId, email: user.email}
        const userToken = await this.jwtService.signAsync(payload)

        //return the user object
        return {
            userId: user.userId,
            userToken: userToken,
            username: user.username,
            email: user.email,
        }
    }

    /**
     * this is a method to register a new user and generate a jwt token for it
     * @param user
     */
    async register(user: UserDto) {
        let createdUser: User;
        //preparing bcrypt salt rounds, recommended for prod 12 or more
        const saltRounds = 12;

        //create a hash password from the user password and set it to the user dto
        const hash = bcrypt.hashSync(user.password, saltRounds)
        user.setUserPassword(hash);

        try {
            //attempt creating user
            createdUser = await this.userService.createUser(user)
        } catch (error) {
            //handle db or server crash by returning response 500
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        //if the user is undefined that is also an internal error so return 500
        if(!createdUser) {
            throw new HttpException('Error registering new user, please try again.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        //else the user is created in db, generate a jwt token using userId and email
        const payload = { sub : user.userId, email: user.email}
        const userToken = await this.jwtService.signAsync(payload)

        //return the new user object
        return {
            userId: user.userId,
            userToken: userToken,
            username: user.username,
            email: user.email,
        }
    }
}
