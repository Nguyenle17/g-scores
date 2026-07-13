import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':sbd')
  getBySbd(@Param('sbd') sbd: string) {
    return this.studentService.getBySbd(sbd);
  }
}
