import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StudentResponseDto } from './dto/StudentResponse';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.student.findMany();
  }

  async getBySbd(sbd: string): Promise<StudentResponseDto> {
    const student = await this.prisma.student.findUnique({
      where: {
        sbd,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return {
      id: student.id,
      sbd: student.sbd,
      toan: student.toan,
      nguVan: student.ngu_van,
      ngoaiNgu: student.ngoai_ngu,
      vatLi: student.vat_li,
      hoaHoc: student.hoa_hoc,
      sinhHoc: student.sinh_hoc,
      lichSu: student.lich_su,
      diaLi: student.dia_li,
      gdcd: student.gdcd,
      maNgoaiNgu: student.ma_ngoai_ngu,
    };
  }
}
