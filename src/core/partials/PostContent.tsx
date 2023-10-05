import type { ReactNode } from "react";

import type { IFrontmatter } from "../types/IFrontMatter";

type IPostContentProps = {
  content: IFrontmatter;
  children: ReactNode;
};

const PostContent = (props: IPostContentProps) => (
  <div className="prose max-w-4xl xl:prose-2xl prose-invert mt-8 prose-img:rounded-lg">
    {props.children}
  </div>
);

export { PostContent };
