import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Munden Truck & Equipment - Truck Repair & Service in Kamloops';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: '#F97316',
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          Munden Truck &amp; Equipment
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#F97316',
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          Kamloops Truck Repair &amp; Mobile Service
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#AAAAAA',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          CVIP Inspections · Trailer Repair · Welding · Hydraulics · 24/7 Roadside Service
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: '#F97316',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
