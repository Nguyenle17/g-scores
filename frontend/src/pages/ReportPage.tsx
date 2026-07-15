import { useEffect, useState } from "react";
import { subjectApi } from "@/api/subject.api";
import type { SubjectDistribution } from "@/types/SubjectDistribution";
import { SUBJECT_CODES } from "@/constants/subject";
import SubjectDistributionChart from "@/components/common/SubjectDistributionChart";
import "./ReportPage.css";

export default function ReportPage() {
  const [data, setData] = useState<SubjectDistribution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = (await subjectApi.getReport(SUBJECT_CODES)) as
          | SubjectDistribution[]
          | string
          | null;

        if (response && typeof response !== "string") {
          setData(response);
        } else {
          setError("Không có dữ liệu để hiển thị.");
        }
      } catch (err: any) {
        setError(err.message || "Có lỗi xảy ra khi tải báo cáo.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  return (
    <div className="report-page">
      <h1 className="report-page__header">Phổ điểm theo môn học</h1>

      {loading && <p className="report-page__status">Đang tải dữ liệu...</p>}
      {error && <p className="report-page__error">{error}</p>}

      {!loading && !error && data.length > 0 && (
        <SubjectDistributionChart data={data} />
      )}
    </div>
  );
}