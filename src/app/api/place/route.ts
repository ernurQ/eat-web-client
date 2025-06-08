// app/api/place/route.ts
import { NextResponse } from 'next/server'

type PlaceRequest = {
  input: string
}

export async function POST(req: Request) {
  const { input } = (await req.json()) as PlaceRequest
  const apiKey = 'AIzaSyAMmMYfo-34daqd4hZhQoVZRKDf9lqlTrA'
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing server-side GOOGLE_MAPS_API_KEY' },
      { status: 500 }
    )
  }

  const url =
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
    `?input=${encodeURIComponent(input)}` +
    `&inputtype=textquery` +
    `&fields=geometry,formatted_address,name` +
    `&key=${apiKey}`

  const res = await fetch(url)
  const json = await res.json()

  return NextResponse.json(json)
}
