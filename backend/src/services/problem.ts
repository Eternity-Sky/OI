import { Problem } from '../models/Problem';

interface ProblemQuery {
  page: number;
  limit: number;
  difficulty?: string;
  tags?: string[];
}

export class ProblemService {
  private problems: Problem[] = []; // 临时存储，之后替换为数据库

  async getProblems(query: ProblemQuery): Promise<Problem[]> {
    // 模拟数据
    return this.problems;
  }

  async getProblemById(id: number): Promise<Problem | null> {
    const problem = this.problems.find(p => p.id === id);
    return problem || null;
  }
} 