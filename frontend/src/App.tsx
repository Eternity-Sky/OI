import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import ProblemList from './pages/ProblemList';
import ProblemDetail from './pages/ProblemDetail';
import 'antd/dist/antd.css';
import './styles/global.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  useEffect(() => {
    console.log('API URL:', process.env.REACT_APP_API_URL);
  }, []);

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={3} className="header-title">
          OI 在线评测系统
        </Title>
        <Menu 
          theme="dark" 
          mode="horizontal" 
          defaultSelectedKeys={['1']}
          className="main-menu"
        >
          <Menu.Item key="1">
            <Link to="/">题目列表</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="content-wrapper">
        <Routes>
          <Route path="/" element={<ProblemList />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App; 