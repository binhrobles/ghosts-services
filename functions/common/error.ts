export const handleError = (
  e: Error,
  details?: Record<string, string | number>
): void => {
  console.error(JSON.stringify({ e, ...details }, null, 2));
};
