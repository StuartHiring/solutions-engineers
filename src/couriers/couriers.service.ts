import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Courier } from 'src/db/entities/courier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouriersService {
    constructor(
        @InjectRepository(Courier)
        private couriersRepository: Repository<Courier>,
    ) { }
    async findCouriers(): Promise<Courier[]> {
        const couriers =  await  this.couriersRepository.find()
        return couriers
    }
}
