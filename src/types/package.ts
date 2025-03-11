
export interface Package {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  vulnerabilities: number;
  downloads: number;
  size: number; // in bytes
}

export const packageTypeColors: Record<string, string> = {
  npm: 'bg-red-500',
  docker: 'bg-blue-500',
  python: 'bg-green-500',
  maven: 'bg-orange-500',
  nuget: 'bg-purple-500',
  debian: 'bg-yellow-500',
  rpm: 'bg-pink-500',
  default: 'bg-gray-500'
};
