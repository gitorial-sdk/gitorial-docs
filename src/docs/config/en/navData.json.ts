/**
 * * This file is used to define the navigation links for the documentation site.
 */

// types
import { type navItem } from "../types/configDataTypes";

const navConfig: navItem[] = [
  {
    text: "Introduction",
    link: "/docs/getting-started/",
  },
  {
    text: "Components",
    link: "/docs/components/",
  },
  {
    text: "Get Gitorial",
    link: "https://cosmicthemes.com/themes/Gitorial",
    newTab: true,
  },
];

export default navConfig;