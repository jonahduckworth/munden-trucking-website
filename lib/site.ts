export const siteUrl = "https://mundengroup.ca";
export const canonicalHost = "mundengroup.ca";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, siteUrl).toString();
}
