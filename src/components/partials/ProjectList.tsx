import {
  ColorTags,
  GradientText,
  IFrontmatter,
  Project,
  Section,
  Tags,
} from "@/components/core";
import type { MarkdownInstance } from "astro";

type IProjectListProps = {
  frontmatter: MarkdownInstance<IFrontmatter>;
};

const ProjectList = (
  props: { projectList: MarkdownInstance<IFrontmatter>[] } = { projectList: [] }
) => (
  <Section
    title={
      <div className="flex items-baseline justify-between">
        <div>
          Recent <GradientText>Projects</GradientText>
        </div>

        <div className="text-sm">
          <a href="/projects/">View all Projects →</a>
        </div>
      </div>
    }
  >
    <div className="flex flex-col gap-6">
      {props.projectList.map((proj, index) => {
        return (
          <Project
            key={`project-list-${index}`}
            name={proj.frontmatter.title}
            description={proj.frontmatter.description}
            link={proj.url || ""}
            img={{
              src: proj.frontmatter.thumbnail.src,
              alt: proj.frontmatter.thumbnail.alt,
            }}
            category={
              <>
                <Tags color={ColorTags.FUCHSIA}>Flutter</Tags>
                <Tags color={ColorTags.LIME}>Firebase</Tags>
                <Tags color={ColorTags.SKY}>REST</Tags>
              </>
            }
          />
        );
      })}
    </div>
  </Section>
);

export { ProjectList };
