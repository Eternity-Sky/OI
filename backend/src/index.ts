import express from 'express';
import cors from 'cors';
import path from 'path';
import problemRoutes from './routes/problems';

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// API 路由
app.use('/api', problemRoutes);

// 在生产环境中服务前端静态文件
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
}); 