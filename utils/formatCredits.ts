export const formatCredits = (credits: string | number): string => {
  const numCredits = typeof credits === 'string' ? parseFloat(credits) : credits;
  return `${numCredits} Credit${numCredits !== 1 ? 's' : ''}`;
};