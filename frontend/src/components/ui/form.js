import React, {
  createContext,
  useContext,
  forwardRef,
  useId,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as LabelPrimitive from '@radix-ui/react-label';
import { FormProvider, Controller, useFormContext } from 'react-hook-form';

import { cn } from '../../lib/utils';          // Adjust path if needed
import { Label } from './label';               // Adjust path if needed

// FormProvider as <Form>
const Form = FormProvider;

// Contexts
const FormFieldContext = createContext(null);
const FormItemContext = createContext(null);

// <FormField>
function FormField({ name, ...props }) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller name={name} {...props} />
    </FormFieldContext.Provider>
  );
}

// useFormField() Hook
function useFormField() {
  const fieldCtx = useContext(FormFieldContext);
  const itemCtx = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldCtx) {
    throw new Error('useFormField must be used inside <FormField>');
  }

  const fieldState = getFieldState(fieldCtx.name, formState);
  const id = itemCtx?.id || useId();

  return {
    id,
    name: fieldCtx.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

// <FormItem>
const FormItem = forwardRef(({ className, ...props }, ref) => {
  const id = useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

// <FormLabel>
const FormLabel = forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={cn(error && 'text-destructive', className)}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

// <FormControl>
const FormControl = forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

// <FormDescription>
const FormDescription = forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

// <FormMessage>
const FormMessage = forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message) : children;

  if (!body) return null;

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

// Export all
export {
  Form,
  FormField,
  useFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};
