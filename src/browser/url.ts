import Qs from 'qs';
export function urlStringify(params: Record<string, unknown>): string {
  return Qs.stringify(params, {arrayFormat: 'brackets'});
}
