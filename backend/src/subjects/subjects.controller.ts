import { Controller, Get, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectCodesDto } from './dto/SubjectCodesDto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectService: SubjectsService) {}

  @Get('/report')
  getSujectDistribution(@Query() dto: SubjectCodesDto) {
    console.log(dto.codes);
    return this.subjectService.getSubjectDistribuition(dto.codes);
  }
}
