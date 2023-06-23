import {
  GradientText,
  HeroAvatar,
  HeroSocial,
  Section,
} from "@/components/core";

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Hi there, I'm <GradientText>Kousher</GradientText> 👋
        </>
      }
      description={
        <>
          In my everyday engineering life I enjoy solving problems and helping
          people to succeed. Confident in my ability to drive success and foster
          collaboration, I am excited to contribute to an organization's growth
          and achieve shared goals.
        </>
      }
      avatar={
        <img
          className="h-80 w-64"
          src="/assets/images/avatar.svg"
          alt="Avatar image"
          loading="lazy"
        />
      }
      socialButtons={
        <>
          <a href="https://www.linkedin.com/in/kousheralam/" target="_blank">
            <HeroSocial
              src="/assets/images/linkedin-icon.png"
              alt="Linkedin icon"
            />
          </a>
          <a
            href="https://github.com/kousherAlam"
            className="github-icon"
            target="_blank"
          >
            <HeroSocial
              src="/assets/images/github_icon.png"
              alt="Github icon"
            />
          </a>
          <a href="https://www.youtube.com/@kousheralam" target="_blank">
            <HeroSocial
              src="/assets/images/youtube-icon.png"
              alt="Youtube icon"
            />
          </a>
        </>
      }
    />
  </Section>
);

export { Hero };
