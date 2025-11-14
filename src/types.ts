

export type ProblemTag = {
  difficultyTag: "Easy" | "Medium" | "Hard";
  conceptTag: string[];
};

export type ProblemSolution = {
  sDesciption: string;
};

export type Problem = {
  pId: number;
  tag: ProblemTag;
  pDescription: string;
  solution: ProblemSolution;
};

export type ProblemDataset = {
  pId: number;
};

export type problemFilter = "All" | "Reviewed" | "Unreviewed";
