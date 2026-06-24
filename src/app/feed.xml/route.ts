import { getNews } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jotofagroup.co.tz";

export async function GET() {
  try {
    const articles = await getNews();

    const items = articles
      .filter((a) => a.title && a.slug)
      .slice(0, 50) // Limit to last 50 articles for feed size
      .map((article) => {
        const pubDate = article.published_at
          ? new Date(article.published_at).toUTCString()
          : new Date().toUTCString();

        return `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/news/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/news/${article.slug}</guid>
      <description><![CDATA[${article.excerpt || article.title}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${article.author || "JOTOFA GROUP"}</author>
      ${article.category ? `<category>${article.category}</category>` : ""}
    </item>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>JOTOFA GROUP — News &amp; Insights</title>
    <link>${siteUrl}/news</link>
    <description>Latest news, announcements, and insights from JOTOFA GROUP and its subsidiaries across Tanzania and East Africa.</description>
    <language>en-tz</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <generator>JOTOFA GROUP Website</generator>
    <webMaster>procurement@jotofagroup.co.tz (JOTOFA GROUP)</webMaster>
${items}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>JOTOFA GROUP — News</title><link>${siteUrl}/news</link><description>Temporarily unavailable</description></channel></rss>`,
      {
        status: 503,
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
      }
    );
  }
}
