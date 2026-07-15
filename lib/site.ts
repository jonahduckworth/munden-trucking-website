export const siteUrl = "https://mundengroup.ca";
export const canonicalHost = "mundengroup.ca";

export const businessLocation = {
  streetAddress: "725 Carrier St",
  addressLocality: "Kamloops",
  addressRegion: "BC",
  postalCode: "V2H 1G1",
  addressCountry: "CA",
  latitude: 50.6850629,
  longitude: -120.318686,
} as const;

export const googleMapsPlaceUrl =
  "https://www.google.com/maps?cid=2171221372270048230";

export const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2527.879434860647!2d-120.31868599999999!3d50.68506289999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537e2d099230fc25%3A0x1e21ba559ee473e6!2sMunden%20Truck%20%26%20Equipment%20Ltd.!5e0!3m2!1sen!2sca!4v1784135669551!5m2!1sen!2sca";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, siteUrl).toString();
}
