import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class CreateCourierDto {
  @IsNotEmpty()
  @IsNumber()
  readonly max_capacity: number;
  
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
