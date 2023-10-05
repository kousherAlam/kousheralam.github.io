import type { IFrontmatter } from "@/components/core";
import { PostContent, PostHeader, Section } from "@/components/core";
import type { ReactNode } from "react";

import { AppConfig } from "@/utils/AppConfig";

type IBlogPostProps = {
  frontmatter: IFrontmatter;
  children: ReactNode;
};

const BlogPost = (props: IBlogPostProps) => (
  <Section>
    <PostHeader content={props.frontmatter} author={AppConfig.author} />
    <div className="mx-auto mt-5 max-w-prose relative mb-10"></div>
    <PostContent content={props.frontmatter}>{props.children}</PostContent>
  </Section>
);

export { BlogPost };
