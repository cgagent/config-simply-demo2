
import React from "react";
import { CircleAlert, X, ExternalLink, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CVECardProps {
  cveId: string;
  description: string;
  severity: "High" | "Medium" | "Low";
  packageName: string;
  packageVersion: string;
  fixVersion: string;
  cveRelation: string;
  cvssScore: string;
  epssScore: string;
  percentile: string;
  onClose?: () => void;
}

const CVECard: React.FC<CVECardProps> = ({
  cveId,
  description,
  severity,
  packageName,
  packageVersion,
  fixVersion,
  cveRelation,
  cvssScore,
  epssScore,
  percentile,
  onClose,
}) => {
  return (
    <div className="w-full max-w-2xl mt-4 overflow-hidden bg-gray-900 border border-gray-800 rounded-lg shadow-lg animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
        <div className="flex items-center space-x-2">
          <CircleAlert className="w-5 h-5 text-red-500" />
          <span className="font-medium text-white">{cveId}</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            className="flex items-center px-2 py-1 text-sm text-gray-300 bg-gray-700 rounded hover:bg-gray-600 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            <span>View more</span>
          </button>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 rounded hover:bg-gray-700 hover:text-gray-200 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-3 bg-gray-900 border-b border-gray-800">
        <p className="text-sm text-gray-300">{description}</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-5 gap-4 p-4">
        {/* Left Column - Severity */}
        <div className="col-span-1">
          <h3 className="mb-2 text-sm font-medium text-gray-400">JFrog Severity</h3>
          <div className="flex items-center">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center mr-2",
              severity === "High" ? "bg-red-900" : 
              severity === "Medium" ? "bg-yellow-900" : "bg-blue-900"
            )}>
              <AlertCircle className={cn(
                "w-4 h-4",
                severity === "High" ? "text-red-500" : 
                severity === "Medium" ? "text-yellow-500" : "text-blue-500"
              )} />
            </div>
            <span className="text-white">{severity}</span>
          </div>
        </div>

        {/* Right Column - Package Info */}
        <div className="col-span-4 p-3 bg-gray-800 rounded-md">
          <h3 className="mb-2 text-sm font-medium text-gray-300">Package</h3>
          
          <div className="mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-red-400 font-medium">npm</span>
              <span className="text-gray-300">{packageName}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-400">Version</p>
              <p className="text-sm text-blue-400">{packageVersion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Fix Version</p>
              <p className="text-sm text-blue-400">{fixVersion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">CVE Relation</p>
              <p className="text-sm text-gray-300">{cveRelation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-3 gap-4 px-4 py-3 bg-gray-900 border-t border-gray-800">
        <div>
          <h3 className="text-sm font-medium text-gray-400">CVSS Score</h3>
          <p className="text-sm text-red-400">{cvssScore}</p>
        </div>
        <div className="flex items-start">
          <h3 className="text-sm font-medium text-gray-400">EPSS Score</h3>
          <Info className="w-4 h-4 ml-1 text-gray-500" />
          <p className="ml-2 text-sm text-gray-300">{epssScore}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-400">Percentile:</h3>
          <div className="px-2 py-0.5 bg-blue-900 text-blue-300 rounded inline-block text-sm">
            {percentile}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVECard;