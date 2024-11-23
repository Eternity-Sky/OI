interface Problem {
  id: number;
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  samples: {
    input: string;
    output: string;
  }[];
  timeLimit: number;  // ms
  memoryLimit: number;  // MB
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const problemSchema = {
  // PostgreSQL schema 定义
} 