import { useEffect, useMemo, useState } from "react";
import { subjectApi } from "@/api/subject.api";
import { studentApi } from "@/api/student.api";
import type { SubjectDistribution } from "@/types/SubjectDistribution";
import type { SubjectAverage } from "@/types/SubjectAverage";
import type { SubjectPerfectScore } from "@/types/SubjectPerfectScore";
import { SUBJECT_CODES } from "@/constants/subject";
import SubjectDistributionChart from "@/components/common/SubjectDistributionChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { DashboardData } from "@/types/DashboardData";
import "./DashboardPage.css";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [totalStudents, distribution, averages, perfectScores] = await Promise.all([
          studentApi.getTotalStudent() as Promise<number>,
          subjectApi.getReport(SUBJECT_CODES) as Promise<SubjectDistribution[]>,
          subjectApi.getAvgScore(SUBJECT_CODES) as Promise<SubjectAverage[]>,
          subjectApi.getPerfectScore(SUBJECT_CODES) as Promise<SubjectPerfectScore[]>,
        ]);

        if (!distribution?.length) {
          setError("Không có dữ liệu để hiển thị.");
          return;
        }

        setData({ totalStudents, distribution, averages, perfectScores });
      } catch (err: any) {
        setError(err.message || "Có lỗi xảy ra khi tải dữ liệu tổng quan.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const overview = useMemo(() => {
    if (!data) return null;

    const validAverages = data.averages
      .map((item) => item.average)
      .filter((value): value is number => value !== null);
    const avgOverall =
      validAverages.length > 0
        ? validAverages.reduce((sum, v) => sum + v, 0) / validAverages.length
        : null;

    const totalCounted = data.distribution.reduce(
      (sum, item) => sum + item.gte8 + item.gte6Lt8 + item.gte4Lt6 + item.lt4,
      0,
    );
    const goodOrAboveCounted = data.distribution.reduce(
      (sum, item) => sum + item.gte8 + item.gte6Lt8,
      0,
    );
    const goodOrAboveRate =
      totalCounted > 0 ? (goodOrAboveCounted / totalCounted) * 100 : null;

    const perfectTotal = data.perfectScores.reduce(
      (sum, item) => sum + item.perfectScores,
      0,
    );

    return {
      totalStudents: data.totalStudents,
      avgOverall,
      goodOrAboveRate,
      perfectTotal,
    };
  }, [data]);

  const avgChartData = useMemo(() => {
    if (!data) return [];
    return data.averages
      .map((item) => ({
        name: item.subject.name,
        average: item.average ?? 0,
      }))
      .sort((a, b) => b.average - a.average);
  }, [data]);

  return (
    <div className="dashboard">
      <header className="dashboard__hero">
        <div className="dashboard__hero-text">
          <h1 className="dashboard__title">Bảng tổng hợp phổ điểm</h1>
          <p className="dashboard__subtitle">
            Thống kê điểm thi theo môn học: phổ điểm, điểm trung bình và
            số điểm 10 tuyệt đối.
          </p>
        </div>
        {overview?.avgOverall != null && (
          <div className="dashboard__stamp" aria-label="Điểm trung bình toàn quốc">
            <span className="dashboard__stamp-value">
              {overview.avgOverall.toFixed(2)}
            </span>
            <span className="dashboard__stamp-label">điểm TB chung</span>
          </div>
        )}
      </header>

      {loading && <p className="dashboard__status">Đang tải dữ liệu...</p>}
      {error && <p className="dashboard__error">{error}</p>}

      {!loading && !error && data && overview && (
        <>
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">
              <span className="dashboard__section-index">I.</span> Tổng quan
            </h2>
            <div className="dashboard__stats">
              <div className="stat-card">
                <span className="stat-card__label">Tổng số thí sinh</span>
                <span className="stat-card__value">
                  {overview.totalStudents.toLocaleString("vi-VN")}
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-card__label">Điểm TB chung</span>
                <span className="stat-card__value">
                  {overview.avgOverall != null
                    ? overview.avgOverall.toFixed(2)
                    : "—"}
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-card__label">Tỷ lệ khá giỏi (≥6)</span>
                <span className="stat-card__value">
                  {overview.goodOrAboveRate != null
                    ? `${overview.goodOrAboveRate.toFixed(1)}%`
                    : "—"}
                </span>
              </div>
              <div className="stat-card stat-card--accent">
                <span className="stat-card__label">Số điểm 10 tuyệt đối</span>
                <span className="stat-card__value">
                  {overview.perfectTotal.toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          </section>

          <section className="dashboard__section">
            <h2 className="dashboard__section-title">
              <span className="dashboard__section-index">II.</span> Phổ điểm theo môn
            </h2>
            <SubjectDistributionChart data={data.distribution} />
          </section>

          <section className="dashboard__section">
            <h2 className="dashboard__section-title">
              <span className="dashboard__section-index">III.</span> Điểm trung bình theo môn
            </h2>
            <div className="dashboard__chart">
              <ResponsiveContainer width="100%" height={360}>
                <BarChart
                  data={avgChartData}
                  layout="vertical"
                  margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#C7CED6" />
                  <XAxis
                    type="number"
                    domain={[0, 10]}
                    tick={{ fontSize: 12, fill: "#4B5A72" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={90}
                    tick={{ fontSize: 12, fill: "#16233F" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value: number) => value.toFixed(2)}
                    contentStyle={{ borderRadius: 8, border: "1px solid #C7CED6", fontSize: 13 }}
                  />
                  <Bar dataKey="average" radius={[0, 4, 4, 0]} fill="#16233F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="dashboard__section">
            <h2 className="dashboard__section-title">
              <span className="dashboard__section-index">IV.</span> Điểm 10 tuyệt đối
            </h2>
            <div className="dashboard__perfect-grid">
              {data.perfectScores.map((item) => (
                <div
                  key={item.subject.code}
                  className={
                    item.perfectScores > 0
                      ? "perfect-card perfect-card--sealed"
                      : "perfect-card"
                  }
                >
                  <span className="perfect-card__count">{item.perfectScores}</span>
                  <span className="perfect-card__name">{item.subject.name}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}