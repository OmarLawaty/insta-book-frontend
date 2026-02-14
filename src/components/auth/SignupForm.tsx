'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSignupMutation } from '@/hooks';
import { signupSchema, SignupSchema } from '@/api';
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components';

const defaultValues: SignupSchema = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  birthday: '',
};

export const SignupForm = () => {
  const form = useForm<SignupSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  });
  const signupMutation = useSignupMutation();

  const onSubmit: SubmitHandler<SignupSchema> = async data => {
    if (!form.formState.isValid || signupMutation.isPending) return;

    signupMutation.mutate(data, {
      onError: error => {
        if (error.response?.status === 400)
          form.setError('password', {
            type: 'custom',
            message: error.response?.data.message,
          });
        if (error.response?.status === 404)
          form.setError('email', {
            type: 'custom',
            message: error.response?.data.message,
          });
      },
    });
  };

  return (
    <Form {...form}>
      <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit, console.warn)}>
        <div className='flex flex-col gap-5'>
          <FormField
            name='firstName'
            control={form.control}
            render={({ field }) => (
              <FormItem {...field}>
                <FormLabel className='shad-form_label'>First Name</FormLabel>

                <FormControl>
                  <Input type='text' autoComplete='given-name' placeholder='John' className='shad-input' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='lastName'
            control={form.control}
            render={({ field }) => (
              <FormItem {...field}>
                <FormLabel className='shad-form_label'>Last Name</FormLabel>

                <FormControl>
                  <Input type='text' autoComplete='family-name' placeholder='Doe' className='shad-input' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem {...field}>
                <FormLabel className='shad-form_label'>Email</FormLabel>

                <FormControl>
                  <Input
                    type='email'
                    autoComplete='email'
                    placeholder='you@example.com'
                    className='shad-input'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem {...field}>
                <FormLabel className='shad-form_label'>Password</FormLabel>

                <FormControl>
                  <Input
                    type='password'
                    autoComplete='new-password'
                    placeholder='********'
                    className='shad-input'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='birthday'
            control={form.control}
            render={({ field }) => (
              <FormItem {...field}>
                <FormLabel className='shad-form_label'>Birthday</FormLabel>

                <FormControl>
                  <Input
                    type='date'
                    autoComplete='bday'
                    placeholder='Select your birthday'
                    className='shad-input'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          className='shad-button_primary'
          disabled={!form.formState.isValid || signupMutation.isSuccess}
          isLoading={signupMutation.isPending}
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
