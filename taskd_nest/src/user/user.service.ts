import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";
import {UserDto} from "../dto/user.dto";
import {v4 as uuid4} from "uuid";

/**
 * This is a service that handles
 * searching for user records for auth login
 * creating new user records for auth registration
 */
@Injectable()
export class UserService {
    //we inject the User schema into our module for use to interact with db
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    /**
     * findUser is a method that searches for a unique user by their email
     * @params userEmail : string
     * @return Promise<User | undefined>
     */
    async findUser(userEmail: string) : Promise<User | undefined> {
        return this.userModel.findOne({ email: userEmail })
    }

    /**
     * createUser is a method that creates a new user,
     * it uses uuid4 to inject a unique id into the user record before saving it to db
     * @params userDto
     * @return Promise<User | undefined>
     */
    async createUser(userDto: UserDto) : Promise<User | undefined> {
        userDto.setUserId(uuid4());
        const user = new this.userModel(userDto)
        return user.save()
    }
}
