import React, { useState, useEffect } from 'react';
import { Card, Divider, message } from 'antd';
import { Editor } from '@monaco-editor/react';
import { Problem } from '../../types/problem';

interface Props {
  problemId: number;
}

const ProblemDetail: React.FC<Props> = ({ problemId }) => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    fetchProblemDetail();
  }, [problemId]);

  const fetchProblemDetail = async () => {
    try {
      const response = await fetch(`/api/problems/${problemId}`);
      const data = await response.json();
      setProblem(data);
    } catch (error) {
      message.error('获取题目详情失败');
    }
  };

  return (
    <div className="problem-detail">
      {problem && (
        <>
          <Card title={problem.title}>
            <h3>题目描述</h3>
            <div>{problem.description}</div>
            
            <h3>输入格式</h3>
            <div>{problem.inputFormat}</div>
            
            <h3>输出格式</h3>
            <div>{problem.outputFormat}</div>
            
            <h3>样例</h3>
            {problem.samples.map((sample, index) => (
              <div key={index}>
                <pre>输入：{sample.input}</pre>
                <pre>输出：{sample.output}</pre>
              </div>
            ))}
          </Card>
          
          <Divider />
          
          <Editor
            height="500px"
            language="cpp"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false }
            }}
          />
        </>
      )}
    </div>
  );
};

export default ProblemDetail; 