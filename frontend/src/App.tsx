import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import ProblemList from './pages/ProblemList';
import ProblemDetail from './pages/ProblemDetail';
import 'antd/dist/antd.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  useEffect(() => {
    console.log('API URL:', process.env.REACT_APP_API_URL);
  }, []);

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ margin: '0 24px 0 0', color: 'white' }}>
          OI 在线评测系统
        </Title>
        <Menu 
          theme="dark" 
          mode="horizontal" 
          defaultSelectedKeys={['1']}
          style={{ flex: 1 }}
        >
          <Menu.Item key="1">
            <Link to="/">题目列表</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)', background: '#fff' }}>
        <Routes>
          <Route path="/" element={<ProblemList />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App; 