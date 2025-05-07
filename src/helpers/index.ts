import { AppRouteSlugs } from "../services/routes";

const tokenStorageKeyName = "token";
export const GetUserAuthToken = () => localStorage.getItem(tokenStorageKeyName);
export const setUserAuthToken = (value: string) =>
  localStorage.setItem(tokenStorageKeyName, value);

type AppRouteValues = typeof AppRouteSlugs;
type RouteKey = keyof AppRouteValues;

/**
 * 🔍 Extract param names from route string
 */
type ExtractRouteParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<`/${Rest}`>]: string | number }
    : T extends `${string}:${infer Param}`
    ? { [K in Param]: string | number }
    : unknown;

/**
 * 🛠️ Type-safe URL builder
 */
export function buildUrl<K extends RouteKey>(
  routeKey: K,
  params?: ExtractRouteParams<AppRouteValues[K]>
): string {
  const route = AppRouteSlugs[routeKey];

  if (!params) return route;

  let url = route;

  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, encodeURIComponent(String(value)));
  }

  return url;
}
