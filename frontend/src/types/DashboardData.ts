import type { SubjectDistribution } from "./SubjectDistribution";
import type { SubjectAverage } from "./SubjectAverage";
import type { SubjectPerfectScore } from "./SubjectPerfectScore";

export interface DashboardData {
  totalStudents: number,
  distribution: SubjectDistribution[];
  averages: SubjectAverage[];
  perfectScores: SubjectPerfectScore[];
}