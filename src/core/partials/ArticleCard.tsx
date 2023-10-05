import type { MDXInstance } from "astro";
import type { IFrontmatter } from "..";

interface ArticleCardProps {
  data: MDXInstance<IFrontmatter>;
}

function getArticleLink(link: string | undefined) {
  return (link || "").replace(/\.md(x)/, "");
}

export default function ArticleCard({ data }: ArticleCardProps) {
  return (
    <div className="py-4">
      <h4 className="text-xl mb-2">
        <a
          className="text-orange-500 visited:text-orange-600 hover:text-orange-400"
          href={getArticleLink(data.url)}
        >
          {data.frontmatter?.title}
        </a>
      </h4>
      <div>
        <ul className="list-none flex justify-start text-sm text-slate-500">
          <li>ArticleCard</li>
          <li className="pl-3">
            <span>Published on: </span> <span>{data.frontmatter?.pubDate}</span>
          </li>
          <li className="pl-3">
            <span>Last Update:</span>
            <span>{data.frontmatter?.pubDate}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
