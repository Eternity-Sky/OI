document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    const userData = JSON.parse(localStorage.getItem(currentUser));
    
    // 设置用户信息
    document.getElementById('currentAvatar').src = userData.avatar;
    document.getElementById('username').textContent = currentUser;

    // 设置头像上传事件
    document.getElementById('newAvatar').addEventListener('change', updateAvatar);

    // 更新 GitHub 绑定按钮状态
    updateGitHubButtonStatus();
});

function handleGitHubBinding() {
    const currentUser = localStorage.getItem('currentUser');
    const userData = JSON.parse(localStorage.getItem(currentUser));
    
    if (userData.githubId) {
        // 如果已经绑定，则解除绑定
        if (confirm('确定要解除 GitHub 绑定吗？')) {
            delete userData.githubId;
            localStorage.setItem(currentUser, JSON.stringify(userData));
            updateGitHubButtonStatus();
        }
    } else {
        // 如果未绑定，则进行 GitHub OAuth 授权
        // 替换为你的 GitHub OAuth App 客户端 ID
        const clientId = 'your_github_client_id';
        const redirectUri = encodeURIComponent(`${window.location.origin}/github-callback.html`);
        const scope = 'read:user';
        
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    }
}

function updateGitHubButtonStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const userData = JSON.parse(localStorage.getItem(currentUser));
    const btn = document.getElementById('githubBindBtn');
    
    if (userData.githubId) {
        btn.innerHTML = '<i class="fab fa-github"></i> 解除绑定';
        btn.classList.add('bound');
    } else {
        btn.innerHTML = '<i class="fab fa-github"></i> 绑定 GitHub';
        btn.classList.remove('bound');
    }
} 