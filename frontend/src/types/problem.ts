export interface Problem {
  id: number;
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  samples: {
    input: string;
    output: string;
  }[];
  timeLimit: number;
  memoryLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
} 