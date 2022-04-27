import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
    @Prop()
    name: string
    @Prop()
    status: string
    @Prop()
    id: string
}

export const EventEntity = SchemaFactory.createForClass(Event);