import { Link } from 'react-router-dom'
import ModelStatusCard from './ModelStatusCard'
import ControlPanel from './ControlPanel'
import MetricsChart from './MetricsChart'

export default function Case2Sidebar({
  modelStatus,
  onRefreshModel,
  isFinished,
  maskBase64,
  saveLoading,
  saveMsg,
  onSaveResult,
  imagePath,
  currentAction,
  currentStep,
  confidence,
  running,
  onSelectImage,
  onStartRl,
  history,
  totalSteps,
  enableRlModel,
  setEnableRlModel,
  enableTraditional,
  setEnableTraditional,
  config,
  setConfig,
  pipelineStages
}) {
  return (
    <aside className="w-[340px] shrink-0 flex flex-col gap-4 overflow-y-auto liquid-glass rounded-2xl p-4">
      <div className="liquid-glass rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-wide" style={{ color: '#db2777', textShadow: '0 0 8px rgba(244,114,182,0.6), 0 0 20px rgba(244,114,182,0.4), 0 0 40px rgba(244,114,182,0.2)' }}>
              RL Matting Agent
            </h1>
            <p className="text-xs text-muted mt-1">
              Weakly-Supervised Object Localization&Matting
            </p>
          </div>
          <div className="text-3xl">😈</div>
        </div>
      </div>

      <ModelStatusCard
        modelStatus={modelStatus}
        onRefreshModel={onRefreshModel}
      />

      {isFinished && maskBase64 ? (
        <div className="liquid-glass-strong rounded-2xl p-4 space-y-3">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted">
            Matting Result
          </div>
          <div className="rounded-xl overflow-hidden bg-slate-100 aspect-square flex items-center justify-center">
            <img
              src={`data:image/png;base64,${maskBase64}`}
              alt="matting result preview"
              className="w-full h-full object-contain"
              style={{ 
                backgroundImage: "linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)", 
                backgroundSize: "20px 20px", 
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px" 
              }}
            />
          </div>
          <button
            className="glass-button w-full text-heading hover:text-pink-700 font-semibold flex items-center justify-center gap-2"
            onClick={onSaveResult}
            disabled={saveLoading}
          >
            <span className="relative z-10">
              {saveLoading ? "💾 保存中..." : "💾 下载结果"}
            </span>
          </button>
          {saveMsg && (
            <div className="text-xs text-center text-green-700">{saveMsg}</div>
          )}
        </div>
      ) : null}

      <ControlPanel
        imagePath={imagePath}
        currentAction={currentAction}
        currentStep={currentStep}
        confidence={confidence}
        running={running}
        isFinished={isFinished}
        onSelectImage={onSelectImage}
        onStartRl={onStartRl}
        history={history}
        totalSteps={totalSteps}
        enableRlModel={enableRlModel}
        setEnableRlModel={setEnableRlModel}
        enableTraditional={enableTraditional}
        setEnableTraditional={setEnableTraditional}
        config={config}
        setConfig={setConfig}
        pipelineStages={pipelineStages}
      />

      <MetricsChart history={history} totalSteps={totalSteps} />

      <Link 
        to="/init" 
        className="glass-button glass-button-no-scale liquid-glass-glow hover:text-pink-700 font-semibold text-center py-2"
      >
        <span className="relative z-10">init</span>
      </Link>
    </aside>
  )
}