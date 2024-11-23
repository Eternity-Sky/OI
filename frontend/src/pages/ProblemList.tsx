import React, { useState, useEffect } from 'react';
import { Table, Tag, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Problem } from '../types/problem';

const ProblemList: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      width: 80,
    },
    {
      title: '标题',
      dataIndex: 'title',
      render: (text: string, record: Problem) => (
        <Button type="link" onClick={() => navigate(`/problem/${record.id}`)}>
          {text}
        </Button>
      ),
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      width: 100,
      render: (difficulty: string) => (
        <Tag color={
          difficulty === 'easy' ? 'success' :
          difficulty === 'medium' ? 'warning' : 'error'
        }>
          {difficulty === 'easy' ? '简单' :
           difficulty === 'medium' ? '中等' : '困难'}
        </Tag>
      ),
    },
    {
      title: '通过率',
      dataIndex: 'acceptanceRate',
      width: 100,
      render: (rate: number) => `${(rate * 100).toFixed(1)}%`,
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#fff' }}>
      <Table 
        columns={columns} 
        dataSource={problems}
        loading={loading}
        rowKey="id"
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 题`
        }}
      />
    </div>
  );
};

export default ProblemList; 