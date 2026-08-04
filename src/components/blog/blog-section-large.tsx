"use client";

import React, { useEffect, useState } from "react";
import { BlogCardLarge } from "@/components/blog/blog-card-large";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import BlogPagination from "./BlogPagination";

const PAGE_SIZE = 6;

const CATEGORIES = [
    "all",
    "blockchain",
    "bitcoin",
    "altcoin",
    "defi",
    "nft",
    "web3",
    "markets",
    "finance",
    "ai",
    "metaverse",
    "technology",
    "security",
    "policy",
    "business",
    "gaming",
    "mining",
    "stablecoins",
    "news",
    "opinion",
    "review",
    "interview",
    "investigation",
    "price-analysis",
    "legal",
];

const formatLabel = (cat: string) => {
    if (cat === "all") return "All";
    if (cat === "defi") return "DeFi";
    if (cat === "nft") return "NFT";
    if (cat === "ai") return "AI";
    if (cat === "web3") return "Web3";
    return cat
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
};

export default function BlogSectionLarge() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState("all");

    useEffect(() => {
        async function fetchNews() {
            try {
                setLoading(true);
                const res = await fetch(
                    `/api/news?page=${page}&category=${category}&size=${PAGE_SIZE}`
                );

                if (!res.ok) throw new Error("Failed to fetch");

                const json = await res.json();

                const results = json.data?.results || [];
                setPosts(results);

                // SỬA TẠI ĐÂY: dùng json.data.count
                const totalCount = json.data?.count || 0;
                setTotalPages(Math.ceil(totalCount / PAGE_SIZE));

            } catch (err) {
                console.error("Error fetching news:", err);
                setPosts([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, [page, category]);

    return (
        <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* === Category Filter === */}
            <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.map((cat) => (
                    <Badge
                        key={cat}
                        onClick={() => {
                            setCategory(cat);
                            setPage(1);
                        }}
                        className={cn(
                            "px-3 py-1 text-xs cursor-pointer capitalize transition-all",
                            cat === category
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "bg-secondary hover:bg-primary/20 text-primary"
                        )}
                    >
                        {formatLabel(cat)}
                    </Badge>
                ))}
            </div>

            {/* === Blog Grid === */}
            <div className="min-h-[400px]">
                {loading ? (
                    /* Skeleton */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col md:flex-row h-full rounded-xl border border-border shadow-sm animate-pulse bg-muted/40 overflow-hidden"
                            >
                                {/* Thumbnail Skeleton */}

                                {/* Content Skeleton */}
                                <div className="flex-1 w-full p-4 md:p-5 flex flex-col justify-between space-y-3">
                                    {/* Title */}
                                    <div className="space-y-4">
                                        <div className="h-40 sm:h-44 w-full bg-muted/50 rounded-md" />
                                        <div className="h-4 w-3/5 bg-muted/40 rounded-md" />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1.5">
                                        <div className="h-3 w-full bg-muted/30 rounded" />
                                        <div className="h-3 w-full bg-muted/30 rounded" />
                                        <div className="h-3 w-5/6 bg-muted/30 rounded" />
                                    </div>

                                    {/* Footer: Source + Date */}
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-16 bg-muted/40 rounded" />
                                            <div className="h-3 w-20 bg-muted/40 rounded" />
                                        </div>
                                        <div className="h-3 w-24 bg-muted/40 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : posts.length > 0 ? (
                    /* Real Cards – Responsive */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {posts.map((post: any) => (
                            <BlogCardLarge
                                key={post.article_id}
                                id={post.article_id}
                                title={post.title}
                                description={post.description}
                                date={post.published_at}
                                image={post.thumbnail}
                                source={post.source?.name}
                                coins={post.coins}
                                href={post.url}
                                sentiment={post.sentiment}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-sm text-muted-foreground py-12">
                        No articles found for this category.
                    </p>
                )}
            </div>

            {/* === Pagination === */}
            {!loading && totalPages > 1 && (
                <BlogPagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}