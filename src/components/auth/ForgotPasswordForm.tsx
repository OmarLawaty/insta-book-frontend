'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForgotPasswordMutation } from '@/hooks';
import { forgotPasswordSchema, ForgotPasswordSchema } from '@/api';
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components';
import { useRouter } from 'next/navigation';

const defaultValues: ForgotPasswordSchema = {
  email: '',
  password: '',
};

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  });
  const router = useRouter();

  const forgotPasswordMutation = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = async data => {
    if (!form.formState.isValid || forgotPasswordMutation.isPending) return;

    forgotPasswordMutation.mutate(data, {
      onSuccess: ({ authId }) => router.push(`/verify-otp?authId=${authId}`),
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
                <FormLabel className='shad-form_label'>New Password</FormLabel>

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

        <Button
          type='submit'
          className='shad-button_primary w-full'
          disabled={!form.formState.isValid || forgotPasswordMutation.isSuccess}
          isLoading={forgotPasswordMutation.isPending}
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
