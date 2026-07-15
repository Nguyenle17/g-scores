import { Subject } from './Subject';

export class SubjectDistribution {
  constructor(
    readonly subject: Subject,
    readonly gte8: number,
    readonly gte6Lt8: number,
    readonly gte4Lt6: number,
    readonly lt4: number,
  ) {}
}
