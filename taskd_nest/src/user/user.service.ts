import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";
import {UserDto} from "../dto/user.dto";
import {v4 as uuid4} from "uuid";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findUser(userEmail: string) : Promise<User | undefined> {
        return this.userModel.findOne({ email: userEmail })
    }

    async createUser(userDto: UserDto) : Promise<User | undefined> {
        userDto.setUserId(uuid4());
        const user = new this.userModel(userDto)
        return user.save()
    }
}
