export type RuleType = "step-content" | "step-list";
export type RuleSeverity = "error" | "warning";

export interface Rule {
  code: string; // e.g., "TemplateMustBeFollowedBySolution"
  type: RuleType;
  severity: RuleSeverity; // default: error
  title: string;
  summary: string;
  rationale?: string;
  validExample?: string; // fenced code/md examples
  invalidExample?: string;
  seeAlso?: string[]; // links or other codes
}

export interface RuleSection {
  name: string;
  anchor: string;
  rules: Rule[];
}

export const validationSections: RuleSection[] = [
  {
    name: "Section",
    anchor: "section",
    rules: [
      {
        code: "SectionMustChangeReadme",
        type: "step-content",
        severity: "error",
        title: "Section must change README",
        summary: "A Section step must modify README content.",
      },
      {
        code: "SectionMustChangeReadmeOnly",
        type: "step-content",
        severity: "error",
        title: "Section changes README only",
        summary: "A Section step must only modify README.",
      },
    ],
  },
  {
    name: "Template & Solution",
    anchor: "template-solution",
    rules: [
      {
        code: "TemplateMustBeFollowedBySolution",
        type: "step-list",
        severity: "error",
        title: "Template must be followed by Solution",
        summary: "Any Template step must be immediately followed by a Solution step.",
      },
      {
        code: "SolutionMustFollowTemplateOrAction",
        type: "step-list",
        severity: "error",
        title: "Solution must follow Template or Action",
        summary: "A Solution step must immediately follow a Template or an Action step.",
      },
    ],
  },
  {
    name: "README",
    anchor: "readme",
    rules: [
      {
        code: "ReadmeMustBeOne",
        type: "step-content",
        severity: "error",
        title: "Exactly one README step",
        summary: "The tutorial must contain exactly one README step.",
      },
      {
        code: "ReadmeMustBeLast",
        type: "step-list",
        severity: "error",
        title: "README must be last",
        summary: "The README step must be the final step in the tutorial.",
      },
    ],
  },
];


