const audioPlayer = document.getElementById('audioPlayer');
const playlist = [];
let currentTrack = 0;

// 预设音频数据
const audioFiles = [
    {
        path: './audio/Re Re  - 結束バンド.mp3',
        cover: './image/ReRe.jpeg',
        title: 'Re:Re:',
        artist: '結束バンド'
    },
    {
        path: './audio/春日影 - CRYCHIC.mp3',
        cover: './image/春日影 - CRYCHIC.jpg',
        title: '春日影',
        artist: 'CRYCHIC'
    }
];

// 初始化播放列表
function initPlaylist() {
    const playlistElement = document.getElementById('playlist');
    playlistElement.innerHTML = '';

    audioFiles.forEach((file, index) => {
        // 创建播放列表项
        const li = document.createElement('li');
        li.className = `px-4 py-2 hover:bg-gray-100 cursor-pointer ${index === currentTrack ? 'bg-blue-50' : ''}`;
        li.dataset.index = index;
        li.innerHTML = `
            <div class="font-medium">${file.title}</div>
            <div class="text-sm text-gray-600">${file.artist}</div>
        `;
        li.addEventListener('click', () => {
            currentTrack = index;
            loadTrack(currentTrack);
            document.getElementById('songList').classList.remove('show');
        });
        playlistElement.appendChild(li);
        
        // 直接使用预设数据
        playlist.push({
            path: file.path,
            cover: file.cover,
            title: file.title,
            artist: file.artist
        });
    });

    loadTrack(currentTrack);
}

// 加载曲目
function loadTrack(index) {
    const track = playlist[index];
    
    // 更新显示
    document.getElementById('songTitle').textContent = track.title;
    document.getElementById('songArtist').textContent = track.artist;
    document.getElementById('albumArt').src = track.cover;

    // 重置播放器
    audioPlayer.pause();
    audioPlayer.src = track.path;
    document.getElementById('progress').value = 0;
    document.getElementById('playBtn').querySelector('img').src = './svg/bg-pause.svg';

    // 更新激活状态
    document.querySelectorAll('#playlist li').forEach(li => {
        li.classList.remove('bg-blue-50');
    });
    document.querySelector(`#playlist li[data-index="${index}"]`).classList.add('bg-blue-50');

    // 自动播放
    const playAfterLoad = () => {
        audioPlayer.play().catch(() => {
            document.getElementById('playBtn').querySelector('img').src = './svg/bg-play.svg';
        });
    };
    audioPlayer.addEventListener('canplay', playAfterLoad, { once: true });
    audioPlayer.load();
}

// 播放控制
document.getElementById('playBtn').addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('playBtn').querySelector('img').src = './svg/bg-pause.svg';
    } else {
        audioPlayer.pause();
        document.getElementById('playBtn').querySelector('img').src = './svg/bg-play.svg';
    }
});

// 上一曲/下一曲
document.getElementById('prevBtn').addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
});

// 进度条控制
document.getElementById('progress').addEventListener('input', (e) => {
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (e.target.value / 100) * duration;
});

audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    document.getElementById('progress').value = progress;
});

// 歌单控制
document.getElementById('songListBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('songList').classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('#songList') && !e.target.closest('#songListBtn')) {
        document.getElementById('songList').classList.remove('show');
    }
});

// 初始化
initPlaylist();