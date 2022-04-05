import {
    Body,
    Controller,
    Delete,
    Get, HttpStatus,
    Param,
    Post,
    Put, Res,
} from '@nestjs/common';
import { ChartsService } from './charts.service';
import {Charts} from "./entity/charts.entity";
import { errorFactory } from "../../common/utils/error.factory";

@Controller('charts')
export class ChartsController {
    constructor(private readonly service: ChartsService) {}

    @Post()
    async create(@Res() response, @Body() charts: Charts) {
        return response.status(HttpStatus.CREATED).json({
            item: await this.service.create(charts)
        })
    }
    @Get()
    async fetchAll(@Res() response) {
        const charts = await this.service.readAll();
        return response.status(HttpStatus.OK).json({
            charts
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const charts = await this.service.readById(id);
        console.log(charts);
        return response.status(HttpStatus.OK).json({
            charts
        })
    }

    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() chart: Charts) {
        const updatedChart = await this.service.update(id, chart);
        return response.status(HttpStatus.OK).json({
            updatedChart
        })
    }

    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedChart = await this.service.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedChart
        })
    }
}
