import { format } from "date-fns";

import type { IFrontmatter } from "../types/IFrontMatter";

type IPostHeaderProps = {
  content: IFrontmatter;
  author: string;
};

const PostHeader = (props: IPostHeaderProps) => (
  <>
    <div className="mx-auto mt-5  relative">
      <div className="aspect-w-3 aspect-h-2">
        <img
          className="h-full w-full rounded-lg object-cover object-center"
          src={props.content.thumbnail.src}
          alt={props.content.thumbnail.alt}
          loading="lazy"
        />
      </div>
      <div className=" border-t-2 border-green-600 absolute bottom-0 w-full bg-gray-200 text-black pl-3 pr-3 pt-5 pb-5">
        <h1 className="text-left text-3xl font-bold mb-1">
          {props.content.title}
        </h1>

        <div className="mt-2 text-left text-sm text-black">
          By {props.author} on{" "}
          {format(new Date(props.content.pubDate), "LLL d, yyyy")}
        </div>
      </div>
    </div>
  </>
);

export { PostHeader };
