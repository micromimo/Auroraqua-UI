import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import PillTabBar from '../../ui/PillTabBar';
import { lucideCategories } from '../../../data/lucideCategories';
import LucideIconCard from './LucideIconCard';
import { TiltCard } from '../../ui/TiltCard';
import SearchInput from '../SearchInput';

function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();
}

export default function LucideExposeSubpage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIcon, setCopiedIcon] = useState(null);

  const categories = useMemo(() => {
    const cats = Object.keys(lucideCategories);
    if (!cats.includes('通用')) return cats;
    return cats;
  }, []);

  // 计算所有图标总数
  const allIcons = useMemo(() => {
    return Object.values(lucideCategories).flat();
  }, []);

  const currentIcons = useMemo(() => {
    let icons = activeCategory === '全部' ? allIcons : (lucideCategories[activeCategory] || []);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      icons = icons.filter(name => name.toLowerCase().includes(q));
    }
    return icons;
  }, [activeCategory, searchQuery, allIcons]);

  const handleCopy = useCallback((name) => {
    const importPath = `lucide-react/${toKebabCase(name)}`;
    navigator.clipboard.writeText(`import { ${name} } from '${importPath}';`);
    setCopiedIcon(name);
    setTimeout(() => setCopiedIcon(null), 1500);
  }, []);

  const categoryTabs = useMemo(() => {
    const sortedCats = [...categories].sort((a, b) => {
      const countA = lucideCategories[a]?.length || 0;
      const countB = lucideCategories[b]?.length || 0;
      return countB - countA;
    });
    return [
      { id: '全部', label: '全部', count: allIcons.length },
      ...sortedCats.map(cat => ({
        id: cat,
        label: cat,
        count: lucideCategories[cat]?.length || 0,
      })),
    ];
  }, [categories, allIcons.length]);

  return (
    <div className="h-full flex gap-5 overflow-visible">
      {/* 纵向 Tab 导航 */}
      <motion.div 
        className="w-20 flex-shrink-0 h-full"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PillTabBar
          tabs={categoryTabs}
          activeTab={activeCategory}
          onChange={setActiveCategory}
          orientation="vertical"
        />
      </motion.div>

      {/* 右侧内容区 */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        {/* 搜索栏 */}
        <motion.div 
          className="liquid-glass rounded-2xl p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索图标..."
            className="w-full"
          />
        </motion.div>

        {/* 图标网格 */}
        <AnimatePresence mode="wait">
          <div className="flex-1 rounded-2xl overflow-hidden">
            <motion.div
              key={activeCategory + (searchQuery || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto p-3"
            >
            {currentIcons.length === 0 ? (
              <div className="liquid-glass rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <Search className="w-12 h-12 text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-heading mb-2">未找到图标</h3>
                  <p className="text-sm text-muted">尝试使用其他关键词搜索</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                {currentIcons.map((iconName, index) => (
                  <TiltCard key={iconName} tiltAmount={6} scaleAmount={1.03} className="h-full">
                    <LucideIconCard
                      name={iconName}
                      index={index}
                      copied={copiedIcon === iconName}
                      onCopy={() => handleCopy(iconName)}
                    />
                  </TiltCard>
                ))}
              </div>
            )}
          </motion.div>
        </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
