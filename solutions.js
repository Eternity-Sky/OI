const solutions = {
    1: {
        analysis: "题目1的题解：使用简单的加法运算即可解决。",
        answer: "示例代码：\nint a, b;\ncin >> a >> b;\ncout << a + b << endl;"
    },
    2: {
        analysis: "题目2的题解：使用欧几里得算法计算最大公约数。",
        answer: "示例代码：\nint gcd(int a, int b) {\n    return b == 0 ? a : gcd(b, a % b);\n}"
    },
    3: {
        analysis: "题目3的题解：斐波那契数列可以通过递归或动态规划求解。",
        answer: "示例代码：\nint fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}"
    }
}; 