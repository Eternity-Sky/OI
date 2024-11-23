import React, { useState, useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import { Problem } from '../../types/problem';

const ProblemList: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await fetch('/api/problems');
      const data = await response.json();
      setProblems(data);
    } catch (error) {
      console.error('获取题目列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '题号',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      render: (difficulty: string) => (
        <Tag color={
          difficulty === 'easy' ? 'green' :
          difficulty === 'medium' ? 'orange' : 'red'
        }>
          {difficulty.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: '通过率',
      dataIndex: 'acceptanceRate',
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={problems}
      loading={loading}
      rowKey="id"
    />
  );
};

export default ProblemList; 