import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { ReportModule } from './report/report.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [PrismaModule, StudentModule, ReportModule, SubjectsModule],
})
export class AppModule {}
