import React, { useState, useEffect, useCallback } from 'react';
import { Card, Divider, Button, message, Alert } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, WarningFilled, LoadingOutlined } from '@ant-design/icons';
import { Editor } from '@monaco-editor/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Problem } from '../types/problem';

const ProblemDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchProblemDetail = useCallback(async (problemId: number) => {
    try {
      const response = await fetch(`/api/problems/${problemId}`);
      const data = await response.json();
      setProblem(data);
    } catch (error) {
      message.error('获取题目详情失败');
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchProblemDetail(parseInt(id));
    }
  }, [id, fetchProblemDetail]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      message.loading({ content: '正在评测...', key: 'submit' });
      
      const response = await fetch(`/api/problems/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language: 'cpp',
        }),
      });
      
      const result = await response.json();
      setResult(result);
      
      if (result.status === 'accepted') {
        message.success({
          content: '提交成功',
          key: 'submit',
          duration: 2
        });
      } else {
        message.error({
          content: '提交失败',
          key: 'submit',
          duration: 2
        });
      }
    } catch (error) {
      message.error({
        content: '提交失败，请重试',
        key: 'submit'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    const getAlertType = () => {
      switch (result.status) {
        case 'accepted': return 'success';
        case 'wrong_answer': return 'error';
        case 'compile_error': return 'warning';
        case 'runtime_error': return 'error';
        default: return 'info';
      }
    };

    const getStatusIcon = () => {
      switch (result.status) {
        case 'accepted':
          return <CheckCircleFilled style={{ color: '#52c41a', marginRight: 8 }} />;
        case 'wrong_answer':
          return <CloseCircleFilled style={{ color: '#ff4d4f', marginRight: 8 }} />;
        case 'compile_error':
          return <WarningFilled style={{ color: '#faad14', marginRight: 8 }} />;
        case 'runtime_error':
          return <CloseCircleFilled style={{ color: '#ff4d4f', marginRight: 8 }} />;
        case 'time_limit_exceeded':
          return <CloseCircleFilled style={{ color: '#ff4d4f', marginRight: 8 }} />;
        case 'running':
          return <LoadingOutlined style={{ color: '#1890ff', marginRight: 8 }} />;
        default:
          return <CloseCircleFilled style={{ color: '#ff4d4f', marginRight: 8 }} />;
      }
    };

    const getStatusText = () => {
      switch (result.status) {
        case 'accepted': return '通过';
        case 'wrong_answer': return '答案错误';
        case 'compile_error': return '编译错误';
        case 'runtime_error': return '运行错误';
        case 'running': return '评测中';
        default: return '未知状态';
      }
    };

    return (
      <Card title={
        <span>
          {getStatusIcon()}
          评测结果
        </span>
      } style={{ marginTop: 16 }}>
        <Alert
          type={getAlertType()}
          message={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {getStatusIcon()}
              {getStatusText()}
            </span>
          }
          description={
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>状态: {getStatusText()}</span>
              </div>
              {result.executionTime && (
                <div>运行时间: {result.executionTime}ms</div>
              )}
              {result.memoryUsage && (
                <div>内存使用: {result.memoryUsage}KB</div>
              )}
              {result.message && (
                <div>详细信息: {result.message}</div>
              )}
              {result.input && (
                <>
                  <div>输入: {result.input}</div>
                  <div>你的输出: {result.output}</div>
                  <div>预期输出: {result.expected}</div>
                </>
              )}
            </div>
          }
        />
      </Card>
    );
  };

  return (
    <div className="problem-detail">
      <Button onClick={() => navigate('/')} style={{ marginBottom: 16 }}>
        返回题目列表
      </Button>
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
          
          <Button 
            type="primary" 
            onClick={handleSubmit}
            loading={submitting}
            style={{ marginTop: 16 }}
          >
            提交代码
          </Button>

          {renderResult()}
        </>
      )}
    </div>
  );
};

export default ProblemDetail; 