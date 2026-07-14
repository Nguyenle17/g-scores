import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [PrismaModule, StudentModule, SubjectsModule],
})
export class AppModule {}
