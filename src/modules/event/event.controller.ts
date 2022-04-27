import {
    Body,
    Controller,
    Delete,
    Get, HttpStatus,
    Param,
    Post,
    Put, Res,
} from '@nestjs/common';
import { errorFactory } from "../../common/utils/error.factory";
import { EventService } from "./event.service";

@Controller('events')
export class EventController {
    constructor(private readonly service: EventService) {}

    @Post('create-event')
    async create(@Res() response, @Body() event: any) {
        const data = await this.service.create(event);
            return response.status(HttpStatus.CREATED).json({
                data,
                success: true
            })
        }
    @Get()
    async fetchAll(@Res() response) {
        const data = await this.service.readAll();
        if (!data)
            errorFactory({
                message: "You don`t have any event",
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
