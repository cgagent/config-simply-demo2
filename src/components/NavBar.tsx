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
  BellIcon
} from 'lucide-react';

interface NavBarProps {
  className?: string;
  onHomeLinkClick?: () => void;
  onExpandChange?: (expanded: boolean) => void;
  onNavigateFromCI?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ className, onHomeLinkClick, onExpandChange, onNavigateFromCI }) => {
  const [expanded, setExpanded] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
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
    setHasNotifications(!hasNotifications);
    console.log('Notification clicked');
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
        <button 
          onClick={handleNotificationClick}
          className="flex items-center justify-center w-full px-3 py-2 rounded-md text-sm font-medium  text-blue-100/80 hover:bg-blue-800/30 hover:text-white"
        >
          <div className="relative">
            <BellIcon className="w-5 h-5" />
           
          </div>
          {expanded && <span className="ml-3">Notifications</span>}
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none w-full px-2 py-2 rounded-md hover:bg-blue-800/30">
            <Avatar className="h-8 w-8 border-2 border-blue-500/30 ring-2 ring-blue-400/20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {expanded && (
              <div className="text-left">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-blue-200/80">Admin</p>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 space-card">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite Friends</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Download className="mr-2 h-4 w-4" />
              <span>Download Desktop App</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavBar;
