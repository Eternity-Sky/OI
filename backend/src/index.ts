import express from 'express';
import cors from 'cors';
import problemRoutes from './routes/problems';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', problemRoutes);

// 静态文件服务
app.use(express.static('frontend/build'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 