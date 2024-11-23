export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// 示例请求函数
export const fetchProblems = async () => {
  const response = await fetch(`${API_BASE_URL}/api/problems`);
  return response.json();
}; 