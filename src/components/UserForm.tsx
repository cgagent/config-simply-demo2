
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/types/user';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { 
  activeUserSchema, 
  pendingUserSchema,
  ActiveUserFormValues,
  PendingUserFormValues
} from '@/components/users/schemas/userFormSchemas';
import CommonUserFormFields from '@/components/users/CommonUserFormFields';
import ActiveUserFormFields from '@/components/users/ActiveUserFormFields';

interface UserFormProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, isOpen, onClose, onSubmit }) => {
  const isActiveUser = user && (user.status === 'active' || (user.firstName && user.lastName));
  
  const activeUserForm = useForm<ActiveUserFormValues>({
    resolver: zodResolver(activeUserSchema),
    defaultValues: isActiveUser ? {
      ...user,
      status: 'active'
    } : undefined,
  });

  const pendingUserForm = useForm<PendingUserFormValues>({
    resolver: zodResolver(pendingUserSchema),
    defaultValues: !isActiveUser && user ? {
      ...user,
      status: 'pending'
    } : {
      email: '',
      role: 'Developer',
      status: 'pending',
    },
  });

  const form = isActiveUser ? activeUserForm : pendingUserForm;

  const handleSubmit = (values: ActiveUserFormValues | PendingUserFormValues) => {
    if (isActiveUser) {
      const activeValues = values as ActiveUserFormValues;
      onSubmit({
        id: activeValues.id || String(Date.now()),
        firstName: activeValues.firstName,
        lastName: activeValues.lastName,
        email: activeValues.email,
        role: activeValues.role,
        lastLoginDate: activeValues.lastLoginDate || new Date().toISOString(),
        developerApp: activeValues.developerApp,
        status: 'active',
      });
    } else {
      const pendingValues = values as PendingUserFormValues;
      onSubmit({
        id: pendingValues.id || String(Date.now()),
        firstName: '',
        lastName: '',
        email: pendingValues.email,
        role: pendingValues.role,
        lastLoginDate: new Date().toISOString(),
        developerApp: false,
        status: 'pending',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isActiveUser ? `Edit ${user?.firstName} ${user?.lastName}` : 'Invite New User'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            {isActiveUser && <ActiveUserFormFields form={activeUserForm} />}
            <CommonUserFormFields form={form} />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isActiveUser ? 'Update User' : 'Invite User'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
