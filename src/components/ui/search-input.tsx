"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export function SearchInput({ 
  placeholder = "Search...", 
  className, 
  onChange 
}: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={cn(
      "flex items-center relative w-full max-w-md",
      className
    )}>
      <Search className="absolute left-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-9 w-full pl-9 bg-gray-100 dark:bg-gray-800 border-0 rounded-md text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />
    </div>
  );
} 