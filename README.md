# 在线题库系统

一个现代化的在线编程题库系统，提供算法、数据结构等多个领域的编程练习题目。

> 注意：本地开发版本可能与 GitHub 版本存在差异，请以本地版本为准。

## 功能特点

### 用户系统
- 用户注册/登录功能
- 个性化头像上传
- 用户中心
- 学习进度追踪
- 等级与成就系统
- 每周目标设置

### 题目系统
- 丰富的题目库（算法、数据结构、数学等）
- 题目难度分级（简单、中等、困难）
- 智能题目推荐
- 题目搜索和筛选
- 完成进度追踪

### 题单系统
- 系统预设题单
- 按专题分类
- 循序渐进的学习路径
- 一键开始练习

## 版本说明

### 本地开发版本
- 包含最新功能和改进
- 实时更新的用户界面
- 完整的本地存储功能

### GitHub 版本
- 稳定的基础功能
- 定期同步更新
- 开源参考实现

## 分支管理

- `main`: 主分支，保持稳定
- `dev`: 开发分支，包含最新特性
- `feature/*`: 新功能开发分支
- `fix/*`: 问题修复分支

## 本地运行

1. 克隆项目到本地
```bash
git clone https://github.com/your-username/online-judge.git
```

2. 使用浏览器打开 index.html 即可运行

## 开发指南

1. 从 dev 分支创建新的功能分支
```bash
git checkout -b feature/new-feature dev
```

2. 开发完成后提交更改
```bash
git add .
git commit -m "feat: add new feature"
```

3. 合并到开发分支
```bash
git checkout dev
git merge feature/new-feature
```

4. 定期同步到 GitHub
```bash
git push origin dev
```

## 技术栈

- 前端：HTML5, CSS3, JavaScript
- 样式：自定义CSS + Font Awesome图标
- 存储：LocalStorage
- 部署：静态网页部署
