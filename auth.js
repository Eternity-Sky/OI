function showLogin() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function showRegister() {
    document.getElementById('auth').style.display = 'none';
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
    clearErrors();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!username) {
        showError('loginUsernameError', '请输入用户名');
        return;
    }
    if (!password) {
        showError('loginPasswordError', '请输入密码');
        return;
    }

    const userData = JSON.parse(localStorage.getItem(username));
    if (userData && userData.password === password) {
        localStorage.setItem('currentUser', username);
        localStorage.setItem('lastUser', username);
        localStorage.setItem('lastLoginTime', Date.now().toString());
        window.location.href = 'index.html';
    } else {
        showError('loginPasswordError', '用户名或密码错误');
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
                <img src="${userData.avatar}" alt="当前头像" class="user-avatar" style="width: 100px; height: 100px; margin: 0 auto;">
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
            <div class="completed-count">
                完成题目数: ${completedCount}
            </div>
            <div class="password-section">
                <h4>修改密码</h4>
                <input type="password" id="newPassword" placeholder="新密码">
                <button onclick="changePassword()">修改密码</button>
            </div>
            <div class="logout-section">
                <button class="logout-btn" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> 退出登录
                </button>
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

// 检查登录状态
function checkLoginStatus() {
    const username = localStorage.getItem('currentUser');
    const authButtons = document.getElementById('authButtons');
    const avatarContainer = document.getElementById('avatarContainer');
    
    if (username) {
        // 隐藏登录注册按钮
        if (authButtons) {
            authButtons.style.display = 'none';
        }
        
        // 显示头像
        if (avatarContainer) {
            const userData = JSON.parse(localStorage.getItem(username));
            avatarContainer.innerHTML = '';
            const avatarImg = document.createElement('img');
            avatarImg.src = userData.avatar;
            avatarImg.alt = '用户头像';
            avatarImg.className = 'user-avatar';
            avatarImg.onclick = () => window.location.href = 'userCenter.html';
            avatarContainer.appendChild(avatarImg);
            avatarContainer.style.display = 'flex';
        }
        
        // 更新欢迎信息
        const welcomeUsername = document.getElementById('username');
        if (welcomeUsername) {
            welcomeUsername.textContent = username;
        }
    } else {
        // 尝试自动登录
        const lastUser = localStorage.getItem('lastUser');
        const lastLoginTime = localStorage.getItem('lastLoginTime');
        const autoLoginPeriod = 7 * 24 * 60 * 60 * 1000; // 7天自动登录期限
        
        if (lastUser && lastLoginTime && (Date.now() - parseInt(lastLoginTime) < autoLoginPeriod)) {
            // 自动登录
            localStorage.setItem('currentUser', lastUser);
            checkLoginStatus(); // 重新检查登录状态
        } else {
            // 显示登录注册按钮
            if (authButtons) {
                authButtons.style.display = 'flex';
            }
            
            // 隐藏头像
            if (avatarContainer) {
                avatarContainer.style.display = 'none';
            }
            
            // 更新欢迎信息为游客
            const welcomeUsername = document.getElementById('username');
            if (welcomeUsername) {
                welcomeUsername.textContent = '游客';
            }
        }
    }
}

// 修改登录函数
function login() {
    clearErrors();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!username) {
        showError('loginUsernameError', '请输入用户名');
        return;
    }
    if (!password) {
        showError('loginPasswordError', '请输入密码');
        return;
    }

    const userData = JSON.parse(localStorage.getItem(username));
    if (userData && userData.password === password) {
        localStorage.setItem('currentUser', username);
        localStorage.setItem('lastUser', username);
        localStorage.setItem('lastLoginTime', Date.now().toString());
        window.location.href = 'index.html';
    } else {
        showError('loginPasswordError', '用户名或密码错误');
    }
}

// 修改登出函数
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('lastUser');
    localStorage.removeItem('lastLoginTime');
    window.location.href = 'index.html';
}

// 在页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', checkLoginStatus);

document.addEventListener('DOMContentLoaded', function() {
    // 登录表单提交事件
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            login();
        });
    }

    // 注册表单提交事件
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            register();
        });
    }

    // 切换到登录表单按钮
    const showLoginBtn = document.querySelector('.show-login');
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function() {
            showLogin();
        });
    }

    // 切换到注册表单按钮
    const showRegisterBtn = document.querySelector('.show-register');
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', function() {
            showRegister();
        });
    }
});

function updateWelcomeInfo() {
    const welcomeUsername = document.getElementById('welcomeUsername');
    if (!welcomeUsername) return; // 如果元素不存在则直接返回
    
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        welcomeUsername.textContent = currentUser;
    } else {
        welcomeUsername.textContent = '游客';
    }
}

// 同时我们需要添加这些相关函数
function updateCalendar() {
    // 可以先留空，或者添加日历更新逻辑
}

function updateDailyQuote() {
    // 可以先留空，或者添加每日名言更新逻辑
}

function updateDailyStats() {
    // 可以先留空，或者添加每日统计更新逻辑
}

// 在页面加载时检查 URL hash
window.addEventListener('load', function() {
    if (window.location.hash === '#login') {
        showLogin();
    } else if (window.location.hash === '#register') {
        showRegister();
    }
}); 