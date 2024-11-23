import express, { Request, Response } from 'express';
import { Problem } from '../models/Problem';
import { ProblemService } from '../services/problem';

const router = express.Router();
const problemService = new ProblemService();

// 获取题目列表
router.get('/problems', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, difficulty, tags } = req.query;
    const problems = await problemService.getProblems({
      page: Number(page),
      limit: Number(limit),
      difficulty: difficulty as string,
      tags: tags as string[]
    });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: '获取题目列表失败' });
  }
});

// 获取题目详情
router.get('/problems/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const problem = await problemService.getProblemById(Number(id));
    if (!problem) {
      return res.status(404).json({ error: '题目不存在' });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: '获取题目详情失败' });
  }
});

export default router; 