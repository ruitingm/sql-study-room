export type ProblemDifficultyTag = "Easy" | "Medium" | "Hard";

export type ProblemSolution = {
  sId: number;
  sDescription: string;
};

export type Problem = {
  pId: number;
  pTitle: string;
  difficultyTag: ProblemDifficultyTag;
  conceptTag: string[];
  pDescription: string;
  pSolutionId: number | null;
  pSolution?: ProblemSolution;
};

export type ProblemDataset = {
  pId: number;
};

export type problemFilter = "All" | "Reviewed" | "Unreviewed";

export const problemCategories = [
  "Basic",
  "Join",
  "Aggregation",
  "Window Function",
  "Conditional",
  "Set Operation",
  "Subquery",
  "CTE",
] as const;

export type ProblemCategory = (typeof problemCategories)[number];
