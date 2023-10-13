import googleCyberSecBadge from "@/assets/images/certificate-badge/google-cybersecurity.png";
import awsSecBadge from "@/assets/images/certificate-badge/aws-sol-arc-associate.png";

export const AppConfig = {
  site_name: "Kousher's blog",
  title: "Kousher's blog",
  author: 'Kousher Alam',
  locale_region: 'en-us',
  locale: 'en',
  job: {
    title: 'Senior solutions developer',
    org: `Otto International`,
    link: `https://ottoint.com`,
  },
  social: {
    linkedIn: `https://www.linkedin.com/in/kousheralam/`,
    github: `https://github.com/kousherAlam`,
    youtube: `https://www.youtube.com/@kousheralam`,
  },
  description: `As a Software Engineer with 6+ years of experience in working for web
applications and large tailor made systems. I believe with a good team
and scalable mindset we can build revolutionary products which have the
potential to change the world.`,
  skills: [
    'Javascript',
    'Nodejs',
    'Oauth',
    'Active Directory',
    'Svelte',
    'React',
    'AWS',
    'Terraform',
    'Microservice',
    'Docker',
    'Kubernetes',
    'Cyber Security',
  ],
  certifications: [
    {
      title: `Google Cybersecurity Professional Certificate`,
      badge: googleCyberSecBadge,
      authority: {
        name: 'Coursera',
        link: 'https://coursera.org/',
      },
      verificationLink: `https://coursera.org/share/4879543210f5673ae103625c409dba6b`,
      issued: `August 29, 2023`
    },
    {
      title: `AWS Certified Solutions Architect – Associate`,
      badge: awsSecBadge,
      authority: {
        name: 'Amazon Web Services Training and Certification',
        link: 'https://www.credly.com/org/amazon-web-services',
      },
      verificationLink: `https://www.credly.com/badges/63186822-9769-4af5-8717-28aa63de0cc2/public_url`,
      issued: `November 30, 2022`
    },
    {
      title: ``,
      badge: "",
      authority: {
        name: '',
        link: '',
      },
      verificationLink: ``,
      issued: ``
    }
  ]
};
