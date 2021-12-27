import { IsOptional } from 'class-validator'
export class FindCourierQueryDto {
    // This is for documentation since nestjs can generate (for example swagger) docs automatically
    @IsOptional()
    readonly capacity_required?: number
    @IsOptional()
    readonly id?: number
}