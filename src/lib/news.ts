const BASE_URL = "https://api.thenewsapi.net/crypto";

const CATEGORIES = new Set([
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
]);

type NewsQuery = {
  page?: string;
  size?: string;
  category?: string;
  langs?: string;
};

export async function fetchCryptoNews({
  page = "1",
  size = "6",
  category = "",
  langs,
}: NewsQuery) {
  const key = process.env.THENEWSAPI_KEY || "BD3F9FCF39F1CC6FA42BEE47D5E92795";
  const params = new URLSearchParams({ apikey: key, page, size });
  if (langs) params.set("langs", langs);
  if (CATEGORIES.has(category)) params.set("categories", category);

  const response = await fetch(`${BASE_URL}?${params}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 1800 },
    signal: AbortSignal.timeout(8000),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error || "News request failed");
  }
  return data as {
    data?: { results?: unknown[]; count?: number };
    error?: string;
  };
}
