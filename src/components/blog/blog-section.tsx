import { fetchCryptoNews } from "@/lib/news";
import { BlogCard } from "./blog-card";

type Post = {
  id?: string;
  article_id?: string;
  title: string;
  published_at: string;
  thumbnail?: string;
  url: string;
};

export default async function BlogSection({ isHome }: { isHome?: boolean }) {
  try {
    const json = await fetchCryptoNews({ size: "4", langs: "en" });
    const posts = (json.data?.results || []) as Post[];
    const displayPosts = isHome ? posts.slice(0, 4) : posts;

    if (displayPosts.length === 0) {
      return (
        <p className="mt-2 text-sm text-muted-foreground">No articles found.</p>
      );
    }

    return (
      <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
        {displayPosts.map((post, index) => (
          <BlogCard
            key={post.article_id || post.id || post.url || index}
            id={post.article_id || post.id || String(index)}
            title={post.title}
            dates={post.published_at}
            image={post.thumbnail}
            href={post.url}
          />
        ))}
      </ul>
    );
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    return (
      <p className="mt-2 text-sm text-muted-foreground">
        Couldn&apos;t fetch external news feed.
      </p>
    );
  }
}
