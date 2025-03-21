// 主题切换功能
const themeToggle = document.getElementById('themeToggle');
const docElement = document.documentElement;

// 初始化主题
const savedTheme = localStorage.getItem('theme') || 'dark'; // 修改默认值为dark
docElement.classList.add(savedTheme === 'dark' ? 'dark' : 'light');
themeToggle.textContent = savedTheme === 'dark' ? '🌞' : '🌙';

// 切换主题事件
themeToggle.addEventListener('click', () => {
    const isDark = docElement.classList.contains('dark');
    docElement.classList.toggle('dark', !isDark);
    const newTheme = !isDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = !isDark ? '🌞' : '🌙';
    
    // 同步更新data-theme属性
    docElement.setAttribute('data-theme', newTheme);
});

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        docElement.classList.toggle('dark', e.matches);
        docElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});
