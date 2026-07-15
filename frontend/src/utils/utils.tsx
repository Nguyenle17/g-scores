export const formatScore = (score?: number) =>
  score !== undefined && score !== null ? score.toFixed(2) : '—';
