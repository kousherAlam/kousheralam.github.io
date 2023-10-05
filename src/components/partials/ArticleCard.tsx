import type { IFrontmatter } from "../core";

interface ArticleCardProps {
  data: IFrontmatter;
}

function getArticleLink(link: string) {
  const withoutMdx = link.replace(/\.md(x)/, "");
  return withoutMdx.replace(/src\/contents\/(articles|projects)\//, "");
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
