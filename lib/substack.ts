import Parser from "rss-parser";

type LatestPost = {
  title: string;
  link: string;
  excerpt: string;
  date?: string;
};

const FEED_URL = "https://lucyontheground.substack.com/feed";

function toPlainText(input: string) {
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(input: string, max = 180) {
  if (input.length <= max) return input;
  return input.slice(0, max).replace(/\s+\S*$/, "").trim() + "…";
}

export async function getLatestSubstackPost(): Promise<LatestPost | null> {
  try {
    const response = await fetch(FEED_URL, { next: { revalidate: 60 * 60 } });
    if (!response.ok) return null;

    const xml = await response.text();
    const parser = new Parser();
    const feed = await parser.parseString(xml);
    const item = feed.items?.[0];

    if (!item?.title || !item?.link) return null;

    const rawExcerpt = item.contentSnippet || item.content || "";
    const excerpt = truncate(toPlainText(rawExcerpt), 180);

    return {
      title: item.title,
      link: item.link,
      excerpt: excerpt || "New posts coming soon.",
      date: item.pubDate,
    };
  } catch {
    return null;
  }
}

export type { LatestPost };
export { FEED_URL };
