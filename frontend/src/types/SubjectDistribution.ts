import type { Subject } from "./Subject";

export interface SubjectDistribution {
  subject: Subject;
  gte8: number;
  gte6Lt8: number;
  gte4Lt6: number;
  lt4: number;
}