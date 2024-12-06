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
    document.getElementById('userCenterUsername').textContent = username;
    document.getElementById('currentAvatar').src = userData.avatar;
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
            <img src="${userData.avatar}" alt="头像" class="user-avatar">
            <h3>${username}</h3>
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
        alert('您已经完成了这个题目！');
    }
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