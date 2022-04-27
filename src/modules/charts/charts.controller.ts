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
import { CHARTS_TYPE } from "../../common/enums/charts";

@Controller('charts')
export class ChartsController {
    constructor(private readonly service: ChartsService) {}

    @Post('create-chart')
    async create(@Res() response, @Body() charts: Charts) {
        if (Object.keys(charts).length < 6) {
            errorFactory({
                message: "Charts can`t be empty or missed [data ,dataLength,id,label,labels,type]",
                status: HttpStatus.BAD_REQUEST,
                success: false
            });
        }
        if(!CHARTS_TYPE.includes(charts?.type)){
            errorFactory({
                message: "Type is invalid, please use ['bar','doughnut','pie','line']",
                status: HttpStatus.NOT_FOUND,
                success: false
            });
          }
            return response.status(HttpStatus.CREATED).json({
                data: await this.service.create(charts),
                success: true
            })
        }
    @Get()
    async fetchAll(@Res() response) {
        const data = await this.service.readAll();
        if (!data)
            errorFactory({
                message: "You don`t have any charts",
                status: HttpStatus.NOT_FOUND,
                success:false
            });
        return response.status(HttpStatus.OK).json({
            data,
            success:true
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.service.readById(id);
        if (!data)
            errorFactory({
                message: "Chart no found",
                status: HttpStatus.NOT_FOUND,
                success:false
            });
        return response.status(HttpStatus.OK).json({
            data,
            success:true
        })
    }
    @Get('event/:eventId')
    async findByEventId(@Res() response, @Param('eventId') eventId) {
        const data = await this.service.readByEventId(eventId);
        if (!data)
            errorFactory({
                message: "Charts no found by this event id",
                status: HttpStatus.NOT_FOUND,
                success:false
            });
        return response.status(HttpStatus.OK).json({
            data,
            success:true
        })
    }

    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() chart: Charts) {
        const data = await this.service.update(id, chart);
        if (!data)
            errorFactory({
                message: "Charts can`t be update",
                status: HttpStatus.BAD_REQUEST,
                success:false
            });
        if(!CHARTS_TYPE.includes(data?.type)){
            errorFactory({
                message: "Type is invalid, please use ['bar','doughnut','pie','line']",
                status: HttpStatus.NOT_FOUND,
                success: false
            });
        }
        return response.status(HttpStatus.OK).json({
            data,
            success:true
        })
    }

    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const data = await this.service.delete(id);
        if (!data)
            errorFactory({
                message: "Charts can`t be delete",
                status: HttpStatus.BAD_REQUEST,
                success:false
            });
        return response.status(HttpStatus.OK).json({
            data,
            success:true
        })
    }
}
