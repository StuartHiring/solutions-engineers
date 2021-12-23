import { Controller, Get, Query } from '@nestjs/common';
import { Courier } from 'src/db/entities/courier.entity';
import { CouriersService } from './couriers.service';
import { FindCourierQueryDto } from './dto/findCourierQuery.dto';

@Controller('couriers')
export class CouriersController {
    constructor(private readonly couriersService: CouriersService) {}
    @Get('/lookup')
    async findCouriers(@Query() query: FindCourierQueryDto): Promise<Courier[]> {
        return this.couriersService.findCouriers(query)
    }
}
