import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { RepositoryProvider, useRepositories } from "./contexts/RepositoryContext";

// Import pages
import Auth from "./pages/Auth";
import AccountSetup from "./pages/AccountSetup";
import Home from "./pages/Home";
import Repositories from "./pages/Repositories";
import CIConfiguration from "./pages/CIConfiguration";
import CISetupChat from "./pages/CISetupChat";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

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
  const { repositories, updateRepositoryStatus } = useRepositories();

  const handleHomeClick = () => {
    if (location.pathname === '/home') {
      navigate('/home', { state: { resetChat: true }, replace: true });
    }
  };

  const handleNavigateFromCI = () => {
    const currentRepo = repositories.find(repo => repo.name === 'infrastructure');
    if (currentRepo) {
      updateRepositoryStatus('infrastructure', 'npm');
    }
  };

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
  { path: '/ci-setup-chat', element: <CISetupChat /> },
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
        <RepositoryProvider>
          <BrowserRouter>
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
          </BrowserRouter>
        </RepositoryProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
