
import React from 'react';

interface DiffViewProps {
  originalLines: string[];
  modifiedLines: string[];
  showSideBySide: boolean;
  jfrogStartIndex: number;
  jfrogEndIndex: number;
}

const DiffView: React.FC<DiffViewProps> = ({
  originalLines,
  modifiedLines,
  showSideBySide,
  jfrogStartIndex,
  jfrogEndIndex,
}) => {
  // Calculate the offset in original workflow (since it has fewer lines)
  const beforeJFrogIndex = jfrogStartIndex - 1;
  
  if (showSideBySide) {
    // Side by side diff view
    return (
      <div className="grid grid-cols-2 gap-1 bg-black text-white rounded-md overflow-x-auto text-sm">
        {/* Header */}
        <div className="col-span-1 p-2 bg-slate-800 font-medium text-slate-300 border-b border-slate-700">
          Original Workflow
        </div>
        <div className="col-span-1 p-2 bg-slate-800 font-medium text-slate-300 border-b border-slate-700">
          Modified Workflow with JFrog
        </div>
        
        {/* Content */}
        <div className="col-span-1 border-r border-slate-700">
          {originalLines.map((line, index) => {
            // Add highlight for where the JFrog code should be inserted
            const isInsertPoint = index === beforeJFrogIndex;
            const bgClass = isInsertPoint ? "bg-blue-950" : "";
            const borderClass = isInsertPoint ? "border-b-2 border-dashed border-blue-500" : "";
            
            return (
              <div key={`orig-${index}`} className={`flex ${bgClass} ${borderClass}`}>
                <span className="w-8 text-right select-none pr-2 opacity-50">
                  {index + 1}
                </span>
                <span className="flex-1 pl-2">{line}</span>
                {isInsertPoint && (
                  <span className="pr-2 text-blue-400 font-bold">← Insert JFrog here</span>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="col-span-1">
          {modifiedLines.map((line, index) => {
            // Determine if this line is part of the JFrog setup
            const isJFrogLine = index >= jfrogStartIndex && index <= jfrogEndIndex;
            
            // Set background and text colors based on whether it's a new line or not
            const bgClass = isJFrogLine ? "bg-green-950" : "";
            const textClass = isJFrogLine ? "text-green-300" : "text-white";
            const prefixClass = isJFrogLine ? "text-green-400 font-bold" : "opacity-50";
            
            return (
              <div key={`mod-${index}`} className={`flex ${bgClass}`}>
                <span className={`w-8 text-right select-none pr-2 ${prefixClass}`}>
                  {index + 1}
                </span>
                {isJFrogLine && (
                  <span className="text-green-400 font-medium pr-1">+</span>
                )}
                <span className={`flex-1 ${isJFrogLine ? "pl-1" : "pl-2"} ${textClass}`}>{line}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    // Unified diff view
    return (
      <div className="bg-black text-white rounded-md overflow-x-auto text-sm">
        <div className="p-2 bg-slate-800 font-medium text-slate-300 border-b border-slate-700">
          Unified Diff View
        </div>
        
        {modifiedLines.map((line, index) => {
          // Determine if this line is part of the JFrog setup
          const isJFrogLine = index >= jfrogStartIndex && index <= jfrogEndIndex;
          
          // Set colors based on whether it's a new line or not
          const bgClass = isJFrogLine ? "bg-green-950" : "";
          const textClass = isJFrogLine ? "text-green-300" : "text-white";
          
          return (
            <div key={`unified-${index}`} className={`flex ${bgClass}`}>
              <span className="w-8 text-right select-none pr-2 opacity-50">
                {index + 1}
              </span>
              {isJFrogLine ? (
                <span className="text-green-400 font-medium pr-1">+</span>
              ) : (
                <span className="w-4"></span>
              )}
              <span className={`flex-1 ${textClass}`}>{line}</span>
              {isJFrogLine && index === jfrogStartIndex && (
                <span className="pr-2 text-green-400 italic">← JFrog integration added</span>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};

export default DiffView;
