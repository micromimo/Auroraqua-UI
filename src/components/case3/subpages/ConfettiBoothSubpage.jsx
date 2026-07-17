import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PillTabBar from '../../ui/PillTabBar';
import { categories, confettiPresets } from '../../../data/case3/confetti';
import ConfettiCard from './ConfettiCard';
import SearchInput from '../SearchInput';

export default function ConfettiBoothSubpage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryTabs = useMemo(() => {
    return categories.map((category) => {
      if (category.id === 'all') {
        return {
          id: category.id,
          label: category.label,
          count: confettiPresets.length,
        };
      }

      const count = confettiPresets.filter(
        (preset) => preset.category === category.label
      ).length;

      return {
        id: category.id,
        label: category.label,
        count,
      };
    });
  }, []);

  const filteredPresets = useMemo(() => {
    let items = confettiPresets;

    if (activeCategory !== 'all') {
      const categoryLabel = categories.find((c) => c.id === activeCategory)?.label;
      items = items.filter((preset) => preset.category === categoryLabel);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (preset) =>
          preset.label.toLowerCase().includes(query) ||
          preset.description.toLowerCase().includes(query) ||
          preset.category.toLowerCase().includes(query)
      );
    }

    return items;
  }, [activeCategory, searchQuery]);

  return (
    <div className="h-full flex flex-col gap-5">
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-heading">Confetti Booth</h2>
          <p className="text-sm text-muted mt-1">
            点击任意卡片即可预览动画效果
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索动画..."
            className="w-full sm:w-64"
          />
        </div>
      </motion.div>

      <div className="flex-1 flex gap-5 min-h-0">
        <motion.div
          className="w-20 flex-shrink-0"
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

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + (searchQuery || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto pr-1"
            >
              {filteredPresets.length === 0 ? (
                <div className="liquid-glass rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-muted mx-auto mb-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <h3 className="text-lg font-bold text-heading mb-2">
                      未找到动画
                    </h3>
                    <p className="text-sm text-muted">
                      尝试使用其他关键词搜索
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 grid-auto-rows-[minmax(0,1fr)]">
                  {filteredPresets.map((preset, index) => (
                    <motion.div
                      key={preset.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className="h-full"
                    >
                      <ConfettiCard
                        preset={preset}
                        onClick={() => {}}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
