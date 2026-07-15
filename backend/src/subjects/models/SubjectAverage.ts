import { Subject } from './Subject';

export class SubjectAverage {
  constructor(
    readonly subject: Subject,
    readonly average: number | null,
  ) {}
}
