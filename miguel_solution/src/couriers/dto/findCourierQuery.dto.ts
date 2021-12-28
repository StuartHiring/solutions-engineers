import { IsNumber, IsOptional } from 'class-validator'
export class FindCourierQueryDto {
    @IsOptional()
    @IsNumber()
    readonly capacity_required?: number
    @IsOptional()
    @IsNumber()
    readonly id?: number
}