import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import StatisticsBar from './StatisticsBar';
import { useChat } from '@/contexts/ChatContext';
import { useLocation } from 'react-router-dom';
import { CLOSE_STATS_BAR_EVENT } from '@/contexts/ChatContext';

interface CollapsibleStatisticsBarProps {
  ciCompletionPercentage: number;
  blockedPackages: number;
  totalPackages: number;
}

const CollapsibleStatisticsBar: React.FC<CollapsibleStatisticsBarProps> = ({
  ciCompletionPercentage,
  blockedPackages,
  totalPackages,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { handleChatQuery } = useChat();
  const location = useLocation();

  // Close the drawer when navigating to CI Configuration page
  useEffect(() => {
    if (location.pathname === '/ci-configuration') {
      setIsExpanded(false);
    }
  }, [location.pathname]);

  // Add event listener to close stats bar when chat is activated
  useEffect(() => {
    const handleCloseStatsBar = () => {
      console.log('Closing stats bar from event');
      setIsExpanded(false);
    };

    // Add event listener
    window.addEventListener(CLOSE_STATS_BAR_EVENT, handleCloseStatsBar);

    // Cleanup
    return () => {
      window.removeEventListener(CLOSE_STATS_BAR_EVENT, handleCloseStatsBar);
    };
  }, []);

  return (
    <LayoutGroup>
      <motion.div
        layout
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : '40px',
          transition: { 
            height: {
              duration: 0.6,
              ease: [0.32, 0.72, 0, 1]
            }
          }
        }}
        className={`
          relative overflow-hidden bg-transparent
          rounded-lg border border-gray-500/20 backdrop-blur-[2px] cursor-pointer 
          transition-all duration-300 group
          hover:border-gray-400/30 hover:bg-gray-950/10
          active:scale-[0.995] active:border-gray-400/40
        `}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            layout
            key={isExpanded ? 'expanded' : 'collapsed'}
            initial={{ opacity: 0, y: isExpanded ? 20 : -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1],
                opacity: { duration: 0.3 }
              }
            }}
            exit={{ 
              opacity: 0, 
              y: isExpanded ? -20 : 20,
              transition: {
                duration: 0.4,
                ease: [0.32, 0.72, 0, 1],
                opacity: { duration: 0.25 }
              }
            }}
            className="py-2 px-3"
          >
            {isExpanded ? (
              <StatisticsBar
                ciCompletionPercentage={ciCompletionPercentage}
                blockedPackages={blockedPackages}
                totalPackages={totalPackages}
                onChatQuery={handleChatQuery}
              />
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-200/90 group-hover:text-gray-100">
                    Overview
                  </span>
                  <span className="text-xs text-gray-400/70 group-hover:text-gray-400/90">
                    (click to expand)
                  </span>
                </div>
                <span className="text-sm text-gray-300/70 group-hover:text-gray-300/90">
                  {totalPackages} total packages • {blockedPackages} Blocked package
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Centered bottom chevron */}
        <motion.div
          layout
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2"
          animate={{ 
            rotate: isExpanded ? 180 : 0,
            transition: {
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1]
            }
          }}
        >
          <ChevronDown 
            className={`
              h-4 w-4 text-gray-400/60
              transition-all duration-300 
              group-hover:text-gray-300/90 group-hover:scale-110
            `} 
          />
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};

export default CollapsibleStatisticsBar; 