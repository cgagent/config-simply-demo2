import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, onSearch, ...props }, ref) => {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      if (onSearch) {
        onSearch(newValue);
      }
    };

    const handleClear = () => {
      setValue('');
      if (onSearch) {
        onSearch('');
      }
    };

    return (
      <div className={cn(
        "relative flex items-center w-full max-w-md group",
        className
      )}>
        <SearchIcon className="absolute left-3 h-4 w-4 text-blue-400 z-10" />
        <input
          type="text"
          className={cn(
            "h-10 w-full rounded-full px-10 text-sm",
            "bg-blue-950/60 text-blue-100",
            "border border-blue-500/30 shadow-sm",
            "transition-all duration-200",
            "focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-400/50",
            "focus-visible:shadow-[0_0_10px_rgba(59,130,246,0.3)]",
            "placeholder:text-blue-300/50"
          )}
          value={value}
          onChange={handleChange}
          placeholder="Search repositories..."
          ref={ref}
          {...props}
        />
        {value && (
          <button 
            onClick={handleClear}
            className="absolute right-3 h-5 w-5 text-blue-400 hover:text-blue-200 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    );
  }
);

Search.displayName = 'Search';

export default Search;
