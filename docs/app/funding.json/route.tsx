import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET() {
  try {
    const url = 'https://raw.githubusercontent.com/rad-ui/ui/refs/heads/main/funding.json';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();

    return NextResponse.json(jsonData);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch funding data' }, { status: 500 });
  }
}
