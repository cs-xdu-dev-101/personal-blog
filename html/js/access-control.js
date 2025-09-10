// 访问控制脚本
document.addEventListener('DOMContentLoaded', function() {
    function checkAccess() {
        const access = localStorage.getItem('blogAccess');
        const accessTime = localStorage.getItem('accessTime');
        const currentPath = window.location.pathname;
        
        // 验证页面不需要检查
        if (currentPath === '/verify/' || currentPath === '/verify') {
            return;
        }
        
        if (access === 'granted' && accessTime) {
            const accessDate = new Date(accessTime);
            const now = new Date();
            const hoursDiff = (now - accessDate) / (1000 * 60 * 60);
            
            // 24小时内有效
            if (hoursDiff < 24) {
                return; // 有访问权限，继续显示
            }
        }
        
        // 没有访问权限或已过期，跳转到验证页面
        window.location.href = '/verify/';
    }
    
    // 检查访问权限
    checkAccess();
    
    // 提供登出功能
    window.logout = function() {
        localStorage.removeItem('blogAccess');
        localStorage.removeItem('accessTime');
        window.location.href = '/verify/';
    };
});