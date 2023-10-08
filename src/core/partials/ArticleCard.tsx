import type { MDXInstance } from "astro";
import type { IFrontmatter } from "../types/IFrontMatter";
import { format } from "date-fns";

interface ArticleCardProps {
  data: MDXInstance<IFrontmatter>;
}

function getArticleLink(link: string | undefined) {
  return (link || "").replace(/\.md(x)/, "");
}

export default function ArticleCard({ data }: ArticleCardProps) {
  return (
    <div className="">
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
          <li>[{data.frontmatter.type}]</li>
          <li className="pl-3">
            <span>Last Updated on: </span>{" "}
            <span>
              {format(new Date(data.frontmatter?.published), "LLL d, yyyy")}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
