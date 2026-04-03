
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title")
  const description = searchParams.get("description")

    return new ImageResponse(
        (<div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '96px',
              gap: '32px',
              backgroundColor: 'black',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <h1 style={{ color: 'white', fontSize: 64 }}>{title}</h1>
            <h3 style={{ color: '#d1d5db', fontSize: 32 }}>{description}</h3>
          </div>
        ),
        {
          width: 1200,
          height: 628,
        }

    );
}