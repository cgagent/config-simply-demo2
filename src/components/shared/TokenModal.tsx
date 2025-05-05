import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, AlertTriangle, Terminal, Cloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  tokenName: string;
  expiration: string;
}

export const TokenModal: React.FC<TokenModalProps> = ({
  isOpen,
  onClose,
  token,
  tokenName,
  expiration
}) => {
  const { toast } = useToast();
  const [selectedExample, setSelectedExample] = useState<'curl' | 'k8s'>('curl');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied",
        description: "The content has been copied to your clipboard",
      });
    });
  };

  const curlExample = `curl \\
  -H "Authorization: Bearer ${token}" \\
  "https://acme.jfrog.io\\
  /artifactory/generic/<PACKAGE>"`;

  const k8sExample = `apiVersion: v1
kind: Secret
metadata:
  name: my-bearer-token
type: Opaque
stringData:
  token: ${token}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-blue-950/95 border border-blue-800/50 rounded-lg shadow-xl w-full max-w-md mx-4"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Token Generated</h2>
                <button
                  onClick={onClose}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/30">
                  <div className="flex items-center gap-2 text-yellow-400 mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">Warning</span>
                  </div>
                  <p className="text-blue-200 text-sm">
                    This token will only be shown once. Please copy it now before closing this window.
                  </p>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-blue-300">Token Name</label>
                    <p className="text-white font-medium">{tokenName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-blue-300">Expiration</label>
                    <p className="text-white font-medium">{expiration}</p>
                  </div>
                  <div>
                    <label className="text-sm text-blue-300">Token</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="flex-1 bg-blue-900/50 text-blue-100 p-2 rounded border border-blue-800/30 font-mono text-sm">
                        {token}
                      </code>
                      <button
                        onClick={() => copyToClipboard(token)}
                        className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                        title="Copy token"
                      >
                        <Copy className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm text-blue-300 mb-2 block">Usage Examples</label>
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => setSelectedExample('curl')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded ${
                          selectedExample === 'curl'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50'
                        }`}
                      >
                        <Terminal className="h-4 w-4" />
                        curl
                      </button>
                      <button
                        onClick={() => setSelectedExample('k8s')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded ${
                          selectedExample === 'k8s'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50'
                        }`}
                      >
                        <Cloud className="h-4 w-4" />
                        K8s Secret
                      </button>
                    </div>
                    <div className="relative">
                      <pre className="bg-blue-900/50 text-blue-100 p-3 rounded border border-blue-800/30 font-mono text-sm whitespace-pre-wrap">
                        {selectedExample === 'curl' ? curlExample : k8sExample}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(selectedExample === 'curl' ? curlExample : k8sExample)}
                        className="absolute top-2 right-2 p-1.5 text-blue-400 hover:text-blue-300 transition-colors bg-blue-900/80 rounded"
                        title="Copy example"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 