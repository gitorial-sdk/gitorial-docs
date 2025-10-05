import type { DocsSiteData } from "../types/configDataTypes";

const docsSiteData: DocsSiteData = {
  title: "Gitorial",
  description:
    "Interactive tutorials for VS Code - Learn coding concepts through guided, hands-on experiences with the Gitorial extension.",
  navSocials: [
    {
      social: "GitHub",
      link: "https://github.com/gitorial-sdk/gitorial-vscode.git",
      icon: "tabler/brand-github",
    },
  ],
  footerSocials: [
    {
      social: "GitHub",
      link: "https://github.com/gitorial-sdk/gitorial-vscode.git",
      icon: "tabler/brand-github",
    },
    {
      social: "X formerly known as Twitter",
      link: "https://x.com/BowTiedWebReapr",
      icon: "tabler/brand-x",
    },
    {
      social: "Threads",
      link: "https://www.threads.net/@bowtiedwebreaper",
      icon: "tabler/brand-threads",
    },
    {
      social: "BlueSky",
      link: "https://bsky.app/profile/webreaper.dev",
      icon: "tabler/brand-bluesky",
    },
  ],
  // default image for meta tags if the page doesn't have an image already
  defaultImage: {
    src: "/images/gitorial-logo.png",
    alt: "Gitorial Logo",
  },
  // Your information for SEO purposes
  author: {
    name: "Andrzej Sulkowski",
    email: "author@gitorial-sdk.com",
    twitter: "BowTiedWebReapr",
  },
};

export default docsSiteData;
