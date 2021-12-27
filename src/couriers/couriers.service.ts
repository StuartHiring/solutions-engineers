import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Courier } from '../db/entities/courier.entity';
import { FindManyOptions, MoreThanOrEqual, Repository } from 'typeorm';
import { FindCourierQueryDto } from './dto/findCourierQuery.dto';

@Injectable()
export class CouriersService {
    constructor(
        @InjectRepository(Courier)
        private couriersRepository: Repository<Courier>,
    ) { }
    async findCouriers({ capacity_required }: FindCourierQueryDto): Promise<Courier[]> {
        const query: FindManyOptions = {}
        if (capacity_required) {
            // wont come here if capacity_required is 0(in this case it isnt a problem since it will search for all)
            query.where = {
                available_capacity: MoreThanOrEqual(capacity_required)
            }
        }
        const couriers = await this.couriersRepository.find(query)
        return couriers
    }
}
