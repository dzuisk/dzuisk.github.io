// 语言切换功能
const translations = {
    'zh-CN': {
        title: "今天生日🎉dzu的个人网站",
        hello: "你好，我是dzu👋",
        intro: "一位来自中国的电子科技爱好者",
        age: "19岁 / 男 / 学生 / ESTJ",
        more: "更多",
        selfIntro: `自我介绍<br>
            🌍: 普通话/英语/潮汕话/粤语(基础)<br>
            📖: 深圳职业技术大学本科在读<br>
            🎵: 喜欢Vocaloid、ACG和日系流行乐<br>
            🎮: 爱玩各种游戏但技术一般<br>
            📷: 随意拍拍照片<br>
            🌱: 正在学习编程<br>
            ⚡️: 热爱创造 无限进步`,
        qqmusic: "dzu爱听的歌",
        enjoy: "听听",
        github: "dzu的Github",
        visit: "访问"
    },
    'en-US': {
        title: "Today is my birthday! dzu's Personal Website",
        hello: "Hello I’m dzu👋",
        intro: "An electronic enthusiast from China",
        age: "19 y.o. / male / student / ESTJ",
        more: "More",
        selfIntro: `Self introduction<br>
            🌍: Mandarin/English/Teochew/Cantoness(basic)<br>
            📖: Studying undergraduate in SZPU<br>
            🎵: Enjoying Vocaloid, ACG and J-Pop<br>
            🎮: Play many kinds of games but poor skills<br>
            📷: Take photos casually<br>
            🌱: Learning programming<br>
            ⚡️: Passionate creation, infinite progress.`,
        qqmusic: "dzu's favourites",
        enjoy: "Enjoy",
        github: "dzu's Github",
        visit: "Visit"
    }
};

const languageToggle = document.getElementById('languageToggle');
languageToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'zh-CN' ? 'en-US' : 'zh-CN';
    document.documentElement.lang = newLang;
    localStorage.setItem('language', newLang);
    updateTextContent(newLang);
});

function updateTextContent(lang) {
    const t = translations[lang];
    document.title = t.title;
    document.querySelector('[data-i18n="hello"]').innerHTML = t.hello;
    document.querySelector('[data-i18n="intro"]').textContent = t.intro;
    document.querySelector('[data-i18n="age"]').textContent = t.age;
    document.querySelector('[data-i18n="more"]').textContent = t.more;
    document.querySelector('[data-i18n="selfIntro"]').innerHTML = t.selfIntro;
    // 新增对 GitHub 卡片的翻译更新
    document.querySelector('[data-i18n="github"]').textContent = t.github;
    document.querySelector('[data-i18n="visit"]').textContent = t.visit;
    document.querySelector('[data-i18n="qqmusic"]').textContent = t.qqmusic; 
    document.querySelector('[data-i18n="enjoy"]').textContent = t.enjoy;
}

// 修复后的初始化逻辑（替换原来的两个if判断）
const savedLang = localStorage.getItem('language') || 'zh-CN';
document.documentElement.lang = savedLang;
updateTextContent(savedLang);
