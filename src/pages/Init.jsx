import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Atom, Zap, Wind, Feather, Heart, Palette, Code, RefreshCw, Check } from 'lucide-react';
import { useBackground } from '../context/BackgroundContext';

export default function Init() {
  const { currentScheme, changeScheme, setCustomCss, resetToDefault, schemes, getBackgroundStyle } = useBackground();
  const [activeTab, setActiveTab] = useState('preset');
  const [customCssInput, setCustomCssInput] = useState(currentScheme.customCss);
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCustomCss = () => {
    setIsApplying(true);
    setTimeout(() => {
      setCustomCss(customCssInput);
      setIsApplying(false);
    }, 300);
  };

  const handleReset = () => {
    resetToDefault();
    setCustomCssInput('');
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center overflow-y-auto" style={getBackgroundStyle()}>
      <div className="flex-1 w-full max-w-6xl px-4 md:px-8 py-10 flex flex-col items-center">
        <div className="text-center mb-8">
          <img src="/favicon.ico" className="w-20 h-20 mb-4 mx-auto block" alt="logo" />
          <h1 className="text-3xl font-bold neon-text-pink tracking-wide">
            AurorάquaUI
          </h1>
        </div>

        <div className="w-full mb-6">
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-heading">关于项目</h2>
              <a href="https://github.com/micromimo/AuroraquaUI" target="_blank" rel="noopener noreferrer" className="glass-btn rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-body hover:text-heading transition-colors">
                <GitBranch className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
            <p className="text-sm text-body leading-relaxed">
              「Aurorάqua」是受 Apple LiquidGlass 設計風格和冰島極光啟發的 Web UI 模板，採用「玻璃擬態」設計與柔和的極光漸變效果。基於 React 和 Tailwind 構建。
              ⚠️目前僅供個人UI喜好展示，大部分功能仍未開發，仍很不完善。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
                   style={{ background: 'rgba(123, 97, 255, 0.1)' }}>
                <Atom className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-lg font-semibold text-heading">React</div>
              <div className="text-xs text-muted">前端框架</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
                   style={{ background: 'rgba(255, 107, 157, 0.1)' }}>
                <Zap className="w-5 h-5 text-pink-500" />
              </div>
              <div className="text-lg font-semibold text-heading">Vite</div>
              <div className="text-xs text-muted">构建工具</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
                   style={{ background: 'rgba(147, 51, 234, 0.1)' }}>
                <Wind className="w-5 h-5 text-violet-500" />
              </div>
              <div className="text-lg font-semibold text-heading">TailwindCSS</div>
              <div className="text-xs text-muted">样式框架</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
                   style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                <Feather className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-lg font-semibold text-heading">Lucide</div>
              <div className="text-xs text-muted">图标库</div>
            </div>
          </div>
        </div>

        <div className="text-center mb-6"a>
          <p className="text-sm text-secondary tracking-wider">
            Select a Case to Start
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <Link to="/case3" className="group">
            <div className="liquid-glass rounded-2xl p-6 h-48 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #7b61ff, #a78bfa)' }}>
                  <span className="text-2xl">🎨</span>
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-bold text-heading group-hover:neon-text-pink transition-all">
                    Case 3
                  </h2>
                  <p className="text-xs text-muted">UI Showcase</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted">Multi-scene interface demo</p>
                <div className="text-pink-600 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </Link>

          <Link to="/case2" className="group">
            <div className="liquid-glass rounded-2xl p-6 h-48 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #ff6b9d, #ec4899)' }}>
                  <span className="text-2xl">🖼️</span>
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-bold text-heading group-hover:neon-text-pink transition-all">
                    Case 2
                  </h2>
                  <p className="text-xs text-muted">Image Matting Agent</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted">Object localization</p>
                <div className="text-pink-600 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </Link>

          <Link to="/case1" className="group">
            <div className="liquid-glass rounded-2xl p-6 h-48 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #7b61ff, #ff6b9d)' }}>
                  <span className="text-2xl">🎥</span>
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-bold text-heading group-hover:neon-text-pink transition-all">
                    Case 1
                  </h2>
                  <p className="text-xs text-muted">Video Stream Dashboard</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted">Real-time video processing</p>
                <div className="text-pink-600 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>


        <div className="w-auto mb-8">
          <div className="liquid-glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Palette className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-heading">配色方案</h2>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('preset')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'preset'
                    ? 'bg-gradient-to-r from-purple-400/80 to-pink-400/80 text-white shadow-lg'
                    : 'bg-white/30 text-body hover:bg-white/50'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>预设配色</span>
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'custom'
                    ? 'bg-gradient-to-r from-purple-400/80 to-pink-400/80 text-white shadow-lg'
                    : 'bg-white/30 text-body hover:bg-white/50'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>自定义CSS</span>
              </button>
            </div>

            {activeTab === 'preset' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {schemes.map((scheme) => (
                  <button
                    key={scheme.id}
                    onClick={() => changeScheme(scheme.id)}
                    className={`relative rounded-2xl p-4 transition-all duration-300 ${
                      currentScheme.scheme.id === scheme.id
                        ? 'ring-2 ring-purple-400 ring-offset-2 scale-[1.02]'
                        : 'hover:scale-[1.02] hover:shadow-lg'
                    }`}
                    style={{
                      background: scheme.background,
                      boxShadow: currentScheme.scheme.id === scheme.id
                        ? `0 0 30px ${scheme.primaryColor}40`
                        : 'none',
                    }}
                  >
                    {currentScheme.scheme.id === scheme.id && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-lg">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    <div className="aspect-square rounded-xl mb-3 flex items-center justify-center"
                         style={{
                           background: `linear-gradient(135deg, ${scheme.primaryColor}30, ${scheme.secondaryColor}30)`,
                         }}>
                      <div className="w-8 h-8 rounded-lg" style={{ background: scheme.primaryColor }} />
                    </div>
                    <div className="text-sm font-semibold text-glass-heading text-center truncate">
                      {scheme.name}
                    </div>
                    <div className="text-xs text-glass-muted text-center mt-1 truncate">
                      {scheme.description}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'custom' && (
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    value={customCssInput}
                    onChange={(e) => setCustomCssInput(e.target.value)}
                    placeholder="输入自定义背景CSS样式，例如：&#10;background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);&#10;background: radial-gradient(circle, #ff6b9d 0%, #7b61ff 100%);"
                    className="w-full h-32 input-glass rounded-xl p-4 text-sm font-mono resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleApplyCustomCss}
                    disabled={isApplying}
                    className="flex-1 glass-button flex items-center justify-center gap-2 text-pink-700 font-medium"
                  >
                    {isApplying ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    <span>{isApplying ? '应用中...' : '应用样式'}</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 glass-button flex items-center justify-center gap-2 text-body font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>重置默认</span>
                  </button>
                </div>
                <div className="text-xs text-muted bg-white/20 rounded-lg p-3">
                  <p className="font-medium mb-1">💡 使用提示：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>支持所有CSS背景属性（background、background-image等）</li>
                    <li>支持渐变、图片、纯色等各种背景类型</li>
                    <li>样式会自动保存到Cookie，刷新页面后保持</li>
                    <li>留空或点击重置按钮恢复预设主题</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

      <footer className="w-full py-6 px-8 text-center text-xs text-muted">
        Made with <Heart className="w-4 h-4 inline text-red-500" /> by <a href="https://github.com/micromimo" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-700 underline underline-offset-2 transition-colors">micromimo🎀👿</a>
      </footer>
    </div>
  );
}