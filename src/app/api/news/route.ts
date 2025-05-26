
import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = '999c45767cf1410fac6c6fb4bf3c7b27'
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing NEWS_API_KEY' }, { status: 500 })
  }

  // Only articles with “food waste” in the title, and mentioning restaurant/cafe/foodservice
  const titleQuery = encodeURIComponent(
    `"food waste"`
  )

  const url = `https://newsapi.org/v2/everything?` +
    `qInTitle=${titleQuery}` +
    `&pageSize=10` +
    `&sortBy=publishedAt` +
    `&language=en` +
    `&apiKey=${apiKey}`

  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`NewsAPI responded ${res.status}`)
    const { articles } = await res.json()
    return NextResponse.json(articles)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
