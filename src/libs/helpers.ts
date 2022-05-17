export function getQueryParam(value: string | string[] | undefined): string {
  if (value) {
    return Array.isArray(value) ? value[0] : value;
  }

  return '';
}
