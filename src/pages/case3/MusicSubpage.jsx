import { useState, useEffect } from 'react';
import { SkipBack, SkipForward, Play, Pause, Volume2, VolumeX, Volume1, Repeat } from 'lucide-react';

export default function MusicSubpage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [showLyrics, setShowLyrics] = useState(false);

  const songs = [
    {
      id: 1,
      title: 'めめしぃ',
      artist: '可不',
      album: 'すりぃ feat.可不',
      duration: '4:32',
      thumbnail: '🌸',
      lyrics: [
        'めめしぃ めめしぃ',
        '可愛い君のこと',
        'めめしぃ めめしぃ',
        '心を奪われて',
        '春の風 薫る季節',
        '君と出会えた奇跡',
        'めめしぃ めめしぃ',
        '永遠に一緒に',
      ],
    },
    {
      id: 2,
      title: '妄想感傷代償連盟',
      artist: 'Hatsune Miku',
      album: 'DECO*27',
      duration: '3:45',
      thumbnail: '🎤',
      lyrics: [
        '君のことを想うと',
        '胸が痛くなるよ',
        'これは恋なのかな',
        'わからないけど',
        '妄想の中では',
        '君と笑っている',
        '現実は残酷だけど',
        '夢は終わらない',
      ],
    },
    {
      id: 3,
      title: 'Record Player',
      artist: 'AJR',
      album: 'The Maybe Man',
      duration: '3:18',
      thumbnail: '🎵',
      lyrics: [
        'I got a record player',
        'And it sounds so good',
        'I got a record player',
        'Like I knew it would',
        'Spinning round and round',
        'Making sweet sounds',
        'I got a record player',
        'And it feels like home',
      ],
    },
    {
      id: 4,
      title: '魔法少女とチョコレゐト',
      artist: 'PinocchioP',
      album: '魔法少女シリーズ',
      duration: '4:12',
      thumbnail: '🍫',
      lyrics: [
        '魔法少女になりたい',
        '願いを叶えて',
        'チョコレゐト食べながら',
        '夢を見るの',
        '魔法の力で',
        '世界を変える',
        '魔法少女とチョコレゐト',
        '最高の組み合わせ',
      ],
    },
    {
      id: 5,
      title: 'Mystery of Love',
      artist: 'Sufjan Stevens',
      album: 'Call Me by Your Name',
      duration: '4:08',
      thumbnail: '💜',
      lyrics: [
        'Oh, to see without my eyes',
        'The first time that you kissed me',
        'Boundless by the time I cried',
        'I built your walls around me',
        'White noise, what an awful sound',
        'Fumbling by Rogue River',
        'Feel my feet above the ground',
        'Hand of God, deliver me',
      ],
    },
    {
      id: 6,
      title: 'Speed of Light',
      artist: 'MSR塞壬唱片',
      album: '明日方舟',
      duration: '3:56',
      thumbnail: '⚡',
      lyrics: [
        '光の速さで',
        '闇を切り裂いて',
        '希望の道を',
        '照らし出すの',
        'Speed of light',
        '走り続けて',
        'Speed of light',
        '未来へ向かって',
      ],
    },
    {
      id: 7,
      title: 'Miss You',
      artist: 'MSR塞壬唱片',
      album: '明日方舟',
      duration: '4:21',
      thumbnail: '💔',
      lyrics: [
        'I miss you every day',
        'Every night, every moment',
        'Your smile, your voice',
        'Still echoes in my heart',
        'Though you are far away',
        'Our love will never fade',
        'I miss you, I love you',
        'Forever and always',
      ],
    },
  ];

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    setCurrentSongIndex(prev => (prev === 0 ? songs.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentSongIndex(prev => (prev === songs.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setProgress(percent * 100);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseInt(e.target.value));
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (percent) => {
    const totalSeconds = currentSong.duration.split(':');
    const total = parseInt(totalSeconds[0]) * 60 + parseInt(totalSeconds[1]);
    const current = Math.floor((percent / 100) * total);
    const minutes = Math.floor(current / 60);
    const seconds = Math.floor(current % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700">Music Player</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowLyrics(!showLyrics);
              if (!showLyrics) setShowPlaylist(false);
            }}
            className={`glass-button text-sm flex items-center gap-2 transition-colors ${showLyrics ? 'text-pink-700' : 'hover:text-pink-700'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="15" x2="15" y2="15" />
              <line x1="9" y1="19" x2="15" y2="19" />
              <line x1="10" y1="11" x2="14" y2="11" />
            </svg>
            <span>歌词</span>
          </button>
          <button
            onClick={() => {
              setShowPlaylist(!showPlaylist);
              if (!showPlaylist) setShowLyrics(false);
            }}
            className={`glass-button text-sm flex items-center gap-2 transition-colors ${showPlaylist ? 'text-pink-700' : 'hover:text-pink-700'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span>播放列表</span>
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="liquid-glass rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 mb-8">
              <div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-400/30 to-purple-400/30 blur-2xl"
                style={{ transform: isPlaying ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease' }}
              />
              <div 
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-400/80 to-purple-400/80 flex items-center justify-center"
                style={{ transform: isPlaying ? 'rotate(360deg)' : 'rotate(0deg)', transition: 'transform 20s linear' }}
              >
                <span className="text-8xl">{currentSong.thumbnail}</span>
              </div>
              <div className="absolute inset-0 rounded-3xl border-4 border-white/20" />
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-2">{currentSong.title}</h3>
            <p className="text-slate-600 mb-1">{currentSong.artist}</p>
            <p className="text-sm text-slate-500 mb-8">{currentSong.album}</p>

            <div className="w-full max-w-md">
              <div 
                className="relative h-2 rounded-full bg-white/30 cursor-pointer mb-3"
                onClick={handleProgressClick}
              >
                <div 
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                  style={{ width: `${progress}%` }}
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg"
                  style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{formatTime(progress)}</span>
                <span>{currentSong.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-8">
              <button 
                onClick={toggleMute}
                className="glass-button w-12 h-12 flex items-center justify-center hover:text-pink-700 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : volume === 0 ? (
                  <VolumeX className="w-6 h-6" />
                ) : volume < 50 ? (
                  <Volume1 className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
              <div className="w-32">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/30 accent-pink-500"
                  style={{
                    background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${isMuted ? 0 : volume}%, rgba(255,255,255,0.3) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.3) 100%)`
                  }}
                />
              </div>
              <button 
                onClick={handlePrev}
                className="glass-button w-12 h-12 flex items-center justify-center hover:text-pink-700 transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              <button 
                onClick={handlePlayPause}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              <button 
                onClick={handleNext}
                className="glass-button w-12 h-12 flex items-center justify-center hover:text-pink-700 transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>
              <button className="glass-button w-12 h-12 flex items-center justify-center hover:text-pink-700 transition-colors">
                <Repeat className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {showLyrics ? (
          <div className="flex flex-col gap-3 overflow-auto liquid-glass rounded-2xl p-6">
            <h4 className="text-sm font-medium text-slate-600 mb-4 text-center">
              {currentSong.title} - {currentSong.artist}
            </h4>
            <div className="flex-1 flex items-center justify-center">
              <div className="space-y-4 text-center">
                {currentSong.lyrics?.map((line, index) => (
                  <div 
                    key={index} 
                    className={`text-sm transition-all duration-300 ${
                      index === Math.floor(progress / 10) 
                        ? 'text-pink-600 font-medium scale-105' 
                        : 'text-slate-500'
                    }`}
                  >
                    {line}
                  </div>
                ))}
                {!currentSong.lyrics && (
                  <div className="text-slate-400 text-sm">暂无歌词</div>
                )}
              </div>
            </div>
          </div>
        ) : showPlaylist && (
          <div className="flex flex-col gap-3 overflow-auto">
            {songs.map((song, index) => (
              <div 
                key={song.id}
                onClick={() => {
                  setCurrentSongIndex(index);
                  setProgress(0);
                  setIsPlaying(true);
                }}
                className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  index === currentSongIndex 
                    ? 'bg-gradient-to-r from-pink-400/20 to-purple-400/20 border border-pink-400/30' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  {song.cover ? (
                    <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-400/80 to-purple-400/80 flex items-center justify-center text-2xl">
                      {song.thumbnail}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium truncate ${index === currentSongIndex ? 'text-pink-700' : 'text-slate-700'}`}>
                    {song.title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">{song.artist}</p>
                </div>
                <div className="text-xs text-slate-400">
                  {song.duration}
                </div>
                {index === currentSongIndex && isPlaying && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-3 bg-pink-500 rounded-full animate-pulse" />
                    <div className="w-1 h-4 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1 h-5 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}