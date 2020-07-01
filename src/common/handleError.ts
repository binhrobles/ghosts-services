export default function handleError(
  e: Error,
  details?: Record<string, string | number>
): void {
  console.error(JSON.stringify({ ...details, e }, null, 2));
}
