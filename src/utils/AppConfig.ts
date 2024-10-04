import googleCyberSecBadge from "@/assets/images/certificate-badge/google-cybersecurity.png";
import awsSecBadge from "@/assets/images/certificate-badge/aws-sol-arc-associate.png";


import ottoLogo from "@/assets/images/logos/otto.png";
import selLogo from "@/assets/images/logos/selise.png";
import nybLogo from "@/assets/images/logos/nybsys.png";
import atiqLogo from "@/assets/images/logos/atique-it.png";


export const AppConfig = {
  title: "Kousher's blog",
  author: 'Kousher Alam',
  locale_region: 'en-us',
  locale: 'en',
  introTitle: `A Happy <span>Software Engineer<span>`,
  social: {
    linkedIn: `https://www.linkedin.com/in/kousheralam/`,
    github: `https://github.com/kousherAlam`,
    youtube: `https://www.youtube.com/@kousheralam`,
  },
  description: `Experienced software engineer adept at building and maintaining large-scale enterprise software solutions. Skilled in full-stack development, cloud deployments, and security implementations. Proven track record of driving efficiency and facilitating seamless operations in dynamic environments.`,
  modal: {
    hireMe: {
      title: 'Hire Me',
      description: `Please provide following information`,
      btnText: 'Send Message',
      loading: `Loading`,
      success: `Thank you, I received your message. I will get back to you as soon
            possible.`,
      failure: `Failed to send the message, Please try again later.`
    },
    newsletter: {
      title: 'Newsletter Subscription',
      description: `Please provide following information`,
      btnText: 'Subscribe',
      loading: `Subscribing`,
      success: `You successfully subscribed to my newsletter!`,
      failure: `Error happend!!, Please try again later.`
    },
    feedback: {
      title: 'Feedback',
      description: `Please provide following information`,
      btnText: 'Send Feedback',
      loading: `Sending`,
      success: `Thank you, I received your feedback.`,
      failure: `Failed to send the feedback, Please try again later.`
    },
    helpme: {
      title: 'Help form',
      description: `Please provide following information`,
      btnText: 'Send Message',
      loading: `Sending`,
      success: `Thank you, I received your message. I will get back to you as soon
            possible.`,
      failure: `Failed to send the message, Please try again later.`
    }
  },
  skills: [
    'Go',
    'Web Dev',
    'BlockChain',
    'Casbin',
    'OPA',
    'REST API',
    'SDK Dev',
    'Javascript',
    'Nodejs',
    'PHP',
    'ReactJS',
    'Next.js',
    'Git',
    'Github Action',
    'Docker',
    'Project Management',
    'oAuth 2.0',
    'Terraform',
    'Microservice',
    'Unit Testing',
    'MySQL',
    'MongoDB',
    'AWS',
    'Firebase',
    'RabbitMQ'
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
  ],
  experience: [
    {
      company: "Otto International",
      position: "Senior solutions developer",
      logo: ottoLogo,
      website: "https://ottoint.com/",
      start: "Feb 2021",
      end: "Present"
    },
    {
      company: "SELISE Digital Platforms",
      position: "Software Engineer",
      logo: selLogo,
      website: "https://selisegroup.com/",
      start: "Aug 2020",
      end: "Dec 2020"
    },
    {
      company: "NybSys",
      position: "Web Developer",
      logo: nybLogo,
      website: "https://nybsys.com/",
      start: "Jul 2017",
      end: "Jul 2020"
    },
    {
      company: "AtiqueIT",
      position: "PHP Programmer",
      logo: atiqLogo,
      website: "https://www.linkedin.com/company/atique-it/about/",
      start: "Mar 2017",
      end: "July 2017"
    }
  ]
};
