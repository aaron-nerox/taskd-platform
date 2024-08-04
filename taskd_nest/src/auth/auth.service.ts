import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from "bcrypt";
import {User} from "../schemas/user.schema";
import {JwtService} from "@nestjs/jwt";
import {UserDto} from "../dto/user.dto";


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(userEmail: string, password: string) {
        let user: User;

        try {
            user = await this.userService.findUser(userEmail);
        } catch (error) {
            throw new HttpException(
                'Error finding the user record, please try again later',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        if(!user) {
            throw new HttpException('This user record is not found', HttpStatus.NOT_FOUND);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub : user.userId, email: user.email}
        const userToken = await this.jwtService.signAsync(payload)

        return {
            userId: user.userId,
            userToken: userToken,
            username: user.username,
            email: user.email,
        }
    }

    async register(user: UserDto) {
        let createdUser: User;
        const saltRounds = 12;

        const hash = bcrypt.hashSync(user.password, saltRounds)
        user.setUserPassword(hash);

        try {
            createdUser = await this.userService.createUser(user)
        } catch (error) {
            throw new HttpException("Error inserting user into db", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(!createdUser) {
            throw new HttpException('Error registering new user, please try again.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const payload = { sub : user.userId, email: user.email}
        const userToken = await this.jwtService.signAsync(payload)

        return {
            userId: user.userId,
            userToken: userToken,
            username: user.username,
            email: user.email,
        }
    }
}
