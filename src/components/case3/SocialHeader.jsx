import { ChevronLeft } from 'lucide-react';

const tabs = [
  { id: 'discover', label: 'Discover' },
  { id: 'following', label: 'Following' },
  { id: 'video', label: 'Video' },
  { id: 'rust', label: 'Rust Language' },
];

function SocialHeader({ activeTab, onTabChange, showBackButton }) {
  return (
    <div className="liquid-glass rounded-2xl p-4 sticky top-0 z-30 backdrop-blur-md">
      <div className="flex items-center gap-4 mb-4">
        {showBackButton && (
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/20 text-body transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-lg font-bold text-heading">{tabs.find(t => t.id === activeTab)?.label || 'Discover'}</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
              activeTab === tab.id
                ? 'text-pink-700'
                : 'bg-white/30 text-body hover:bg-white/50'
            }`}
            style={activeTab === tab.id ? {
              background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
              boxShadow: '0 0 20px rgba(244, 114, 182, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            } : {}}
          >
            {activeTab === tab.id && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SocialHeader;