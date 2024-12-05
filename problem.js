const problems = [
    {
        id: 1,
        title: "A + B Problem",
        description: "计算两个整数的和。",
        difficulty: "简单",
        tags: ["数学", "基础"],
        input: "两个整数。",
        output: "两个整数的和。",
        sample_input: "1 2",
        sample_output: "3"
    },
    {
        id: 2,
        title: "最大公约数",
        description: "计算两个整数的最大公约数。",
        difficulty: "中等",
        tags: ["数学", "算法"],
        input: "两个整数。",
        output: "最大公约数。",
        sample_input: "12 18",
        sample_output: "6"
    },
    {
        id: 3,
        title: "斐波那契数列",
        description: "计算斐波那契数列的第 n 项。",
        difficulty: "简单",
        tags: ["递归", "动态规划"],
        input: "一个整数 n。",
        output: "斐波那契数列的第 n 项。",
        sample_input: "5",
        sample_output: "5"
    },
    {
        id: 4,
        title: "阶乘计算",
        description: "计算一个整数的阶乘。",
        difficulty: "简单",
        tags: ["数学", "递归"],
        input: "一个整数 n。",
        output: "n 的阶乘。",
        sample_input: "5",
        sample_output: "120"
    },
    {
        id: 5,
        title: "爬楼梯问题",
        description: "计算爬楼梯的不同方法数。",
        difficulty: "中等",
        tags: ["动态规划"],
        input: "一个整数 n。",
        output: "不同的方法数。",
        sample_input: "3",
        sample_output: "3"
    },
    {
        id: 6,
        title: "汉诺塔问题",
        description: "解决汉诺塔问题。",
        difficulty: "中等",
        tags: ["递归"],
        input: "三个塔和 n 个盘子。",
        output: "移动盘子的步骤。",
        sample_input: "3",
        sample_output: "7"
    },
    {
        id: 7,
        title: "斐波那契数列（优化）",
        description: "优化计算斐波那契数列的第 n 项。",
        difficulty: "中等",
        tags: ["动态规划"],
        input: "一个整数 n。",
        output: "斐波那契数列的第 n 项。",
        sample_input: "10",
        sample_output: "55"
    },
    {
        id: 8,
        title: "二项式系数",
        description: "计算二项式系数。",
        difficulty: "中等",
        tags: ["数学", "组合"],
        input: "两个整数 n 和 k。",
        output: "二项式系数 C(n, k)。",
        sample_input: "5 2",
        sample_output: "10"
    },
    {
        id: 9,
        title: "最长递增子序列",
        description: "计算最长递增子序列的长度。",
        difficulty: "困难",
        tags: ["动态规划"],
        input: "一个整数数组。",
        output: "最长递增子序列的长度。",
        sample_input: "[10, 9, 2, 5, 3, 7, 101, 18]",
        sample_output: "4"
    },
    {
        id: 10,
        title: "硬币问题",
        description: "计算最少硬币数。",
        difficulty: "困难",
        tags: ["动态规划"],
        input: "一个整数数组和一个目标值。",
        output: "最少硬币数。",
        sample_input: "[1, 2, 5], 11",
        sample_output: "3"
    },
    {
        id: 11,
        title: "编辑距离",
        description: "计算两个字符串的编辑距离。",
        difficulty: "困难",
        tags: ["动态规划"],
        input: "两个字符串。",
        output: "编辑距离。",
        sample_input: "horse, ros",
        sample_output: "3"
    }
]; 