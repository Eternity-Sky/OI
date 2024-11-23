interface Submission {
  id: number;
  userId: number;
  problemId: number;
  code: string;
  language: string;
  status: 'pending' | 'running' | 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'memory_limit_exceeded' | 'runtime_error';
  executionTime?: number;
  memoryUsage?: number;
  createdAt: Date;
} 