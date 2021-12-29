import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Courier } from 'src/db/entities/courier.entity';
import { DeleteResult } from 'typeorm';
import { CouriersService } from './couriers.service';
import { CreateCourierDto } from './dto/createCourier.dto';
import { FindCourierQueryDto } from './dto/findCourierQuery.dto';
import { UpdateCourierDto } from './dto/updateCourier.dto';

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

  @Put('/')
  async updateCourier(@Body() update_courier_data: UpdateCourierDto): Promise<Courier> {
    return this.couriers_service.updateCourier(update_courier_data);
  }

  @Delete('/:id')
  async deleteCourier(@Param() id: number): Promise<DeleteResult> {
    return this.couriers_service.deleteCourier(id)
  }
}

