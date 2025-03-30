
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, UserCircle, Mail, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/use-toast";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  // In a real app, this would come from authentication context
  // For now we'll use hardcoded data matching the NavBar user
  const [user, setUser] = useState({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    lastLoginDate: new Date().toISOString(),
    developerApp: true
  });

  const [editValues, setEditValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: 'https://github.com/shadcn.png'
  });

  // Avatar options - in a real app these would be from a proper source
  const avatarOptions = [
    { id: 'avatar1', url: 'https://github.com/shadcn.png', label: 'Default' },
    { id: 'avatar2', url: 'https://i.pravatar.cc/150?img=1', label: 'Avatar 1' },
    { id: 'avatar3', url: 'https://i.pravatar.cc/150?img=2', label: 'Avatar 2' },
    { id: 'avatar4', url: 'https://i.pravatar.cc/150?img=3', label: 'Avatar 3' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarSelect = (url: string) => {
    setEditValues(prev => ({
      ...prev,
      avatarUrl: url
    }));
    
    // Apply avatar change immediately
    handleSave();
  };

  const handleSave = () => {
    if (!editValues.firstName || !editValues.lastName) {
      toast({
        title: "Error",
        description: "First name and last name are required.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would be an API call
    setUser(prev => ({
      ...prev,
      firstName: editValues.firstName,
      lastName: editValues.lastName,
    }));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };

  // Auto-save when user stops typing
  const handleBlur = () => {
    handleSave();
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        <Card className="border border-blue-200/20 bg-gradient-to-b from-blue-950/50 to-gray-950/80 shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="relative group">
              <Avatar className="h-16 w-16 border-2 border-blue-500/30 ring-4 ring-blue-400/10 cursor-pointer">
                <AvatarImage src={editValues.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback className="text-lg">
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <UserCircle className="h-4 w-4 text-white" />
              </div>
              
              {/* Avatar selector popup */}
              <div className="absolute top-full left-0 mt-2 hidden group-hover:flex flex-wrap gap-3 bg-gray-900/90 p-3 rounded-lg border border-blue-500/20 backdrop-blur-md z-10 w-64">
                <p className="w-full text-sm text-blue-300 mb-1">Select Avatar</p>
                {avatarOptions.map(avatar => (
                  <div 
                    key={avatar.id}
                    className={`cursor-pointer p-1 rounded-full ${editValues.avatarUrl === avatar.url ? 'bg-blue-500 ring-2 ring-blue-300' : 'bg-transparent hover:bg-blue-900/30'}`}
                    onClick={() => handleAvatarSelect(avatar.url)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={avatar.url} alt={avatar.label} />
                      <AvatarFallback>{avatar.label[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                <Input
                  name="firstName"
                  value={editValues.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="bg-transparent border-none p-0 text-2xl font-bold text-white focus-visible:ring-0 w-auto inline-block mr-2"
                  placeholder="First Name"
                />
                <Input
                  name="lastName"
                  value={editValues.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="bg-transparent border-none p-0 text-2xl font-bold text-white focus-visible:ring-0 w-auto inline-block"
                  placeholder="Last Name"
                />
              </CardTitle>
              <CardDescription className="text-blue-300/80">
                {user.role}
              </CardDescription>
            </div>
          </CardHeader>
          
          <Separator className="bg-blue-500/20" />
          
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/30 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-blue-300/60">Email Address</p>
                  <p className="text-white font-medium">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/30 p-2 rounded-full">
                  <UserCircle className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-blue-300/60">Role</p>
                  <p className="text-white font-medium">{user.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/30 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-blue-300/60">Last Login</p>
                  <p className="text-white font-medium">{formatDate(user.lastLoginDate)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/30 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-blue-300/60">Developer App</p>
                  <p className="text-white font-medium">{user.developerApp ? 'Using' : 'Not Using'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
