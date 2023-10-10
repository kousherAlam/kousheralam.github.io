import { format } from "date-fns";
import type { IFrontmatter } from "../types/IFrontMatter";

type IPostHeaderProps = {
  content: IFrontmatter;
  author: string;
};

const PostHeader = (props: IPostHeaderProps) => (
  <div className="relative text-orange-400">
    <div
      className="aspect-w-3 aspect-h-1 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${props.content.thumbnail.src})`,
      }}
    ></div>
    <div className="absolute bottom-0 bg-gradient-to-r to-slate-500 from-slate-600 w-full pl-3 pr-3 pt-5 pb-5">
      <h1 className="text-left text-4xl font-bold mb-1 tracking-wide [word-spacing:.15em]">
        {props.content.title}
      </h1>

      <div className="mt-2 text-left text-sm ">
        <span className="text-xs">By</span>
        <span className="ml-1">
          <a href="/">{props.author}</a>
        </span>
        <span className="text-xs ml-4">Published on</span>
        <span className="ml-1">
          {format(new Date(props.content.published), "LLL d, yyyy")}
        </span>
      </div>
    </div>
  </div>
);

export { PostHeader };
