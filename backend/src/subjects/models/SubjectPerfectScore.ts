import { Subject } from './Subject';

export class SubjectPerfectScore {
  constructor(
    readonly subject: Subject,
    readonly perfectScores: number | null,
  ) {}
}
