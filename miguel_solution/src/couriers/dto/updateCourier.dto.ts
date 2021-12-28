import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ItemDto } from './item.dto';

export class UpdateCourierDto {
  @IsOptional()
  readonly remove_item?: ItemDto;
  
  @IsOptional()
  readonly add_item?: ItemDto;

  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
