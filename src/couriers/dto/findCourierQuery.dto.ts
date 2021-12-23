import { IsOptional } from 'class-validator'
export class FindCourierQueryDto {
    @IsOptional()
    readonly capacity_required: number
    @IsOptional()
    readonly id: number
}