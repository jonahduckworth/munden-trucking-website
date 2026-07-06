import { ImageResponse } from 'next/og';
import { siteUrl } from '@/lib/site';

export const runtime = 'edge';
export const alt = 'Munden Truck & Equipment logo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  const logoUrl = new URL('/images/logo.png', siteUrl).toString();

  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={logoUrl}
          alt={alt}
          style={{
            width: '560px',
            height: '560px',
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
