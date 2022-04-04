import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../entity/user.entity';
import { DB_MODELS } from "../../../common/enums/model";


export class UserRepository {

    constructor(@InjectModel(DB_MODELS.users) private readonly userModel: Model<User>) {
    }

    public async create(dao: User): Promise<User> {
        const newUser = new this.userModel({...dao});
        return await newUser.save();
    }

    public async getUserById(id: string): Promise<User> {
        return await this.userModel.findById({_id:id});
    }

    public async getUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({email: email});
    }

    public async getUserByEmailAndPassword(email: string, password: string): Promise<User> {
        return await this.userModel.findOne({email: email, password: password});
    }
}