const problems = [
    {
        id: 1,
        title: "A + B Problem",
        description: "给定两个整数A和B，输出A+B的和。",
        input: "输入包含两个整数A和B，用空格分隔。",
        output: "输出一个整数，表示A+B的和。",
        sample_input: "1 2",
        sample_output: "3",
        timeLimit: "1000ms",
        memoryLimit: "256MB",
        difficulty: "简单",
        tags: ["数学", "入门"]
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
    },
    {
        id: 12,
        title: "快速排序",
        description: "实现快速排序算法。",
        input: "一个整数数组。",
        output: "排序后的数组。",
        sample_input: "5 2 9 1 7 6 3",
        sample_output: "1 2 3 5 6 7 9",
        difficulty: "中等",
        tags: ["算法", "排序"]
    },
    {
        id: 13,
        title: "二叉树遍历",
        description: "实现二叉树的前序、中序和后序遍历。",
        input: "一个二叉树。",
        output: "三种遍历序列。",
        sample_input: "1 2 3 4 5 null 6",
        sample_output: "前序：1 2 4 5 3 6\n中序：4 2 5 1 3 6\n后序：4 5 2 6 3 1",
        difficulty: "中等",
        tags: ["数据结构", "树"]
    },
    {
        id: 14,
        title: "最短路径",
        description: "使用Dijkstra算法求解最短路径问题。",
        input: "图的邻接矩阵和起点。",
        output: "从起点到所有点的最短距离。",
        sample_input: "4\n0 2 4 ∞\n2 0 1 3\n4 1 0 1\n∞ 3 1 0\n0",
        sample_output: "0 2 3 4",
        difficulty: "困难",
        tags: ["算法", "图论"]
    },
    {
        id: 15,
        title: "背包问题",
        description: "解决0-1背包问题。",
        input: "物品的重量和价值，背包容量。",
        output: "最大价值。",
        sample_input: "N=3, W=4\n2 3\n1 2\n3 4",
        sample_output: "6",
        difficulty: "中等",
        tags: ["动态规划", "算法"]
    },
    {
        id: 16,
        title: "平衡二叉树",
        description: "实现AVL树的插入和删除操作。",
        input: "一系列操作指令。",
        output: "操作后的树结构。",
        sample_input: "insert 3\ninsert 1\ninsert 4\ndelete 1",
        sample_output: "3\n  4",
        difficulty: "困难",
        tags: ["数据结构", "树"]
    },
    {
        id: 17,
        title: "矩阵快速幂",
        description: "计算矩阵的n次幂。",
        input: "一个矩阵和幂次n。",
        output: "结果矩阵。",
        sample_input: "2 2\n1 1\n1 0\n2",
        sample_output: "2 1\n1 1",
        difficulty: "中等",
        tags: ["数学", "矩阵"]
    },
    {
        id: 18,
        title: "线段树",
        description: "实现线段树的区间查询和修改。",
        input: "数组和操作序列。",
        output: "查询结果。",
        sample_input: "1 3 5 7 9 11\nquery 1 3\nupdate 2 4\nquery 1 3",
        sample_output: "15\n12",
        difficulty: "困难",
        tags: ["数据结构", "树"]
    },
    {
        id: 19,
        title: "最长回文子串",
        description: "找出字符串中最长的回文子串。",
        input: "一个字符串。",
        output: "最长回文子串。",
        sample_input: "babad",
        sample_output: "bab",
        difficulty: "中等",
        tags: ["字符串", "动态规划"]
    },
    {
        id: 20,
        title: "并查集",
        description: "实现并查集的合并和查找操作。",
        input: "元素集合和操作序列。",
        output: "操作结果。",
        sample_input: "5\nunion 1 2\nunion 3 4\nfind 1 4",
        sample_output: "false",
        difficulty: "中等",
        tags: ["数据结构", "图论"]
    },
    {
        id: 21,
        title: "红黑树",
        description: "实现红黑树的插入和删除操作。",
        input: "操作序列。",
        output: "树的状态。",
        sample_input: "insert 5\ninsert 3\ninsert 7\ndelete 3",
        sample_output: "5(B)\n  7(R)",
        difficulty: "困难",
        tags: ["数据结构", "树"]
    },
    {
        id: 22,
        title: "数组区间和",
        description: "给定一个整数数组和多个查询区间，求每个区间内的元素和。",
        input: "第一行输入数组长度n和查询次数q，第二行输入n个整数，接下来q行每行输入两个整数l,r表示查询区间。",
        output: "输出q行，每行一个整数表示对应区间的元素和。",
        sample_input: "5 2\n1 2 3 4 5\n1 3\n2 4",
        sample_output: "6\n9",
        difficulty: "简单",
        tags: ["数组", "前缀和"]
    },
    {
        id: 23,
        title: "最大子数组和",
        description: "给定一个整数数组，找到一个具有最大和的连续子数组。",
        input: "第一行输入数组长度n，第二行输入n个整数。",
        output: "输出最大子数组和。",
        sample_input: "9\n-2 1 -3 4 -1 2 1 -5 4",
        sample_output: "6",
        difficulty: "中等",
        tags: ["数组", "动态规划"]
    },
    {
        id: 24,
        title: "杨辉三角",
        description: "生成杨辉三角的前n行。",
        input: "一个整数n。",
        output: "杨辉三角的前n行。",
        sample_input: "5",
        sample_output: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1",
        difficulty: "简单",
        tags: ["递推", "数组"]
    },
    {
        id: 25,
        title: "不同路径",
        description: "一个机器人位于m×n网格的左上角，每次只能向下或向右移动一步，求达到右下角的不同路径数。",
        input: "两个整数m和n。",
        output: "不同路径的数量。",
        sample_input: "3 7",
        sample_output: "28",
        difficulty: "中等",
        tags: ["动态规划", "递推"]
    },
    {
        id: 26,
        title: "最长公共子序列",
        description: "给定两个字符串，求它们的最长公共子序列的长度。",
        input: "两行，每行一个字符串。",
        output: "最长公共子序列的长度。",
        sample_input: "abcde\nace",
        sample_output: "3",
        difficulty: "中等",
        tags: ["动态规划", "字符串"]
    },
    {
        id: 27,
        title: "昆虫繁殖",
        description: "计算昆虫在n天后的数量。每只昆虫每天可以繁殖出一只新的昆虫，新昆虫第二天开始也能繁殖。",
        input: "一个整数n，表示天数。",
        output: "第n天时昆虫的总数。",
        sample_input: "3",
        sample_output: "4",
        difficulty: "简单",
        tags: ["递推", "数学"]
    },
    {
        id: 28,
        title: "位数问题",
        description: "给定一个整数n，求1到n中所有整数的位数之和。",
        input: "一个整数n。",
        output: "1到n中所有整数的位数之和。",
        sample_input: "13",
        sample_output: "17",
        difficulty: "中等",
        tags: ["数学", "递推"]
    },
    {
        id: 29,
        title: "过河卒(Noip2002)",
        description: "棋盘上A点(0,0)有一个过河卒，需要走到目标B点(n,m)。卒只能向下或向右走。棋盘上某一点有一个对方的马，该马所在的点和所有跳跃一步可达的点都称为马的控制点，卒不能通过这些控制点。已知B点坐标(n,m)（n,m不超过20）和马的位置坐标(x,y)（不与起点终点重合），求卒从A点到B点的可行路径数。",
        input: "一行四个整数n、m、x、y，分别表示B点坐标(n,m)和马的位置(x,y)。",
        output: "可行路径数。",
        sample_input: "8 6 0 4",
        sample_output: "1617",
        difficulty: "中等",
        tags: ["动态规划", "递推"]
    },
    {
        id: 30,
        title: "斐波那契数列(2)",
        description: "计算斐波那契数列的第n项对m取模的结果。",
        input: "两个整数n和m。",
        output: "第n项对m取模的结果。",
        sample_input: "10 7",
        sample_output: "4",
        difficulty: "中等",
        tags: ["数学", "递推"]
    },
    {
        id: 31,
        title: "Pell数列",
        description: "Pell数列满足P(n)=2*P(n-1)+P(n-2)，初始值P(1)=1, P(2)=2。",
        input: "一个整数n。",
        output: "Pell数列的第n项。",
        sample_input: "5",
        sample_output: "29",
        difficulty: "中等",
        tags: ["数学", "递推"]
    },
    {
        id: 32,
        title: "CSP-J/S 2024 第二轮 入门级 扑克牌",
        description: `小 P 从同学小 Q 那儿借来一副 n 张牌的扑克牌。本题中我们不考虑大小王，此时每张牌具有两个属性：花色和点数。花色共有 4 种：方片(D)、草花(C)、红桃(H)和黑桃(S)。点数共有 13 种，从小到大分别为 A 2 3 4 5 6 7 8 9 T J Q K。注意：点数 10 在本题中记为 T。`,
        difficulty: "简单",
        tags: ["模拟", "计数"],
        input: "从文件 poker.in 中读入数据。第一行包含一个整数 n 表示牌数。接下来 n 行每行包含一个长度为 2 的字符串描述一张牌。",
        output: "输出到文件 poker.out 中。输出一行一个整数，表示最少还需要向小 S 借几张牌才能凑成一副完整的扑克牌。",
        sample_input: "1\nSA",
        sample_output: "51",
        timeLimit: "1.0秒",
        memoryLimit: "512 MiB"
    },
    {
        id: 33,
        title: "CSP-J/S 2024 第二轮 入门级 地图探险",
        description: `小 A 打算前往一片丛林去探险。丛林的地图可以用一个 n 行 m 列的字符表来表示。机器人的状态由位置和朝向两部分组成。其中位置由坐标 (x, y) 刻画，朝向用一个 0~3 的整数 d 表示，其中 d = 0 代表向东，d = 1 代表向南，d = 2 代表向西，d = 3 代表向北。`,
        difficulty: "中等",
        tags: ["模拟", "方向控制"],
        input: "从文件 explore.in 中读入数据。第一行包含三个正整数 n,m,k。第二行包含两个正整数 x0,y0 和一个非负整数 d0。",
        output: "输出到文件 explore.out 中。对于每组数据输出一行包含一个正整数，表示地图上所有被机器人经过的位置的个数。",
        sample_input: "2\n5 4\n1 1 2\n....x",
        sample_output: "3",
        timeLimit: "1.0秒",
        memoryLimit: "512 MiB"
    },
    {
        id: 34,
        title: "CSP-J/S 2024 第二轮 入门级 小木棍",
        description: `小 S 喜欢收集小木棍。在收集了 n 根长度相等的小木棍之后，他闲来无事，便用它们拼起了数字。现在小 S 希望拼出一个正整数，满足如下条件：拼出这个数恰好使用 n 根小木棍；拼出的数没有前导 0；在满足以上两个条件的前提下，这个数尽可能小。`,
        difficulty: "中等",
        tags: ["贪心", "数字构造"],
        input: "从文件 sticks.in 中读入数据。第一行包含一个正整数 T，表示数据组数。接下来包含 T 组数据，每组数据一行包含一个整数 n。",
        output: "输出到文件 sticks.out 中。对于每组数据输出一行，如果存在满足题意的正整数，输出这个数；否则输出 -1。",
        sample_input: "5\n1\n2\n3\n6\n18",
        sample_output: "-1\n1\n7\n6\n208",
        timeLimit: "1.0秒",
        memoryLimit: "512 MiB"
    },
    {
        id: 35,
        title: "CSP-J/S 2024 第二轮 入门级 接龙",
        description: `在玩惯了成语接龙之后，小 J 和他的朋友们发明了一个新的接龙规则。总共有 n 个人参与这个接龙游戏，第 i 个人会获得一个整数序列 Si 作为他的词库。一次游戏分为若干轮，每一轮有一个人带着词库进行接龙。`,
        difficulty: "困难",
        tags: ["动态规划", "序列"],
        input: "从文件 chain.in 中读入数据。第一行包含三个整数 n,k,q。接下来 n 行，第 i 行包含 (li+1) 个整数。接下来 q 行，每行包含两个整数 rj,cj。",
        output: "输出到文件 chain.out 中。对于每个任务输出一行包含一个整数，若任务可以完成输出 1，否则输出 0。",
        sample_input: "3 3 7\n5 1 2 3 4 1\n3 1 2 5\n3 5 1 6\n1 2\n1 4\n2 4\n3 4\n6 6\n1 1\n7 7",
        sample_output: "1\n0\n1\n0\n1\n0\n0",
        timeLimit: "2.0秒",
        memoryLimit: "512 MiB"
    }
];

const problemSets = {
    "CSP-J2 2024入门组": {
        description: "CSP-J/S 2024 第二轮认证 入门级",
        problems: [32, 33, 34, 35],
        date: "2024-10-26",
        time: "08:30 ~ 12:00",
        details: {
            timeLimit: {
                poker: "1.0秒",
                explore: "1.0秒",
                sticks: "1.0秒",
                chain: "2.0秒"
            },
            memoryLimit: "512 MiB",
            compiler: {
                "C++": "-O2 -std=c++14 -static"
            },
            notes: [
                "文件名（程序名和输入输出文件名）必须使用英文小写",
                "main 函数的返回值类型必须是 int，程序正常结束时的返回值必须是 0",
                "提交的程序代码文件的放置位置请参考各省的具体要求",
                "若无特殊说明，结果的比较方式为全文比较（过滤行末空格及文末回车）",
                "选手提交的程序源文件必须不大于 100KB",
                "程序可使用的栈空间内存限制与题目的内存限制一致"
            ]
        }
    }
}; 