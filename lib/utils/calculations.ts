/**
 * Calculate efficiency score: packages / (miles + duration_hours)
 */
export function calculateEfficiencyScore(
  packages: number,
  miles: number,
  durationMinutes: number
): number {
  const durationHours = durationMinutes / 60;
  const denominator = miles + durationHours;
  
  if (denominator === 0) return 0;
  
  return packages / denominator;
}

/**
 * Calculate average minutes per stop
 */
export function calculateMinutesPerStop(
  durationMinutes: number,
  stops: number
): number {
  if (stops === 0) return 0;
  return durationMinutes / stops;
}

/**
 * Format efficiency score to 2 decimal places
 */
export function formatEfficiencyScore(score: number): string {
  return score.toFixed(2);
}


