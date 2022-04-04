import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseEntity} from "../../../common/entity/base.entity";


@Schema()
export class User extends BaseEntity{

    @Prop({required: true})
    email: string;

    @Prop()
    password: string;

    @Prop()
    username: string;


    constructor() {
        super()
    }
}

export const UserEntity = SchemaFactory.createForClass(User);