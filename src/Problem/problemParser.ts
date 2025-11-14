import type { Problem, ProblemDifficultyTag } from "./problemType";
import problemJson from "../Database/problem.json";

export function parseProblems(): Problem[] {
  return problemJson.map((p) => {
    const difficulty = p.difficultyTag;
    if (!["Easy", "Medium", "Hard"].includes(difficulty)) {
      throw new Error(`Invalid difficultyTag: ${difficulty}`);
    }
    return {
      ...p,
      difficultyTag: difficulty as ProblemDifficultyTag,
      pSolutionId: p.pSolutionId,
      conceptTag: [...p.conceptTag],
    };
  });
}
