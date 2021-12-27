import { Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Courier } from '../db/entities/courier.entity';
import { FindManyOptions, MoreThanOrEqual, Repository } from 'typeorm';
import { FindCourierQueryDto } from './dto/findCourierQuery.dto';
import { CreateCourierDto } from './dto/createCourier.dto';

@Injectable()
export class CouriersService {
    constructor(
        @InjectRepository(Courier)
        private couriers_repository: Repository<Courier>,
    ) { }
    async findCouriers({ capacity_required }: FindCourierQueryDto): Promise<Courier[]> {
        const query: FindManyOptions = {}
        if (capacity_required) {
            // wont come here if capacity_required is 0(in this case it isnt a problem since it will search for all)
            query.where = {
                available_capacity: MoreThanOrEqual(capacity_required)
            }
        }
        const couriers = await this.couriers_repository.find(query)
        return couriers
    }
    async createCourier({ max_capacity, id }: CreateCourierDto) {
        const courier = await this.couriers_repository.findOne(id)

        if (courier) {
            throw new ConflictException(`Courier with id ${id} allready exists`)

        }
        return await this.couriers_repository.save({
            max_capacity,
            available_capacity: max_capacity,
            id
        });
    }
    
}
