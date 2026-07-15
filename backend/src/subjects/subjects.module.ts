import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SubjectManager } from './models/SubjectManager';

@Module({
  imports: [PrismaModule],
  controllers: [SubjectsController],
  providers: [SubjectsService, SubjectManager],
})
export class SubjectsModule {}
