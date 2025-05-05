import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { useEffect, useState, useCallback } from "react";
import { RepositoryProvider } from "./contexts/RepositoryContext";
import { StatisticsProvider } from "./contexts/StatisticsContext";
import { ChatProvider } from "./contexts/ChatContext";
import GlobalStatisticsBar from "@/components/GlobalStatisticsBar";

// Import pages
import Auth from "./pages/Auth";
import AccountSetup from "./pages/AccountSetup";
import Home from "./pages/Home";
import Repositories from "./pages/Repositories";
import CIConfiguration from "./pages/CIConfiguration";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Create a custom event for chat reset
const CHAT_RESET_EVENT = 'resetAIChat';
const CHAT_OPEN_EVENT = 'openAIChat';

// Create a single instance of QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * MainLayout component that provides the application structure with navigation
 */
const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleHomeClick = useCallback(() => {
    console.log('App: Navigating to Home with global chat reset');
    if (window.resetAIChat) {
      window.resetAIChat();
    }
    navigate('/home', { replace: true });
  }, [navigate]);

  const handleNavigateFromCI = () => {
    console.log('Navigating from CI configuration page');
  };

  // Handle global chat functionality
  useEffect(() => {
    // Define global functions
    window.resetAIChat = () => {
      const event = new Event(CHAT_RESET_EVENT);
      window.dispatchEvent(event);
    };

    window.openAIChatWithQuery = (query: string) => {
      const event = new CustomEvent(CHAT_OPEN_EVENT, { detail: { query } });
      window.dispatchEvent(event);
      navigate('/home');
    };

    return () => {
      delete window.resetAIChat;
      delete window.openAIChatWithQuery;
    };
  }, [navigate]);

  return (
    <div className="flex h-screen space-gradient tech-grid">
      <NavBar 
        onHomeLinkClick={handleHomeClick} 
        onExpandChange={setSidebarExpanded} 
        onNavigateFromCI={handleNavigateFromCI}
      />
      <main 
        className={`flex-1 transition-all duration-300 overflow-auto ${
          sidebarExpanded ? 'ml-56' : 'ml-16'
        }`}
      >
        <GlobalStatisticsBar />
        <Outlet />
      </main>
    </div>
  );
};

/**
 * Protected routes configuration
 */
const protectedRoutes = [
  { path: '/home', element: <Home /> },
  { path: '/repositories', element: <Repositories /> },
  { path: '/ci-configuration', element: <CIConfiguration /> },
  { path: '/users', element: <Users /> },
  { path: '/profile', element: <Profile /> },
];

/**
 * Root App component that provides the application context and routing
 */
const App = () => {
  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add('dark');
    
    // Add transitions after a small delay to prevent initial transition
    const timer = setTimeout(() => {
      document.documentElement.classList.add('init-transitions');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RepositoryProvider>
            <StatisticsProvider>
              <ChatProvider>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Auth />} />
                  <Route path="/account-setup" element={<AccountSetup />} />
                  
                  {/* Protected routes with sidebar layout */}
                  <Route element={<MainLayout />}>
                    {protectedRoutes.map(({ path, element }) => (
                      <Route key={path} path={path} element={element} />
                    ))}
                  </Route>
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ChatProvider>
            </StatisticsProvider>
          </RepositoryProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
