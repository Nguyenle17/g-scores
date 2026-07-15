import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StudentResponseDto } from './dto/StudentResponse';
import { StudentTopGroupARow } from './types/StudentTopGroupARow';
import { StudentTopGroupAResponseDto } from './dto/StudentTopGroupAResponseDto';

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

  async top10StudentGroupA(): Promise<Array<StudentTopGroupAResponseDto>> {
    const students = await this.prisma.$queryRaw<StudentTopGroupARow[]>`
    SELECT
        id,
        sbd,
        toan,
        vat_li,
        hoa_hoc,
        (toan + vat_li + hoa_hoc) AS diem_khoi_a
    FROM "Student"
    WHERE toan IS NOT NULL
        AND vat_li IS NOT NULL
        AND hoa_hoc IS NOT NULL
    ORDER BY diem_khoi_a DESC
    LIMIT 10;
    `;

    return students.map((student) => ({
      id: student.id,
      sbd: student.sbd,
      toan: student.toan,
      vatLi: student.vat_li,
      hoaHoc: student.hoa_hoc,
      diemKhoiA: student.diem_khoi_a,
    }));
  }

  async getNumberOfStudents(): Promise<number> {
    return this.prisma.student.count();
  }
}
