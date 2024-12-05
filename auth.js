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
                avatar: event.target.result // 将头像的 base64 数据存储
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

function openUserCenter() {
    const username = localStorage.getItem('currentUser');
    const userData = JSON.parse(localStorage.getItem(username));
    document.getElementById('userCenterUsername').textContent = username;
    document.getElementById('userCenter').style.display = 'block';

    const completedCount = userData.completedProblems ? userData.completedProblems.length : 0;
    document.getElementById('completedCount').textContent = `已完成题目数: ${completedCount}`;
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