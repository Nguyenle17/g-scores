import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubjectManager } from './models/SubjectManager';
import { SubjectDistribution } from './models/SubjectDistribuition';
import { DistributionQueryRow } from './types/DistributionQueryRow';
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
    const rows = await this.prisma.$queryRaw<DistributionQueryRow[]>`
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

    const distribution: DistributionQueryRow = rows[0];
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
}
