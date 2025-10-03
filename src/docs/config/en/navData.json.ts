/**
 * * This file is used to define the navigation links for the Gitorial documentation site.
 */

// types
import { type navItem } from "../types/configDataTypes";

const navConfig: navItem[] = [
  {
    text: "Getting Started",
    link: "/docs/getting-started/",
  },
  {
    text: "Features",
    link: "/docs/features/",
  },
  {
    text: "Development",
    link: "/docs/development/",
  },
  {
    text: "GitHub",
    link: "https://github.com/gitorial-sdk/gitorial-vscode.git",
    newTab: true,
  },
];

export default navConfig;