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
        avatarImg.onclick = openUserCenter; // 点击头像打开用户中心
        avatarContainer.appendChild(avatarImg);

        // 存储当前登录的用户名
        localStorage.setItem('currentUser', username);
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
    const userData = JSON.parse(localStorage.getItem(username));
    document.getElementById('userCenterUsername').textContent = username;
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