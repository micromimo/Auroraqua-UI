import { Wifi } from 'lucide-react'

export default function ConnectionStatus({ isConnected, isConnecting }) {
  const status = isConnecting ? 'connecting' : isConnected ? 'connected' : 'disconnected'
  
  return (
    <div className="flex items-center gap-2">
      <div className={`status-dot ${status === 'connecting' ? 'is-connecting' : ''} ${
        status === 'connected' ? 'bg-green-500' :
        status === 'connecting' ? 'bg-yellow-500' :
        'bg-gray-400'
      }`} />
      <span className="text-sm text-gray-600 font-medium">
        {status === 'connected' ? '已连接' : status === 'connecting' ? '连接中' : '未连接'}
      </span>
      {isConnected && <Wifi className="w-4 h-4 text-green-500" />}
    </div>
  )
}