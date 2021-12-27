import { IsNotEmpty } from 'class-validator';

export class CreateCourierDto {
  @IsNotEmpty()
  readonly max_capacity: number;
  @IsNotEmpty()
  readonly id: number;
}
