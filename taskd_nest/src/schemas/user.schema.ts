import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({
        type: String,
        unique: true,
        required: true
    })
    userId: string;

    @Prop({
        type: String,
        required: true
    })
    username: string;

    @Prop({
        type: String,
        unique: true,
        required: true
    })
    email: string;

    @Prop({
        type: String,
        required: true
    })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);