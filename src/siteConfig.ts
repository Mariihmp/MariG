import type {
  SiteConfiguration,
  NavigationLinks,
  SocialLinks,
} from "@/types.ts";

export const SITE: SiteConfiguration = {
  title: "NeonHive",
  description:
    "my blog page where I try to be a great story teller",
  url: "https://mariihmp.github.io",
  author: "MariG",
  locale: "en-US",
};

export const NAV_LINKS: NavigationLinks = {
 
  
  blog: {
    path: "/blog",
    label: "Blog",
  },
  projects: {
    path: "/projects",
    label: "Projects",
  }, 
  about: {
    path: "/about",
    label: "About",}
  // videoEssays: {
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
