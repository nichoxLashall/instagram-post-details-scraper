export function extractTimestamp(ts) {
  try {
    if (!ts) return null;
    const date = new Date(ts);
    return date.toISOString();
  } catch {
    return null;
  }
}