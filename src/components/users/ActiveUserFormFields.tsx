
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { ActiveUserFormValues } from './schemas/userFormSchemas';

interface ActiveUserFormFieldsProps {
  form: UseFormReturn<ActiveUserFormValues>;
}

const ActiveUserFormFields: React.FC<ActiveUserFormFieldsProps> = ({ form }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="developerApp"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Developer App Status</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value ? "true" : "false"}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="using" />
                  <FormLabel htmlFor="using" className="cursor-pointer">Using</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="not-using" />
                  <FormLabel htmlFor="not-using" className="cursor-pointer">Not Using</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ActiveUserFormFields;
