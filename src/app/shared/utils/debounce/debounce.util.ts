export function debounce<T extends Function>(
  callback: T,
  wait: number,
): (...args: any[]) => void {
  let timeout: number;

  return (...args: any[]): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
}
