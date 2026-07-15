import { Controller, Get, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectCodesDto } from './dto/SubjectCodesDto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectService: SubjectsService) {}

  @Get('report')
  getSujectDistribution(@Query() dto: SubjectCodesDto) {
    return this.subjectService.getSubjectDistribuition(dto.codes);
  }

  @Get('avg-score')
  getSubjectAvgScore(@Query() dto: SubjectCodesDto) {
    return this.subjectService.getAvgSubjectScore(dto.codes);
  }

  @Get('perfect-score')
  getSubjectPerfectScore(@Query() dto: SubjectCodesDto) {
    return this.subjectService.getPerfectSubjectScore(dto.codes);
  }
}
