const express = require('express');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs').promises;

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 模拟数据
const problems = [
  {
    id: 1,
    title: "两数之和",
    description: "给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数。",
    inputFormat: "第一行包含一个整数n，表示数组长度\n第二行包含n个整数，表示数组元素\n第三行包含一个整数target",
    outputFormat: "两个整数，表示满足条件的数组下标",
    samples: [
      {
        input: "4\n2 7 11 15\n9",
        output: "0 1"
      }
    ],
    timeLimit: 1000,
    memoryLimit: 256,
    difficulty: "easy",
    tags: ["数组", "哈希表"],
    acceptanceRate: 0.45
  }
];

// API 路由
app.get('/api/problems', (req, res) => {
  res.json(problems);
});

app.get('/api/problems/:id', (req, res) => {
  const problem = problems.find(p => p.id === parseInt(req.params.id));
  if (!problem) {
    return res.status(404).json({ error: '题目不存在' });
  }
  res.json(problem);
});

// 提交评测
app.post('/api/problems/:id/submit', async (req, res) => {
  const { code, language } = req.body;
  const problemId = parseInt(req.params.id);
  
  try {
    // 创建临时文件夹
    const tmpDir = path.join(__dirname, 'temp');
    await fs.mkdir(tmpDir, { recursive: true });
    
    // 保存代码到文件
    const codePath = path.join(tmpDir, 'solution.cpp');
    await fs.writeFile(codePath, code);
    
    // 编译代码
    const execPath = path.join(tmpDir, 'solution');
    await new Promise((resolve, reject) => {
      exec(`g++ ${codePath} -o ${execPath}`, (error, stdout, stderr) => {
        if (error) {
          reject({ status: 'compile_error', message: stderr || error.message });
        } else {
          resolve();
        }
      });
    });

    // 准备测试数据
    const input = "4\n2 7 11 15\n9";
    const expectedOutput = "0 1";
    
    // 运行程序
    const result = await new Promise((resolve, reject) => {
      let output = '';
      let error = '';
      
      const child = exec(`${execPath}`, {
        timeout: 1000 // 1秒超时
      }, (err, stdout, stderr) => {
        if (err && err.killed) {
          reject({ status: 'time_limit_exceeded', message: '运行超时' });
        } else if (err) {
          reject({ status: 'runtime_error', message: stderr || err.message });
        } else {
          resolve(stdout.trim());
        }
      });
      
      // 写入输入数据
      child.stdin.write(input);
      child.stdin.end();
      
      // 收集输出
      child.stdout.on('data', (data) => {
        output += data;
      });
      
      // 收集错误
      child.stderr.on('data', (data) => {
        error += data;
      });
    });
    
    // 检查输出
    if (result === expectedOutput) {
      res.json({
        status: 'accepted',
        executionTime: 100,
        memoryUsage: 25600,
        message: '恭喜！答案正确',
        input,
        output: result,
        expected: expectedOutput,
        details: {
          testCase: 1,
          totalTestCases: 1,
          passed: true
        }
      });
    } else {
      res.json({
        status: 'wrong_answer',
        executionTime: 100,
        memoryUsage: 25600,
        message: `答案错误\n预期输出：${expectedOutput}\n实际输出：${result}`,
        input,
        output: result,
        expected: expectedOutput,
        details: {
          testCase: 1,
          totalTestCases: 1,
          passed: false
        }
      });
    }
    
    // 清理临时文件
    await fs.rm(tmpDir, { recursive: true, force: true });
    
  } catch (error) {
    res.json({
      status: error.status || 'error',
      executionTime: 0,
      memoryUsage: 0,
      message: error.message || '未知错误',
      details: {
        error: error.message,
        type: error.status || 'unknown'
      }
    });
  }
});

// 静态文件服务
app.use(express.static('frontend/build'));

// 所有其他请求都返回 index.html
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'frontend', 'build', 'index.html');
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('前端文件未构建，请先运行 npm run build:frontend');
  }
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
}); 