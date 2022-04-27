import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type ChartsDocument = Charts & Document;

@Schema()
export class Charts {
    @Prop()
    data: number[]
    @Prop()
    dataLength: string
    @Prop()
    id: string
    @Prop()
    label: string
    @Prop()
    labels: string[]
    @Prop()
    type: string
    @Prop()
    eventId: string
    @Prop()
    status: string
}

export const ChartEntity = SchemaFactory.createForClass(Charts);