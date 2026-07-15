import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { SearchStudentDto } from './dto/SearchStudentDto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get('top-group-a')
  getTopGroupA() {
    return this.studentService.top10StudentGroupA();
  }

  @Get('total-students')
  getNumberOfStudents() {
    return this.studentService.getNumberOfStudents();
  }

  @Get(':sbd')
  getBySbd(@Param() params: SearchStudentDto) {
    return this.studentService.getBySbd(params.sbd);
  }
}
