import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubjectManager } from './models/SubjectManager';
import { SubjectDistribution } from './models/SubjectDistribuition';
import { SubjectAverage } from './models/SubjectAverage';
import { SubjectPerfectScore } from './models/SubjectPerfectScore';
import { QueryRow } from './types/QueryRow';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class SubjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subjectManager: SubjectManager,
  ) {}

  async getSubjectDistribuition(
    subjectCodes: string[],
  ): Promise<SubjectDistribution[]> {
    const rows = await this.prisma.$queryRaw<QueryRow[]>`
      SELECT
          -- Toán
            COUNT(*) FILTER (WHERE toan IS NOT NULL AND toan >= 8) AS toan_gte8,
            COUNT(*) FILTER (WHERE toan IS NOT NULL AND toan >= 6 AND toan < 8) AS toan_gte6_lt8,
            COUNT(*) FILTER (WHERE toan IS NOT NULL AND toan >= 4 AND toan < 6) AS toan_gte4_lt6,
            COUNT(*) FILTER (WHERE toan IS NOT NULL AND toan < 4) AS toan_lt4,

            -- Ngữ văn
            COUNT(*) FILTER (WHERE ngu_van IS NOT NULL AND ngu_van >= 8) AS ngu_van_gte8,
            COUNT(*) FILTER (WHERE ngu_van IS NOT NULL AND ngu_van >= 6 AND ngu_van < 8) AS ngu_van_gte6_lt8,
            COUNT(*) FILTER (WHERE ngu_van IS NOT NULL AND ngu_van >= 4 AND ngu_van < 6) AS ngu_van_gte4_lt6,
            COUNT(*) FILTER (WHERE ngu_van IS NOT NULL AND ngu_van < 4) AS ngu_van_lt4,

            -- Ngoại ngữ
            COUNT(*) FILTER (WHERE ngoai_ngu IS NOT NULL AND ngoai_ngu >= 8) AS ngoai_ngu_gte8,
            COUNT(*) FILTER (WHERE ngoai_ngu IS NOT NULL AND ngoai_ngu >= 6 AND ngoai_ngu < 8) AS ngoai_ngu_gte6_lt8,
            COUNT(*) FILTER (WHERE ngoai_ngu IS NOT NULL AND ngoai_ngu >= 4 AND ngoai_ngu < 6) AS ngoai_ngu_gte4_lt6,
            COUNT(*) FILTER (WHERE ngoai_ngu IS NOT NULL AND ngoai_ngu < 4) AS ngoai_ngu_lt4,

            -- Vật lý
            COUNT(*) FILTER (WHERE vat_li IS NOT NULL AND vat_li >= 8) AS vat_li_gte8,
            COUNT(*) FILTER (WHERE vat_li IS NOT NULL AND vat_li >= 6 AND vat_li < 8) AS vat_li_gte6_lt8,
            COUNT(*) FILTER (WHERE vat_li IS NOT NULL AND vat_li >= 4 AND vat_li < 6) AS vat_li_gte4_lt6,
            COUNT(*) FILTER (WHERE vat_li IS NOT NULL AND vat_li < 4) AS vat_li_lt4,

            -- Hóa học
            COUNT(*) FILTER (WHERE hoa_hoc IS NOT NULL AND hoa_hoc >= 8) AS hoa_hoc_gte8,
            COUNT(*) FILTER (WHERE hoa_hoc IS NOT NULL AND hoa_hoc >= 6 AND hoa_hoc < 8) AS hoa_hoc_gte6_lt8,
            COUNT(*) FILTER (WHERE hoa_hoc IS NOT NULL AND hoa_hoc >= 4 AND hoa_hoc < 6) AS hoa_hoc_gte4_lt6,
            COUNT(*) FILTER (WHERE hoa_hoc IS NOT NULL AND hoa_hoc < 4) AS hoa_hoc_lt4,

            -- Sinh học
            COUNT(*) FILTER (WHERE sinh_hoc IS NOT NULL AND sinh_hoc >= 8) AS sinh_hoc_gte8,
            COUNT(*) FILTER (WHERE sinh_hoc IS NOT NULL AND sinh_hoc >= 6 AND sinh_hoc < 8) AS sinh_hoc_gte6_lt8,
            COUNT(*) FILTER (WHERE sinh_hoc IS NOT NULL AND sinh_hoc >= 4 AND sinh_hoc < 6) AS sinh_hoc_gte4_lt6,
            COUNT(*) FILTER (WHERE sinh_hoc IS NOT NULL AND sinh_hoc < 4) AS sinh_hoc_lt4,

            -- Lịch sử
            COUNT(*) FILTER (WHERE lich_su IS NOT NULL AND lich_su >= 8) AS lich_su_gte8,
            COUNT(*) FILTER (WHERE lich_su IS NOT NULL AND lich_su >= 6 AND lich_su < 8) AS lich_su_gte6_lt8,
            COUNT(*) FILTER (WHERE lich_su IS NOT NULL AND lich_su >= 4 AND lich_su < 6) AS lich_su_gte4_lt6,
            COUNT(*) FILTER (WHERE lich_su IS NOT NULL AND lich_su < 4) AS lich_su_lt4,

            -- Địa lý
            COUNT(*) FILTER (WHERE dia_li IS NOT NULL AND dia_li >= 8) AS dia_li_gte8,
            COUNT(*) FILTER (WHERE dia_li IS NOT NULL AND dia_li >= 6 AND dia_li < 8) AS dia_li_gte6_lt8,
            COUNT(*) FILTER (WHERE dia_li IS NOT NULL AND dia_li >= 4 AND dia_li < 6) AS dia_li_gte4_lt6,
            COUNT(*) FILTER (WHERE dia_li IS NOT NULL AND dia_li < 4) AS dia_li_lt4,

            -- GDCD
            COUNT(*) FILTER (WHERE gdcd IS NOT NULL AND gdcd >= 8) AS gdcd_gte8,
            COUNT(*) FILTER (WHERE gdcd IS NOT NULL AND gdcd >= 6 AND gdcd < 8) AS gdcd_gte6_lt8,
            COUNT(*) FILTER (WHERE gdcd IS NOT NULL AND gdcd >= 4 AND gdcd < 6) AS gdcd_gte4_lt6,
            COUNT(*) FILTER (WHERE gdcd IS NOT NULL AND gdcd < 4) AS gdcd_lt4

      FROM "Student";   
      `;

    const distribution: QueryRow = rows[0];
    return subjectCodes.map((code) => {
      const subject = this.subjectManager.findByCode(code);
      if (!subject) {
        throw new BadRequestException(`Invalid subject code: ${code}`);
      }

      return new SubjectDistribution(
        subject,
        Number(distribution[`${code}_gte8`]),
        Number(distribution[`${code}_gte6_lt8`]),
        Number(distribution[`${code}_gte4_lt6`]),
        Number(distribution[`${code}_lt4`]),
      );
    });
  }

  async getAvgSubjectScore(subjectCodes: string[]): Promise<SubjectAverage[]> {
    const subjects = subjectCodes.map((code) => {
      const subject = this.subjectManager.findByCode(code);
      if (!subject) {
        throw new BadRequestException(`Invalid subject code: ${code}`);
      }
      return { code, subject };
    });

    const rows = await this.prisma.$queryRaw<QueryRow[]>`
      SELECT
        AVG(toan) AS toan_avg,
        AVG(ngu_van) AS ngu_van_avg,
        AVG(ngoai_ngu) AS ngoai_ngu_avg,
        AVG(vat_li) AS vat_li_avg,
        AVG(hoa_hoc) AS hoa_hoc_avg,
        AVG(sinh_hoc) AS sinh_hoc_avg,
        AVG(lich_su) AS lich_su_avg,
        AVG(dia_li) AS dia_li_avg,
        AVG(gdcd) AS gdcd_avg
      FROM "Student";
    `;

    const result = rows[0];

    return subjects.map(({ code, subject }) => {
      const value = result[`${code}_avg`];
      return new SubjectAverage(
        subject,
        value !== null && value !== undefined ? Number(value) : null,
      );
    });
  }

  async getPerfectSubjectScore(
    subjectCodes: string[],
  ): Promise<SubjectPerfectScore[]> {
    const subjects = subjectCodes.map((code) => {
      const subject = this.subjectManager.findByCode(code);
      if (!subject) {
        throw new BadRequestException(`Invalid subject code: ${code}`);
      }
      return { code, subject };
    });

    const rows = await this.prisma.$queryRaw<QueryRow[]>`
      SELECT
        COUNT(*) FILTER (WHERE toan IS NOT NULL AND toan = 10) AS toan_perfect,
        COUNT(*) FILTER (WHERE ngu_van IS NOT NULL AND ngu_van = 10) AS ngu_van_perfect,
        COUNT(*) FILTER (WHERE ngoai_ngu IS NOT NULL AND ngoai_ngu = 10) AS ngoai_ngu_perfect,
        COUNT(*) FILTER (WHERE vat_li IS NOT NULL AND vat_li = 10) AS vat_li_perfect,
        COUNT(*) FILTER (WHERE hoa_hoc IS NOT NULL AND hoa_hoc = 10) AS hoa_hoc_perfect,
        COUNT(*) FILTER (WHERE sinh_hoc IS NOT NULL AND sinh_hoc = 10) AS sinh_hoc_perfect,
        COUNT(*) FILTER (WHERE lich_su IS NOT NULL AND lich_su = 10) AS lich_su_perfect,
        COUNT(*) FILTER (WHERE dia_li IS NOT NULL AND dia_li = 10) AS dia_li_perfect,
        COUNT(*) FILTER (WHERE gdcd IS NOT NULL AND gdcd = 10) AS gdcd_perfect
      FROM "Student";
    `;

    const result = rows[0];

    return subjects.map(({ code, subject }) => {
      const value = result[`${code}_perfect`];
      return new SubjectPerfectScore(
        subject,
        value !== null && value !== undefined ? Number(value) : 0,
      );
    });
  }
}
