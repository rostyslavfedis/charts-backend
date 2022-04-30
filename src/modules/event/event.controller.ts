import {
    Body,
    Controller,
    Delete, forwardRef,
    Get, HttpStatus, Inject,
    Param,
    Post,
    Put, Res, UseGuards
} from "@nestjs/common";
import { errorFactory } from "../../common/utils/error.factory";
import { EventService } from "./event.service";
import { ChartsService } from "../charts/charts.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('events')
export class EventController {
    constructor(private readonly service: EventService, @Inject(forwardRef(() => ChartsService)) private readonly charts: ChartsService) {}

    @Post('create-event')
    @UseGuards(AuthGuard('jwt'))
    async create(@Res() response, @Body() event: any) {
        const data = await this.service.create(event);
            return response.status(HttpStatus.CREATED).json({
                data,
                success: true
            })
        }

    @Get()
    async fetchAll(@Res() response) {
        const events = await this.service.readAll();
        const newResponse = [];

       for( const event of events){
           const data = await this.charts.readByEventId(event.id);
           newResponse.push({ chartLength:data?.length, event })
       }

        if (!events)
            errorFactory({
                message: "You don`t have any event",
                status: HttpStatus.NOT_FOUND,
                success:false
            });
        return response.status(HttpStatus.OK).json({
            data: newResponse,
            // length
            success:true
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.service.readById(id);
        if (!data)
            errorFactory({
                message: "Event no found",
                status: HttpStatus.NOT_FOUND,
                success:false
            });
        return response.status(HttpStatus.OK).json({
            data,
            success:true
        })
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Res() response, @Param('id') id, @Body() event: any) {
        const data = await this.service.update(id, event);
        if (!data)
            errorFactory({
                message: "Event can`t be update",
                status: HttpStatus.BAD_REQUEST,
                success:false
            });
        return response.status(HttpStatus.OK).json({
            data,
            success:true
        })
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Res() response, @Param('id') id) {
        const data = await this.service.delete(id);
        if (!data)
            errorFactory({
                message: "Event can`t be delete",
                status: HttpStatus.BAD_REQUEST,
                success:false
            });
        return response.status(HttpStatus.OK).json({
            data,
            success:true
        })
    }
}
