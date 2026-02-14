'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoginMutation } from '@/hooks';
import { loginSchema, LoginSchema } from '@/api';
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Link } from '@/components';

const defaultValues: LoginSchema = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const form = useForm<LoginSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  const loginMutation = useLoginMutation();

  const onSubmit: SubmitHandler<LoginSchema> = async data => {
    if (!form.formState.isValid || loginMutation.isPending) return;

    loginMutation.mutate(data, {
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
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <Button
            type='submit'
            className='shad-button_primary w-full'
            disabled={!form.formState.isValid || loginMutation.isSuccess}
            isLoading={loginMutation.isPending}
          >
            Login
          </Button>

          <Link
            href='/forgot-password'
            className='text-primary-500 small-semibold ms-1 self-end'
            prefetch
            keepSearchParams
          >
            Forgot your password?
          </Link>
        </div>
      </form>
    </Form>
  );
};
