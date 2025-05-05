import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Message } from '../config/constants/chatConstants';
import { Bot, User } from 'lucide-react';
import { ScrollProgress } from './ScrollProgress';

interface QuestionCardProps {
  question: Message;
  answer: Message;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Handle scroll progress
  const handleScroll = () => {
    if (!cardRef.current) return;
    
    requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = cardRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    });
  };

  useEffect(() => {
    if (!headerRef.current || !cardRef.current) return;

    setHeaderHeight(headerRef.current.offsetHeight);

    const observer = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          setIsSticky(!entry.isIntersecting);
        });
      },
      { 
        threshold: [1],
        rootMargin: '-1px 0px 0px 0px'
      }
    );

    observer.observe(headerRef.current);
    cardRef.current.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      if (cardRef.current) {
        cardRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative w-full bg-card rounded-lg border shadow-sm overflow-y-auto"
      style={{
        minHeight: '200px',
        maxHeight: '600px'
      }}
    >
      {/* Header placeholder when sticky to maintain spacing */}
      {isSticky && (
        <div style={{ height: headerHeight }} className="w-full" />
      )}

      {/* Question Header */}
      <div
        ref={headerRef}
        className={cn(
          "w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "border-b rounded-t-lg",
          isSticky ? "sticky top-0 z-50 shadow-md" : "relative"
        )}
      >
        <div className="flex items-center gap-3 p-4">
          <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-primary/10">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-medium">
              {question.content}
            </p>
          </div>
        </div>
        
        <ScrollProgress 
          progress={scrollProgress}
          className="absolute bottom-0 left-0"
        />
      </div>

      {/* Answer Section */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-3"
        >
          <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground">
              {answer.content}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 