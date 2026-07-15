import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SubjectCodesDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',').map((v) => v.trim()) : value,
  )
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  codes!: string[];
}
