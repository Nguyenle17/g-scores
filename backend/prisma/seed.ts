import 'dotenv/config';
import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function parseScore(value: string | undefined): number | null {
  if (value === undefined || value.trim() === '') {
    return null;
  }

  return Number(value);
}

async function main() {
  const students: any[] = [];

  await new Promise<void>((resolve) => {
    fs.createReadStream('./prisma/data/diem_thi_thpt_2024.csv')
      .pipe(csv())
      .on('data', (row) => students.push(row))
      .on('end', () => resolve());
  });

  await prisma.student.createMany({
    data: students.map((student) => ({
      sbd: student.sbd,

      toan: parseScore(student.toan),
      ngu_van: parseScore(student.ngu_van),
      ngoai_ngu: parseScore(student.ngoai_ngu),

      vat_li: parseScore(student.vat_li),
      hoa_hoc: parseScore(student.hoa_hoc),
      sinh_hoc: parseScore(student.sinh_hoc),

      lich_su: parseScore(student.lich_su),
      dia_li: parseScore(student.dia_li),
      gdcd: parseScore(student.gdcd),

      ma_ngoai_ngu: student.ma_ngoai_ngu || null,
    })),
    skipDuplicates: true,
  });

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
