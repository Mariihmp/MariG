import type {
  SiteConfiguration,
  NavigationLinks,
  SocialLinks,
} from "@/types.ts";

export const SITE: SiteConfiguration = {
  title: "NeonHive",
  description:
    "my blog page where I try to be a great story teller",
  url: "https://barebones.superwebthemes.com",
  author: "MariG",
  locale: "en-US",
};

export const NAV_LINKS: NavigationLinks = {
  blog: {
    path: "/myblog/blog",
    label: "Blog",
  },
  projects: {
    path: "/myblog/projects",
    label: "Projects",
  }, 
  about: {
    path: "/myblog/about",
    label: "About",}
  //   path: "/videoEssays",
  //   label: "video Essays",
  // },
};

export const SOCIAL_LINKS: SocialLinks = {
  email: {
    label: "Email",
    url: "marhmpa@gmail.com",
  },
  github: {
    label: "GitHub",
    url: "https://github.com/Mariihmp/MariG",
  },
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/w3schools.com/",
    
  },
};
  