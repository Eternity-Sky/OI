function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function showRegister() {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const avatar = document.getElementById('registerAvatar').files[0];

    if (localStorage.getItem(username)) {
        alert('用户名已存在，请选择其他用户名。');
        return;
    }

    if (username && password && avatar) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const userData = {
                password: password,
                avatar: event.target.result,
                completedProblems: []
            };
            localStorage.setItem(username, JSON.stringify(userData));
            alert('注册成功！');
            showLogin();
        };
        reader.readAsDataURL(avatar);
    } else {
        alert('请输入用户名、密码并上传头像。');
    }
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const userData = JSON.parse(localStorage.getItem(username));
    if (userData && userData.password === password) {
        alert('登录成功！');
        
        // 隐藏登录表单
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('auth').style.display = 'none';

        // 显示用户头像在右上角
        const avatarContainer = document.getElementById('avatarContainer');
        avatarContainer.innerHTML = '';
        const avatarImg = document.createElement('img');
        avatarImg.src = userData.avatar;
        avatarImg.alt = '用户头像';
        avatarImg.className = 'user-avatar';
        avatarImg.onclick = openUserCenter;
        avatarContainer.appendChild(avatarImg);

        // 存储当前登录的用户名
        localStorage.setItem('currentUser', username);
        // 设置登录状态
        localStorage.setItem('isLoggedIn', 'true');
        // 设置登录时间戳
        localStorage.setItem('loginTimestamp', Date.now());
    } else {
        alert('用户名或密码错误。');
    }
}

// 添加等级计算函数
function calculateLevel(completedCount) {
    if (completedCount >= 50) return { level: "大师", color: "#ff4757", progress: 100 };
    if (completedCount >= 30) return { level: "专家", color: "#ffa502", progress: 80 };
    if (completedCount >= 20) return { level: "高手", color: "#2ed573", progress: 60 };
    if (completedCount >= 10) return { level: "进阶", color: "#1e90ff", progress: 40 };
    if (completedCount >= 5) return { level: "新手", color: "#a4b0be", progress: 20 };
    return { level: "初学者", color: "#747d8c", progress: 0 };
}

// 修改 openUserCenter 函数
function openUserCenter() {
    const username = localStorage.getItem('currentUser');
    if (!username) return;
    
    const userData = JSON.parse(localStorage.getItem(username));
    document.getElementById('userCenter').style.display = 'block';

    // 计算成就和等级
    const completedCount = userData.completedProblems ? userData.completedProblems.length : 0;
    const achievements = [];
    if (completedCount >= 10) achievements.push('题目大师');
    if (completedCount >= 5) achievements.push('勤奋学习');
    if (completedCount >= 1) achievements.push('开始征程');

    const levelInfo = calculateLevel(completedCount);
    const nextLevel = getNextLevel(completedCount);

    // 更新用户中心内容
    document.querySelector('.modal-content').innerHTML = `
        <span class="close" onclick="closeUserCenter()">&times;</span>
        <div class="user-center-profile">
            <div class="user-title">
                ${(() => {
                    const title = calculateTitle(userData);
                    return `
                        <span class="title-badge" style="color: ${title.color}">
                            ${title.icon} ${title.name}
                        </span>
                    `;
                })()}
            </div>
            <div class="avatar-section">
                <img id="currentAvatar" src="${userData.avatar}" alt="当前头像" class="user-avatar">
                <div class="avatar-upload">
                    <label for="newAvatar" class="upload-btn">
                        <i class="fas fa-camera"></i> 更换头像
                    </label>
                    <input type="file" id="newAvatar" accept="image/*" style="display: none;" onchange="updateAvatar()">
                </div>
            </div>
            <div class="username-section">
                <p>用户名: <span id="userCenterUsername">${username}</span></p>
                <div class="username-edit">
                    <input type="text" id="newUsername" placeholder="新用户名">
                    <button onclick="updateUsername()">修改用户名</button>
                    <p class="limit-hint" id="usernameLimit" style="display: none;">
                        今日已修改过用户名，请明天再试
                    </p>
                </div>
            </div>
            <div class="user-stats">
                <p>完成题目数: ${completedCount}</p>
                <div class="level-section">
                    <h4>当前等级: <span style="color: ${levelInfo.color}">${levelInfo.level}</span></h4>
                    <div class="level-progress">
                        <div class="progress-bar" style="width: ${levelInfo.progress}%; background-color: ${levelInfo.color}"></div>
                    </div>
                    ${nextLevel ? `<p class="next-level">距离 ${nextLevel.level} 还需完成 ${nextLevel.required - completedCount} 题</p>` : 
                                '<p class="max-level">已达到最高等级！</p>'}
                </div>
                <div class="achievements-section">
                    <h4>成就</h4>
                    <div class="achievements-list">
                        ${achievements.length > 0 ? 
                            achievements.map(a => `<span class="achievement-badge">${a}</span>`).join('') :
                            '<p class="no-achievements">继续努力获取成就吧！</p>'
                        }
                    </div>
                </div>
            </div>
            <div class="password-section">
                <h4>修改密码</h4>
                <input type="password" id="newPassword" placeholder="新密码">
                <button onclick="changePassword()">修改密码</button>
            </div>
        </div>
    `;
}

function closeUserCenter() {
    document.getElementById('userCenter').style.display = 'none';
}

function changePassword() {
    const newPassword = document.getElementById('newPassword').value;
    const username = localStorage.getItem('currentUser');
    const userData = JSON.parse(localStorage.getItem(username));

    if (newPassword) {
        userData.password = newPassword;
        localStorage.setItem(username, JSON.stringify(userData));
        alert('密码修改成功！');
        closeUserCenter();
    } else {
        alert('请输入新密码。');
    }
}

function markAsDone(problemId) {
    const username = localStorage.getItem('currentUser');
    if (!username) {
        alert('请先登录！');
        return;
    }

    const userData = JSON.parse(localStorage.getItem(username));
    if (!userData.completedProblems) {
        userData.completedProblems = [];
    }

    if (!userData.completedProblems.includes(problemId)) {
        userData.completedProblems.push(problemId);
        localStorage.setItem(username, JSON.stringify(userData));
        alert('题目已标记为完成！');
    } else {
        const problemTitle = problems.find(p => p.id === problemId)?.title || problemId;
        alert(`您已经完成过 "${problemTitle}" 这道题目了！`);
    }

    updateProgress();
    updateDailyStats();
}

// 获取下一个等级信息
function getNextLevel(completedCount) {
    if (completedCount >= 50) return null;
    if (completedCount >= 30) return { level: "大师", required: 50 };
    if (completedCount >= 20) return { level: "专家", required: 30 };
    if (completedCount >= 10) return { level: "高手", required: 20 };
    if (completedCount >= 5) return { level: "进阶", required: 10 };
    return { level: "新手", required: 5 };
}

// 添加检查登录状态的函数
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    const currentUser = localStorage.getItem('currentUser');
    
    // 如果登录状态存在且未过期（这里设置7天过期）
    if (isLoggedIn === 'true' && loginTimestamp && currentUser) {
        const now = Date.now();
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        
        if (now - parseInt(loginTimestamp) < sevenDays) {
            // 恢复登录状态
            const userData = JSON.parse(localStorage.getItem(currentUser));
            if (userData) {
                document.getElementById('loginForm').style.display = 'none';
                document.getElementById('auth').style.display = 'none';
                
                const avatarContainer = document.getElementById('avatarContainer');
                avatarContainer.innerHTML = '';
                const avatarImg = document.createElement('img');
                avatarImg.src = userData.avatar;
                avatarImg.alt = '用户头像';
                avatarImg.className = 'user-avatar';
                avatarImg.onclick = openUserCenter;
                avatarContainer.appendChild(avatarImg);
                
                return true;
            }
        }
    }
    
    // 如果登录已过期，清除登录状态
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTimestamp');
    localStorage.removeItem('currentUser');
    return false;
}

// 修改登出函数
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTimestamp');
    localStorage.removeItem('currentUser');
    window.location.reload();
}

// 在页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});

function updateAvatar() {
    const fileInput = document.getElementById('newAvatar');
    const file = fileInput.files[0];
    const currentUser = localStorage.getItem('currentUser');
    
    if (!file || !currentUser) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userData.avatar = event.target.result;
        localStorage.setItem(currentUser, JSON.stringify(userData));
        
        // 更新显示
        document.getElementById('currentAvatar').src = event.target.result;
        document.querySelector('.avatar-container img').src = event.target.result;
        
        alert('头像更新成功！');
    };
    reader.readAsDataURL(file);
}

function updateUsername() {
    const currentUser = localStorage.getItem('currentUser');
    const newUsername = document.getElementById('newUsername').value.trim();
    
    if (!currentUser || !newUsername) {
        alert('请输入新用户名');
        return;
    }
    
    // 检查新用户名是否已存在
    if (localStorage.getItem(newUsername)) {
        alert('用户名已存在，请选择其他用户名');
        return;
    }
    
    // 检查上次修改时间
    const lastChangeTime = localStorage.getItem(`usernameChangeTime_${currentUser}`);
    if (lastChangeTime) {
        const now = new Date();
        const last = new Date(parseInt(lastChangeTime));
        
        // 检查是否是同一天
        if (now.toDateString() === last.toDateString()) {
            document.getElementById('usernameLimit').style.display = 'block';
            return;
        }
    }
    
    // 获取当前用户数据
    const userData = JSON.parse(localStorage.getItem(currentUser));
    
    // 保存新用户数据
    localStorage.setItem(newUsername, JSON.stringify(userData));
    
    // 删除旧用户数据
    localStorage.removeItem(currentUser);
    
    // 更新当前用户
    localStorage.setItem('currentUser', newUsername);
    
    // 记录修改时间
    localStorage.setItem(`usernameChangeTime_${newUsername}`, Date.now());
    
    // 更新显示
    document.getElementById('userCenterUsername').textContent = newUsername;
    document.getElementById('newUsername').value = '';
    
    alert('用户名修改成功！');
}

// 添加头衔计算函数
function calculateTitle(userData) {
    const completedCount = userData.completedProblems ? userData.completedProblems.length : 0;
    const titles = [
        { count: 50, name: "算法大师", color: "#FF4757", icon: "👑" },
        { count: 30, name: "代码专家", color: "#FFA502", icon: "🎯" },
        { count: 20, name: "进阶高手", color: "#2ED573", icon: "💫" },
        { count: 10, name: "勤奋学者", color: "#1E90FF", icon: "📚" },
        { count: 5, name: "初学者", color: "#A4B0BE", icon: "🌟" },
        { count: 0, name: "新手", color: "#747D8C", icon: "🔰" }
    ];
    
    return titles.find(title => completedCount >= title.count) || titles[titles.length - 1];
}

function checkIn() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('请先登录！');
        return;
    }
    
    const today = new Date().toDateString();
    const userData = JSON.parse(localStorage.getItem(currentUser));
    
    if (!userData.checkins) {
        userData.checkins = [];
    }
    
    if (userData.checkins.includes(today)) {
        alert('今天已经打过卡了！');
        return;
    }
    
    userData.checkins.push(today);
    localStorage.setItem(currentUser, JSON.stringify(userData));
    alert('打卡成功！');
}

// 更新欢迎信息
function updateWelcomeInfo() {
    const currentUser = localStorage.getItem('currentUser');
    const welcomeUsername = document.getElementById('welcomeUsername');
    if (currentUser) {
        welcomeUsername.textContent = currentUser;
    }
}

function updateCalendar() {
    const now = new Date();
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    
    // 设置当前日
    document.querySelector('.month').textContent = months[now.getMonth()];
    document.querySelector('.day').textContent = now.getDate().toString().padStart(2, '0');
    document.querySelector('.weekday').textContent = weekdays[now.getDay()];
    
    // 计算倒计时
    const csp2025_1 = new Date('2025-07-01');  // 第一轮日期
    const csp2025_2 = new Date('2025-08-05');  // 第二轮日期
    
    const days1 = Math.ceil((csp2025_1 - now) / (1000 * 60 * 60 * 24));
    const days2 = Math.ceil((csp2025_2 - now) / (1000 * 60 * 60 * 24));
    
    document.getElementById('countdown1').textContent = days1;
    document.getElementById('countdown2').textContent = days2;
}

const quotes = [
    { text: "编程不仅是代码，更是一种思维方式。", author: "Linus Torvalds" },
    { text: "简单是可靠的前提。", author: "Edsger Dijkstra" },
    { text: "程序写出来是给人看的，附带能在机器上运行。", author: "Harold Abelson" },
    { text: "软件就像做园艺一样，不仅要写代码，还要修剪和维护。", author: "Donald Knuth" },
    { text: "任何傻瓜都能写出计算机能理解的代码，优秀的程序员写出人能理解的代码。", author: "Martin Fowler" }
];

function updateDailyQuote() {
    const today = new Date().toDateString();
    const quoteIndex = Math.floor(((new Date(today)).getTime() / 86400000) % quotes.length);
    const quote = quotes[quoteIndex];
    
    document.getElementById('dailyQuote').textContent = quote.text;
    document.querySelector('.quote-author').textContent = `——${quote.author}`;
}

function updateDailyStats() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const userData = JSON.parse(localStorage.getItem(currentUser));
    const today = new Date().toDateString();
    
    // 计算今日完成题目数
    const todayCompleted = (userData.completedProblems || [])
        .filter(id => userData.completionDates[id]?.startsWith(today))
        .length;
    
    // 计算连续打卡天数
    let streakDays = 0;
    if (userData.checkins) {
        const sortedDates = userData.checkins.sort();
        const lastDate = new Date(sortedDates[sortedDates.length - 1]);
        let currentStreak = 1;
        
        for (let i = sortedDates.length - 2; i >= 0; i--) {
            const currentDate = new Date(sortedDates[i]);
            const diffDays = Math.floor((lastDate - currentDate) / (1000 * 60 * 60 * 24));
            
            if (diffDays === currentStreak) {
                currentStreak++;
            } else {
                break;
            }
        }
        streakDays = currentStreak;
    }
    
    document.getElementById('todayCompleted').textContent = todayCompleted;
    document.getElementById('streakDays').textContent = streakDays;
}

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    updateWelcomeInfo();
    updateCalendar();
    updateDailyQuote();
    updateDailyStats();
}); 