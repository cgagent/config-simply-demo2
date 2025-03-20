import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuggestedQueriesProps {
  queries: { label: string; query: string }[];
  onSelectQuery: (query: string) => void;
  className?: string;
}

export const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ 
  queries, 
  onSelectQuery,
  className 
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2 w-full overflow-hidden pb-2", className)}>
      {queries.map((queryItem, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-xs rounded-full px-3 py-1.5 bg-blue-900/20 border-blue-800/40 text-blue-100 
                     hover:bg-blue-800/30 hover:border-blue-500/50 hover:text-white transition-all
                     flex items-center whitespace-nowrap shadow-sm"
          onClick={() => onSelectQuery(queryItem.query)}
        >
          {queryItem.label}
          <ArrowUp className="h-3 w-3 ml-1 flex-shrink-0" />
        </Button>
      ))}
    </div>
  );
};
