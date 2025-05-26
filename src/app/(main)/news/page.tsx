import NewsFeed from '@/app/(main)/news/_ui/NewsFeed';

export default function News() {
  return (
    <div className="container mx-auto p-6">
      <section className="mt-12">
        <h1 className="text-2xl font-bold mb-4">Latest Food-Waste & Ecology News</h1>
        <NewsFeed />
      </section>
    </div>
  )
}
