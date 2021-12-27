import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Courier } from 'src/db/entities/courier.entity';
import { CouriersService } from './couriers.service';
import { CreateCourierDto } from './dto/createCourier.dto';
import { FindCourierQueryDto } from './dto/findCourierQuery.dto';

@Controller('couriers')
export class CouriersController {
    constructor(private readonly couriers_service: CouriersService) { }
    @Get('/lookup')
    async findCouriers(@Query() query?: FindCourierQueryDto): Promise<Courier[]> {
        return this.couriers_service.findCouriers(query)
    }

    @Post('/')
    async createCourier(@Body() courier_data: CreateCourierDto): Promise<Courier> {
      return this.couriers_service.createCourier(courier_data);
    }

}

