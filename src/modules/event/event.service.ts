import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import { DB_MODELS } from "../../common/enums/model";
import { EventDocument } from "./entity/event.entity";

@Injectable()
export class EventService {
    constructor(@InjectModel(DB_MODELS.events) private readonly model: Model<EventDocument>) {}

    async create(event: any): Promise<any> {
        const newEvent = new this.model(event);
        return newEvent.save();
    }
    async readAll(): Promise<any> {
        return await this.model.find().exec();
    }

    async readById(id): Promise<any> {
      const events =  await this.model.find({ id }).exec();
      return events[0]
    }

    async update(id, event: Event): Promise<Event> {
        return await this.model.findOneAndReplace({ id }, event, { new: true })

    }

    async delete(id): Promise<any> {
        return await this.model.findOneAndRemove({ id });
    }

}