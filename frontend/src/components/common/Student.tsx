import './Student.css';
import type { StudentProps } from '@/types/StudentProps';
import { formatScore } from '@/utils/utils';

export default function Student({
  sbd,
  toan,
  nguVan,
  ngoaiNgu,
  vatLi,
  hoaHoc,
  sinhHoc,
  lichSu,
  diaLi,
  gdcd,
  maNgoaiNgu,
  topScoreGroupA = false,
  rank,
}: StudentProps) {

  const subjects = [
    { id: 'toan', label: 'Toán', score: toan },
    { id: 'nguVan', label: 'Ngữ Văn', score: nguVan },
    { id: 'ngoaiNgu', label: 'Ngoại Ngữ', score: ngoaiNgu, subInfo: maNgoaiNgu ? ` (${maNgoaiNgu})` : '' },
    { id: 'vatLi', label: 'Vật Lí', score: vatLi },
    { id: 'hoaHoc', label: 'Hóa Học', score: hoaHoc },
    { id: 'sinhHoc', label: 'Sinh Học', score: sinhHoc },
    { id: 'lichSu', label: 'Lịch Sử', score: lichSu },
    { id: 'diaLi', label: 'Địa Lí', score: diaLi },
    { id: 'gdcd', label: 'GDCD', score: gdcd },
  ];

  const groupAIds = ['toan', 'vatLi', 'hoaHoc'];
  const subjectsGroupA = subjects.filter((s) => groupAIds.includes(s.id));

  const hasGroupA = toan !== undefined && vatLi !== undefined && hoaHoc !== undefined;
  const groupAScore = hasGroupA ? (toan! + vatLi! + hoaHoc!).toFixed(2) : null;

  const list = topScoreGroupA ? subjectsGroupA : subjects;

  return (
    <div className='student-card'>
      <div className='student-card__header'>
        <span className='student-card__badge'>Thí sinh</span>
        <h2 className='student-card__sbd'>SBD: <span>{sbd}</span></h2>
      </div>

      <div className='student-card__body'>
        {rank !== undefined && (
          <div className='student-card__body__rank'>
            <span className='student-card__body__rank__label'>Hạng</span>
            <h2 className='student-card__body__rank__header'>#{rank}</h2>
        </div>   
        )}
        
        <div className='student-card__subjects'>
          {list.map((sub) => (
            <div key={sub.id} className='student-card__subject-item'>
              <span className='student-card__subject-label'>
                {sub.label}
                {sub.subInfo && <small>{sub.subInfo}</small>}
              </span>
              <span className='student-card__subject-score'>
                {formatScore(sub.score)}
              </span>
            </div>
          ))}
        </div>

        {topScoreGroupA && hasGroupA && (
          <div className='student-card__highlight'>
            <div className='student-card__highlight-info'>
              <p className='student-card__highlight-title'>Tổng điểm Khối A</p>
              <span className='student-card__highlight-subtitle'>Toán + Vật Lí + Hóa Học</span>
            </div>
            <div className='student-card__highlight-score'>{groupAScore}</div>
          </div>
        )}
      </div>
    </div>
  );
}