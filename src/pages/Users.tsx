import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserPlus, UserCog, Calendar, Mail, Shield, Code, Check, X, Trash2 } from 'lucide-react';
import UserForm from '@/components/UserForm';
import { User } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const UsersPage: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      lastLoginDate: '2023-10-15T14:30:00Z',
      developerApp: true
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'Developer',
      lastLoginDate: '2023-10-14T09:15:00Z',
      developerApp: false
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      role: 'Developer',
      lastLoginDate: '2023-10-13T16:45:00Z',
      developerApp: true
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (userData: User) => {
    if (editingUser) {
      setUsers(users.map(user => user.id === userData.id ? userData : user));
      toast({
        title: "User updated",
        description: `${userData.firstName} ${userData.lastName}'s information has been updated.`
      });
    } else {
      const newUser = {
        ...userData,
        id: String(Date.now()),
        lastLoginDate: new Date().toISOString(),
        developerApp: false
      };
      setUsers([...users, newUser]);
      toast({
        title: "User added",
        description: `${newUser.firstName} ${newUser.lastName} has been added to the team.`
      });
    }
    setIsFormOpen(false);
  };

  const handleRoleChange = (userId: string, newRole: 'Admin' | 'Developer') => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    }));
    
    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: "Role updated",
        description: `${user.firstName} ${user.lastName}'s role has been updated to ${newRole}.`
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      toast({
        title: "User deleted",
        description: `${userToDelete.firstName} ${userToDelete.lastName} has been removed from JFrog.`,
        variant: "destructive"
      });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="animate-fadeIn max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <Button onClick={handleAddUser} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
        
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-muted/60">
                <TableHead className="text-foreground font-semibold">Name</TableHead>
                <TableHead className="text-foreground font-semibold">Email</TableHead>
                <TableHead className="text-foreground font-semibold">Role</TableHead>
                <TableHead className="text-foreground font-semibold">Last Login</TableHead>
                <TableHead className="text-foreground font-semibold">Developer App</TableHead>
                <TableHead className="text-foreground font-semibold w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-border hover:bg-muted/30">
                  <TableCell className="font-medium text-foreground">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value: 'Admin' | 'Developer') => handleRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <div className="flex items-center gap-2">
                          {user.role === 'Admin' ? (
                            <>
                              <Shield className="h-4 w-4 text-primary" />
                              <span className="font-medium text-primary">Admin</span>
                            </>
                          ) : (
                            <>
                              <Code className="h-4 w-4 text-indigo-400" />
                              <span className="font-medium text-indigo-400">Developer</span>
                            </>
                          )}
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <span>Admin</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Developer">
                          <div className="flex items-center gap-2">
                            <Code className="h-4 w-4 text-indigo-400" />
                            <span>Developer</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(user.lastLoginDate)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {user.developerApp ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 text-green-500">
                              <Check className="h-5 w-5" />
                              <span>Using</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">User is using developer app</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 text-red-500">
                              <X className="h-5 w-5" />
                              <span>Not using</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">User is not using developer app</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            onClick={() => handleDeleteClick(user)} 
                            variant="ghost" 
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-100/30"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Delete user</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {isFormOpen && (
        <UserForm 
          user={editingUser} 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              {userToDelete && (
                <>
                  This will permanently remove <span className="font-semibold">{userToDelete.firstName} {userToDelete.lastName}</span> from JFrog.
                  <br /><br />
                  This user will no longer be assigned and cannot use JFrog anymore.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteUser} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersPage;
