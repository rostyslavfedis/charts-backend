import { Module } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { ChartsController } from './charts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {ChartEntity} from "./entity/charts.entity";
import { DB_MODELS } from "../../common/enums/model";

@Module({
  providers: [ChartsService],
  controllers: [ChartsController],
  exports:[ChartsService],
  imports: [
    MongooseModule.forFeature([{ name: DB_MODELS.charts, schema: ChartEntity }]),
  ],
})
export class ChartsModule {}
