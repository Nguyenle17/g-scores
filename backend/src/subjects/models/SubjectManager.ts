import { Injectable } from '@nestjs/common';
import { Subject } from './Subject';

@Injectable()
export class SubjectManager {
  private readonly subjects: Subject[] = [
    new Subject('toan', 'Toán'),
    new Subject('ngu_van', 'Ngữ văn'),
    new Subject('ngoai_ngu', 'Ngoại ngữ'),
    new Subject('vat_li', 'Vật lý'),
    new Subject('hoa_hoc', 'Hóa học'),
    new Subject('sinh_hoc', 'Sinh học'),
    new Subject('lich_su', 'Lịch sử'),
    new Subject('dia_li', 'Địa lý'),
    new Subject('gdcd', 'GDCD'),
  ];

  getAll(): Subject[] {
    return this.subjects;
  }

  findByCode(code: string): Subject | undefined {
    return this.subjects.find((subject) => subject.code === code);
  }
}
