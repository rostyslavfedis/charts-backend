import { Injectable } from '@nestjs/common';
import {Charts, ChartsDocument} from "./entity/charts.entity";
import { Model } from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import { DB_MODELS } from "../../common/enums/model";

@Injectable()
export class ChartsService {
    constructor(@InjectModel(DB_MODELS.charts) private readonly model: Model<ChartsDocument>) {}

    async create(charts: Charts): Promise<Charts> {
        const newChar = new this.model(charts);
        return newChar.save();
    }
    async readAll(): Promise<Charts[]> {
        return await this.model.find().exec();
    }

    async readById(id): Promise<any> {
      const charts =  await this.model.find({ id }).exec();
      return charts[0]
    }

    async update(id, chart: Charts): Promise<Charts> {
        return await this.model.findOneAndReplace({ id }, chart, { new: true })

    }

    async delete(id): Promise<any> {
        return await this.model.findOneAndRemove({ id });
    }

}