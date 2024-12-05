const problems = [
    {
        id: 1,
        title: "A + B Problem",
        description: "给定两个整数A和B，输出它们的和。",
        input: "输入包含两个整数A和B。",
        output: "输出A和B的和。",
        sample_input: "1 2",
        sample_output: "3",
        difficulty: "简单",
        tags: ["数学", "基础"]
    },
    {
        id: 2,
        title: "最大公约数",
        description: "给定两个整数，求它们的最大公约数。",
        input: "输入包含两个整数。",
        output: "输出这两个整数的最大公约数。",
        sample_input: "12 18",
        sample_output: "6",
        difficulty: "中等",
        tags: ["数学", "算法"]
    },
    {
        id: 3,
        title: "斐波那契数列",
        description: "计算斐波那契数列的第N项。",
        input: "输入一个整数N。",
        output: "输出斐波那契数列的第N项。",
        sample_input: "5",
        sample_output: "5",
        difficulty: "简单",
        tags: ["递推", "动态规划"]
    },
    {
        id: 4,
        title: "阶乘计算",
        description: "计算给定整数的阶乘。",
        input: "输入一个整数N。",
        output: "输出N的阶乘。",
        sample_input: "4",
        sample_output: "24",
        difficulty: "简单",
        tags: ["递推", "数学"]
    },
    {
        id: 5,
        title: "爬楼梯问题",
        description: "计算爬楼梯的不同方法数。",
        input: "输入一个整数N，表示楼梯的阶数。",
        output: "输出爬到第N阶的方法数。",
        sample_input: "3",
        sample_output: "3",
        difficulty: "中等",
        tags: ["递推", "动态规划"]
    },
    {
        id: 6,
        title: "汉诺塔问题",
        description: "计算汉诺塔问题的最小移动次数。",
        input: "输入一个整数N，表示盘子的数量。",
        output: "输出最小移动次数。",
        sample_input: "3",
        sample_output: "7",
        difficulty: "中等",
        tags: ["递推", "算法"]
    },
    {
        id: 7,
        title: "斐波那契数列（优化）",
        description: "使用优化算法计算斐波那契数列的第N项。",
        input: "输入一个整数N。",
        output: "输出斐波那契数列的第N项。",
        sample_input: "10",
        sample_output: "55",
        difficulty: "中等",
        tags: ["递推", "动态规划"]
    },
    {
        id: 8,
        title: "二项式系数",
        description: "计算二项式系数C(n, k)。",
        input: "输入两个整数n和k。",
        output: "输出C(n, k)。",
        sample_input: "5 2",
        sample_output: "10",
        difficulty: "中等",
        tags: ["递推", "数学"]
    },
    {
        id: 9,
        title: "最长递增子序列",
        description: "计算数组的最长递增子序列的长度。",
        input: "输入一个整数数组。",
        output: "输出最长递增子序列的长度。",
        sample_input: "10 9 2 5 3 7 101 18",
        sample_output: "4",
        difficulty: "困难",
        tags: ["递推", "动态规划"]
    },
    {
        id: 10,
        title: "硬币问题",
        description: "计算用给定面值的硬币凑成目标金额的最少硬币数。",
        input: "输入一个整数数组表示硬币面值和一个整数表示目标金额。",
        output: "输出最少硬币数。",
        sample_input: "1 2 5 11",
        sample_output: "3",
        difficulty: "困难",
        tags: ["递推", "动态规划"]
    },
    {
        id: 11,
        title: "编辑距离",
        description: "计算两个字符串的编辑距离。",
        input: "输入两个字符串。",
        output: "输出编辑距离。",
        sample_input: "horse ros",
        sample_output: "3",
        difficulty: "困难",
        tags: ["递推", "动态规划"]
    }
]; 