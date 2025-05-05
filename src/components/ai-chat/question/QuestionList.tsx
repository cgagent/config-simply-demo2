import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../config/constants/chatConstants';
import { QuestionCard } from './QuestionCard';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionListProps {
  messages: Message[];
  isProcessing?: boolean;
}

interface QuestionAnswer {
  question: Message;
  answer: Message;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  messages,
  isProcessing = false,
}) => {
  const [questionAnswerPairs, setQuestionAnswerPairs] = useState<QuestionAnswer[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [previousPairsLength, setPreviousPairsLength] = useState(0);
  const lastQuestionRef = useRef<HTMLDivElement>(null);

  // Group messages into question-answer pairs
  useEffect(() => {
    const pairs: QuestionAnswer[] = [];
    for (let i = 0; i < messages.length; i += 2) {
      if (i + 1 < messages.length) {
        pairs.push({
          question: messages[i],
          answer: messages[i + 1],
        });
      }
    }
    setQuestionAnswerPairs(pairs);
  }, [messages]);

  // Handle scrolling when new questions are added
  useEffect(() => {
    if (questionAnswerPairs.length > previousPairsLength && containerRef.current) {
      const container = containerRef.current;
      
      // Set initial scroll position to bottom
      if (previousPairsLength === 0) {
        container.scrollTop = container.scrollHeight;
      }
      
      // For new messages, keep the scroll position at the bottom
      // This will make content appear to grow upward
      if (container.scrollHeight > container.clientHeight) {
        container.scrollTop = container.scrollHeight - container.clientHeight;
      }
    }
    setPreviousPairsLength(questionAnswerPairs.length);
  }, [questionAnswerPairs.length, previousPairsLength]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto scroll-smooth"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <div className="w-full">
          <AnimatePresence>
            {[...questionAnswerPairs].reverse().map(({ question, answer }, index) => (
              <motion.div
                key={question.id}
                ref={index === 0 ? lastQuestionRef : null}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="px-4 pt-4"
              >
                <QuestionCard
                  question={question}
                  answer={answer}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-0 right-0 p-4 pointer-events-none"
        >
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-primary/20 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-primary/20 rounded"></div>
                <div className="h-4 bg-primary/20 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 