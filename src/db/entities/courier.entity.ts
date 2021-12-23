import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('couriers')
export class Courier {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  max_capacity: number;
  
  @Column()
  available_capacity: number;
}