import { IsNotEmpty, IsNumber } from 'class-validator';

export class ItemDto {
  @IsNotEmpty()
  @IsNumber()
  readonly volume: number;
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
