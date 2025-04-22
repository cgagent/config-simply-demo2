import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Download, 
  UserCircle, 
  UserPlus, 
  ChevronLeft, 
  ChevronRight,
  Home,
  Infinity,
  Cog,
  Users,
  BellIcon,
  MessageSquare,
  PackageX,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'package_blocked';
  packageName: string;
  version: string;
  reason: string;
  timestamp: string;
}

interface NavBarProps {
  className?: string;
  onHomeLinkClick?: () => void;
  onExpandChange?: (expanded: boolean) => void;
  onNavigateFromCI?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ className, onHomeLinkClick, onExpandChange, onNavigateFromCI }) => {
  const [expanded, setExpanded] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'package_blocked',
      packageName: 'malicious-package',
      version: '1.2.3',
      reason: 'Security vulnerability detected',
      timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    },
    {
      id: '2',
      type: 'package_blocked',
      packageName: 'suspicious-dependency',
      version: '0.5.1',
      reason: 'Potential malware detected',
      timestamp: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
    }
  ]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(expanded);
    }
  }, [expanded, onExpandChange]);

  const navItems = [
    { name: 'Home', path: '/home', icon: <Home className="w-5 h-5" /> },
    { name: 'CI', path: '/repositories', icon: <Cog className="w-5 h-5" /> },
    { name: 'User Management', path: '/users', icon: <Users className="w-5 h-5" /> },
  ];

  const handleNavClick = (path: string) => {
    if (path === '/home') {
      if (location.pathname === '/home') {
        navigate('/home', { state: { resetChat: true }, replace: true });
      } else {
        navigate('/home');
      }
      
      if (onHomeLinkClick) {
        onHomeLinkClick();
      }
    } else if (path === '/repositories' && location.pathname === '/ci-configuration') {
      if (onNavigateFromCI) {
        onNavigateFromCI();
      }
      navigate(path);
    } else {
      navigate(path);
    }
  };
  
  const handleNotificationClick = () => {
    setHasUnreadNotifications(false);
  };
  
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={cn(
      "h-screen fixed left-0 top-0 z-50 flex flex-col py-4 border-r shadow-lg transition-all duration-300",
      "bg-gradient-to-b from-blue-950 via-blue-900/90 to-gray-950",
      "border-blue-800/30",
      expanded ? "w-56" : "w-16",
      className
    )}>
      <div className="flex items-center justify-between px-4 mb-6">
        {expanded && (
          <span className="text-lg font-semibold text-blue-100 space-glow">
            Dashboard
          </span>
        )}
        <button 
          onClick={handleToggleExpand} 
          className="p-1.5 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 transition-colors backdrop-blur-md"
        >
          {expanded ? 
            <ChevronLeft className="h-5 w-5" /> : 
            <ChevronRight className="h-5 w-5" />
          }
        </button>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path || 
              (item.path === '/repositories' && location.pathname === '/ci-configuration');
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => handleNavClick(item.path)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full text-left",
                    active 
                      ? "bg-blue-600/30 text-white space-glow backdrop-blur-sm border border-blue-400/20" 
                      : "text-blue-100/80 hover:bg-blue-800/30 hover:text-white"
                  )}
                >
                  <span>{item.icon}</span>
                  {expanded && <span>{item.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="mt-auto px-2 space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger 
            onClick={handleNotificationClick}
            className="flex items-center justify-center w-full px-3 py-2 rounded-md text-sm font-medium text-blue-100/80 hover:bg-blue-800/30 hover:text-white"
          >
            <div className="relative">
              <BellIcon className="w-5 h-5" />
              {hasUnreadNotifications && (
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-blue-900/50" />
              )}
            </div>
            {expanded && <span className="ml-3">Notifications</span>}
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-80 bg-blue-950/95 border-blue-800/30 backdrop-blur-md"
            align="end"
          >
            <DropdownMenuLabel className="text-blue-100">Recent Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-blue-800/30" />
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-blue-200/70 text-sm">
                No new notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id}
                  className="flex flex-col items-start gap-1 p-3 hover:bg-blue-800/30 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <PackageX className="h-4 w-4 text-red-400" />
                    <span className="text-blue-100 font-medium">
                      Package Blocked
                    </span>
                  </div>
                  <div className="text-blue-200/80 text-sm">
                    {notification.packageName}@{notification.version}
                  </div>
                  <div className="text-blue-200/60 text-xs">
                    {notification.reason}
                  </div>
                  <div className="flex items-center gap-1 text-blue-200/50 text-xs mt-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none w-full px-2 py-2 rounded-md hover:bg-blue-800/30">
            <Avatar className="h-8 w-8 border-2 border-blue-500/30 ring-2 ring-blue-400/20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {expanded && <span className="text-blue-100/80">Profile</span>}
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-56 bg-blue-950/95 border-blue-800/30 backdrop-blur-md"
            align="end"
          >
            <DropdownMenuLabel className="text-blue-100">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-blue-800/30" />
            <DropdownMenuItem className="text-blue-100/80 hover:bg-blue-800/30">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-blue-100/80 hover:bg-blue-800/30">
              <Download className="mr-2 h-4 w-4" />
              <span>Download</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavBar;
