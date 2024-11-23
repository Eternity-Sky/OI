import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import ProblemList from './pages/ProblemList';
import ProblemDetail from './pages/ProblemDetail';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header style={{ color: 'white' }}>OI 在线评测系统</Header>
      <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
        <Routes>
          <Route path="/" element={<ProblemList />} />
          <Route path="/problem/:id" element={<ProblemDetail problemId={0} />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App; 