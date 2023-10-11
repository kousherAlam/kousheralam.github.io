import { format } from "date-fns";
import type { IFrontmatter } from "../types/IFrontMatter";

type IPostHeaderProps = {
  content: IFrontmatter;
  author: string;
};

const PostHeader = (props: IPostHeaderProps) => (
  <div className=" text-orange-400">
    <div className="">
      <h1 className="text-left text-4xl font-bold mb-1 ">
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
