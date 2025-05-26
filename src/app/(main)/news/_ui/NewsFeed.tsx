'use client'

import useSWR from 'swr'

type Article = {
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  source: { name: string }
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API ${res.status}: ${body}`)
  }
  return res.json()
}

export default function NewsFeed() {
  const { data, error } = useSWR<Article[]>('/api/news', fetcher, {
    refreshInterval: 5 * 60 * 1000,
  })

  if (error) {
    console.error('NewsFeed error:', error)
    return <p className="text-red-600">Failed to load news: {error.message}</p>
  }
  if (!data) return <p>Loading news…</p>

  return (
    <div className="space-y-6">
      {data.map((a, i) => (
        <article key={i} className="border-b pb-4">
          <h2 className="text-lg font-semibold hover:underline">
            <a href={a.url} target="_blank" rel="noreferrer">
              {a.title}
            </a>
          </h2>
          <p className="text-sm text-gray-600">
            {new Date(a.publishedAt).toLocaleString()}
          </p>
          {a.urlToImage && (
            <img
              src={a.urlToImage}
              alt=""
              className="my-2 w-full object-cover h-48 rounded"
            />
          )}
          <p className="text-gray-700">{a.description}</p>
          <p className="text-xs text-gray-500">Source: {a.source.name}</p>
        </article>
      ))}
    </div>
  )
}
