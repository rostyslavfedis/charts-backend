import { forwardRef, Module } from "@nestjs/common";
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEntity } from "./entity/event.entity";
import { DB_MODELS } from "../../common/enums/model";
import { ChartsModule } from "../charts/charts.module";

@Module({
  providers: [EventService],
  controllers: [EventController],
  exports:[EventService],
  imports: [
    MongooseModule.forFeature([{ name: DB_MODELS.events, schema: EventEntity }]),
    forwardRef(() => ChartsModule),
  ],
})
export class EventModule {}
