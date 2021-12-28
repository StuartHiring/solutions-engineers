import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import ormconfig from './db/ormconfig'
import { CouriersModule } from './couriers/couriers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig()),
    CouriersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
