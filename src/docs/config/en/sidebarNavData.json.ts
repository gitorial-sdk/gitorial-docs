import type { DocsSidebarNavData } from "../types/configDataTypes";

/**
 * Combined sidebar navigation data for the English locale
 */
const sidebarNavData: DocsSidebarNavData = {
  /**
   * Documentation tabs configuration
   * These define the different top-level documentation section tabs
   */
  tabs: [
    {
      // "main" is the default tab keyword
      id: "main",
      title: "Documentation",
      description: "Gitorial VS Code Extension Documentation",
      icon: "tabler/file-text",
      // Ordered list of sidebar sections for the 'main' tab
      // The "id" of each section should match a folder in the docs content collection
      sections: [
        {
          id: "getting-started",
          title: "Getting Started",
        },
        {
          id: "features",
          title: "Features",
        },
        {
          id: "development",
          title: "Development",
        },
      ],
    },
  ],
};

export default sidebarNavData;
