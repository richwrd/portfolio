export async function getDevToPosts() {
  try {
    const devToUsername = process.env.DEVTO_USERNAME;
    if (!devToUsername) {
      return [];
    }

    const response = await fetch(
      `https://dev.to/api/articles?username=${devToUsername}&per_page=3&page=1`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Eduardo Richard Portfolio",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map(
      (article: {
        id: number;
        title?: string;
        description?: string;
        url?: string;
        cover_image?: string;
        published_at?: string;
        reading_time_minutes?: number;
        public_reactions_count?: number;
        positive_reactions_count?: number;
        tag_list?: string[];
        tags?: string;
      }) => {
        const tagList =
          article.tag_list || (article.tags ? article.tags.split(", ") : []);

        return {
          id: article.id.toString(),
          title: article.title || "Untitled",
          description: article.description || "",
          url: article.url || `https://dev.to/${devToUsername}/${article.id}`,
          image: article.cover_image,
          publishedAt: article.published_at || new Date().toISOString(),
          readTime: article.reading_time_minutes,
          reactions:
            article.public_reactions_count || article.positive_reactions_count,
          tags: tagList,
        };
      }
    );
  } catch (error) {
    console.error("Error fetching dev.to posts:", error);
    return [];
  }
}
