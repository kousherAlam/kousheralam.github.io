import type { ReactNode } from "react";
import { PostHeader } from "@/components/PostHeader";
import { PostContent } from "@/components/PostContent";
import { IFrontmatter } from "@/types/IFrontMatter";
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
