import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface BlogCardLargeProps {
    id: string;
    title: string;
    description?: string;
    date: string;
    image?: string | null;
    source?: string;
    coins?: { name: string; ticker: string }[];
    href?: string;
    sentiment?: "positive" | "neutral" | "negative" | null;
}

export function BlogCardLarge({
    id,
    title,
    description,
    date,
    image,
    source,
    coins = [],
    href,
    sentiment,
}: BlogCardLargeProps) {
    const link = href || `/blog/${id}`;
    const isExternal = !!href;

    const sentimentConfig = sentiment
        ? {
            positive: {
                label: "Positive",
                class:
                    "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30",
            },
            neutral: {
                label: "Neutral",
                class: "bg-slate-500/15 text-slate-700 border border-slate-500/30",
            },
            negative: {
                label: "Negative",
                class: "bg-red-500/15 text-red-700 border border-red-500/30",
            },
        }[sentiment]
        : null;

    return (
        <Card className="group overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:border-primary/20 flex flex-col">
            <Link
                href={link}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="flex flex-col h-full"
            >
                {/* === Image === */}
                <div className="relative w-full h-40 sm:h-44 overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 400px"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">
                            No image
                        </div>
                    )}

                    {/* Source Badge */}
                    {source && (
                        <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-medium border shadow-sm">
                            {source}
                        </div>
                    )}

                    {/* Sentiment Badge */}
                    {sentimentConfig && (
                        <div
                            className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-semibold ${sentimentConfig.class}`}
                        >
                            {sentimentConfig.label}
                        </div>
                    )}
                </div>

                {/* === Content === */}
                <div className="flex flex-col justify-between p-4 flex-1">
                    <div className="space-y-2">
                        {/* Date */}
                        <time className="text-[11px] text-muted-foreground font-medium">
                            {new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </time>

                        {/* Title */}
                        <h2 className="text-sm sm:text-base font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            {title}
                        </h2>

                        {/* Description */}
                        {description && (
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Coin Tags */}
                    {coins.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                            {coins.slice(0, 3).map((coin) => (
                                <Badge
                                    key={coin.ticker}
                                    variant="secondary"
                                    className="text-[10px] px-1.5 py-0.5 font-medium"
                                >
                                    {coin.ticker}
                                </Badge>
                            ))}
                            {coins.length > 3 && (
                                <span className="text-[10px] text-muted-foreground self-center ml-1">
                                    +{coins.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </Link>
        </Card>
    );
}
