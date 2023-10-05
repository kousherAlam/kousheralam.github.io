import type { IFrontmatter } from "@/core";
import { PostContent, PostHeader } from "@/core";
import type { ReactNode } from "react";

import { AppConfig } from "@/utils/AppConfig";

type IBlogPostProps = {
  frontmatter: IFrontmatter;
  children: ReactNode;
};

const BlogPost = (props: IBlogPostProps) => (
  <div>
    <PostHeader content={props.frontmatter} author={AppConfig.author} />
    <PostContent content={props.frontmatter}>{props.children}</PostContent>
  </div>
);

export { BlogPost };
