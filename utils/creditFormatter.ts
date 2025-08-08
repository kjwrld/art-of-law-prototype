/**
 * Utility functions for formatting CLE credits and related values
 */

/**
 * Format CLE credits to always show one decimal place
 * @param credits - The credit value as string or number
 * @returns Formatted string with one decimal place (e.g., "1.0", "2.5")
 */
export const formatCLECredits = (credits: string | number): string => {
  const numericValue = typeof credits === 'string' ? parseFloat(credits) : credits;
  return isNaN(numericValue) ? '0.0' : numericValue.toFixed(1);
};

/**
 * Format any decimal value to show one decimal place
 * @param value - The value to format as string or number
 * @returns Formatted string with one decimal place
 */
export const formatDecimal = (value: string | number): string => {
  return formatCLECredits(value);
};