export const BuildUrl = (baseUrl: string, path: string) => {
  // Ensure baseUrl ends with a single slash and path does not start with a slash
  const sanitizedBaseUrl = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;
  const sanitizedPath = path.startsWith("/") ? path.slice(1) : path;

  // Combine the sanitized baseUrl and path
  return `${sanitizedBaseUrl}/${sanitizedPath}`;
};

const tokenStorageKeyName = "token";
export const GetUserAuthToken = () => localStorage.getItem(tokenStorageKeyName);
export const setUserAuthToken = (value: string) =>
  localStorage.setItem(tokenStorageKeyName, value);
