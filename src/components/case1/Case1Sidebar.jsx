import { useState, useEffect } from 'react'
import { 
  Settings, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Palette, 
  Activity, 
  Gauge, 
  ChevronLeft,
  RotateCcw,
  Laptop,
  X
} from 'lucide-react'
import Section from '../ui/Section'
import SettingRow from '../form/SettingRow'
import Toggle from '../form/Toggle'
import InfoItem from '../data/InfoItem'
import NavBar from './NavBar'

export default function Case1Sidebar({ 
  isOpen, 
  onToggle,
  connectionStatus,
  onConnect,
  onDisconnect,
  settings,
  onSettingsChange
}) {
  const [collapsed, setCollapsed] = useState(!isOpen)

  useEffect(() => {
    setCollapsed(!isOpen)
  }, [isOpen])

  const {
    displayScale,
    colorCorrection,
    rotation,
    resolution,
    codecFormat,
    showFpsOverlay,
    hardwareAccel,
    autoConnect
  } = settings

  const handleSettingChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <div className="sidebar-container" style={{ zIndex: 50 }}>
      <NavBar onToggle={onToggle} />
      
      <div className={`sidebar-panel ${collapsed ? 'collapsed' : 'expanded'} glass`} style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.3))',
      }}>
        <div className="h-full overflow-y-auto p-5 flex flex-col gap-5 hide-scrollbar">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-pink-500" />
              <h2 className="text-base font-semibold gradient-text">Command Panel</h2>
            </div>
            <button
              onClick={onToggle}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all sidebar-white"
            >
              <ChevronLeft className="w-4 h-4 text-body" />
            </button>
          </div>

          <Section title="连接设置" icon={<Wifi className="w-4 h-4" />}>
            <div className="flex flex-col gap-3">
              <label className="text-xs font-medium text-muted">服务地址</label>
              <input
                className="input-glass w-full text-sm"
                value="http://localhost:8765"
                disabled
                placeholder="http://localhost:8765"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">编解码格式</span>
                <div className="flex gap-1">
                  {[
                    { v: 'H264', label: 'H.264' },
                    { v: 'H265', label: 'H.265' },
                    { v: 'AV1', label: 'AV1' },
                  ].map(({ v, label }) => (
                    <button
                      key={v}
                      onClick={() => handleSettingChange('codecFormat', v)}
                      className="flex-1 min-w-[44px] py-1.5 text-xs rounded-lg transition-all text-body shadow-md"
                      style={
                        codecFormat === v
                          ? {
                              background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.85), rgba(255, 211, 219, 0.65))',
                              border: '1px solid rgba(255, 255, 255, 0.6)',
                              boxShadow: 'rgba(255, 211, 219, 0.5) 0px 2px 8px, rgba(255, 255, 255, 0.5) 0px 1px 2px inset',
                            }
                          : {}
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <SettingRow label="硬件加速">
                <Toggle checked={hardwareAccel} onChange={(v) => handleSettingChange('hardwareAccel', v)} />
              </SettingRow>

              <SettingRow label="自动连接">
                <Toggle checked={autoConnect} onChange={(v) => handleSettingChange('autoConnect', v)} />
              </SettingRow>

              <div className="flex gap-2">
                {connectionStatus.isConnected ? (
                  <button onClick={onDisconnect} className="btn-danger flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <WifiOff className="w-4 h-4" />
                    断开连接
                  </button>
                ) : (
                  <button onClick={onConnect} className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]" style={{
                    background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.85), rgba(255, 211, 219, 0.65))',
                    color: '#5a3a4a',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 2px 10px rgba(255, 211, 219, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                  }}>
                    <Wifi className="w-4 h-4" />
                    {connectionStatus.isConnecting ? '连接中...' : '连接'}
                  </button>
                )}
                <button onClick={onConnect} className="rounded-xl px-3 flex items-center justify-center hover:scale-105 transition-all sidebar-white" title="刷新">
                  <RefreshCw className="w-4 h-4 text-muted" />
                </button>
              </div>

              {connectionStatus.error && !connectionStatus.isConnected && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/30 flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-500" />
                  </div>
                  <p className="text-xs text-red-600 leading-relaxed">{connectionStatus.error}</p>
                </div>
              )}
            </div>
          </Section>

          <Section title="显示设置" icon={<Palette className="w-4 h-4" />}>
            <div className="space-y-4">
              <SettingRow label="画面缩放">
                <div className="flex items-center gap-2 w-full min-w-0">
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={displayScale}
                    onChange={(e) => handleSettingChange('displayScale', parseFloat(e.target.value))}
                    className="flex-1 sidebar-range"
                    style={{
                      background: `linear-gradient(to right, rgba(255, 211, 219, 0.85) 0%, rgba(255, 211, 219, 0.85) ${((displayScale - 0.5) / 1) * 100}%, rgba(255, 255, 255, 0.25) ${((displayScale - 0.5) / 1) * 100}%, rgba(255, 255, 255, 0.25) 100%)`
                    }}
                  />
                  <span className="text-xs font-mono text-body w-10 text-right flex-shrink-0">{displayScale.toFixed(1)}x</span>
                </div>
              </SettingRow>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body">颜色校正</span>
                  <Toggle checked={colorCorrection} onChange={(v) => handleSettingChange('colorCorrection', v)} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body">FPS 叠加</span>
                  <Toggle checked={showFpsOverlay} onChange={(v) => handleSettingChange('showFpsOverlay', v)} />
                </div>
              </div>

              <SettingRow label="解析度">
                <select
                  value={resolution}
                  onChange={(e) => handleSettingChange('resolution', e.target.value)}
                  className="input-glass w-full text-xs py-1.5 appearance-none pr-7 cursor-pointer"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235a3a4a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 8px center',
                    backgroundSize: '12px 12px',
                  }}
                >
                  <option value="480p">480p (854×480)</option>
                  <option value="720p">720p (1280×720)</option>
                  <option value="1080p">1080p (1920×1080)</option>
                  <option value="1440p">1440p (2560×1440)</option>
                  <option value="2160p">2160p (3840×2160)</option>
                  <option value="native">原始 (跟随屏幕)</option>
                </select>
              </SettingRow>

              <SettingRow label="旋转角度">
                <div className="flex gap-1">
                  {[0, 90, 180, 270].map((r) => (
                    <button
                      key={r}
                      onClick={() => handleSettingChange('rotation', r)}
                      className={`flex-1 py-1.5 text-xs rounded-lg transition-all ${
                        rotation === r 
                          ? 'text-heading shadow-md' 
                          : 'sidebar-white text-body'
                      }`}
                      style={rotation === r ? {
                        background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.85), rgba(255, 211, 219, 0.65))',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        boxShadow: '0 2px 8px rgba(255, 211, 219, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                      } : {}}
                    >
                      {r}°
                    </button>
                  ))}
                </div>
              </SettingRow>

              <div className="grid grid-cols-2 gap-2">
                <button
                  className="py-2 rounded-xl text-xs text-heading flex items-center justify-center gap-2 transition-all sidebar-white"
                  title="系统全屏"
                >
                  <Laptop className="w-3 h-3" />
                  系统全屏
                </button>
                <button
                  onClick={() => handleSettingChange('rotation', 0)}
                  className="py-2 rounded-xl text-xs text-body flex items-center justify-center gap-2 transition-all sidebar-white"
                >
                  <RotateCcw className="w-3 h-3" />
                  重置显示
                </button>
              </div>
            </div>
          </Section>

          <Section title="流信息" icon={<Activity className="w-4 h-4" />}>
            <div className="grid grid-cols-2 gap-3">
              <InfoItem label="会话 ID" value="abc12345..." />
              <InfoItem label="原始帧率" value="60 fps" />
              <InfoItem label="实际帧率" value="58 FPS" highlight />
              <InfoItem label="编解码方式" value="H.264" />
              <InfoItem label="输出分辨率" value="1920×1080" />
              <InfoItem label="已接收帧" value="12,345" />
              <InfoItem label="硬件编码" value="NVENC · 硬件" highlight />
              <InfoItem label="硬件解码" value="DXVA2 · 硬件" highlight />
            </div>
          </Section>

          <Section title="系统状态" icon={<Gauge className="w-4 h-4" />}>
            <div className="grid grid-cols-2 gap-3">
              <InfoItem label="传输模式" value="WiFi" />
              <InfoItem label="延迟" value="实时" />
              <InfoItem label="带宽" value="自适应" />
              <InfoItem label="状态" value={connectionStatus.isConnected ? '在线' : '离线'} highlight={connectionStatus.isConnected} />
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}