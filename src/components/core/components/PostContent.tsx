import type { ReactNode } from "react";

import type { IFrontmatter } from "../types/IFrontMatter";

type IPostContentProps = {
  content: IFrontmatter;
  children: ReactNode;
};

const PostContent = (props: IPostContentProps) => (
  <div className="mx-auto mt-5 max-w-prose">
    <div className="prose prose-invert mt-8 prose-img:rounded-lg">
      {props.children}
    </div>
  </div>
);

export { PostContent };
