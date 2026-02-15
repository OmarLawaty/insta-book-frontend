'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useVerifyOTPMutation, useCounter, useResendOTPMutation } from '@/hooks';
import { verifyOTPSchema, VerifyOTPSchema } from '@/api';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { getSearchParams } from '@/helpers';
import { useRouter } from 'next/navigation';

const defaultValues: VerifyOTPSchema = {
  otp: '',
};

export const VerifyOTPForm = () => {
  const form = useForm<VerifyOTPSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(verifyOTPSchema),
  });
  const router = useRouter();

  const verifyOTPMutation = useVerifyOTPMutation();
  const resendOTPMutation = useResendOTPMutation();
  const searchParams = getSearchParams();

  const resendCounter = useCounter({
    duration: 30,
    onComplete: () => {
      resendOTPMutation.reset();
    },
  });

  const onSubmit: SubmitHandler<VerifyOTPSchema> = async data => {
    if (!form.formState.isValid || verifyOTPMutation.isPending) return;

    const authId = searchParams.get('authId');
    if (!authId) {
      form.setError('otp', {
        type: 'custom',
        message: 'Auth ID is missing in the URL',
      });
      return;
    }

    verifyOTPMutation.mutate(
      { ...data, authId },
      {
        onSuccess: () => {
          router.push('/login');
        },
        onError: error => {
          if (error.response?.status === 400)
            form.setError('otp', {
              type: 'custom',
              message: error.response?.data.message,
            });
          if (error.response?.status === 404)
            form.setError('otp', {
              type: 'custom',
              message: error.response?.data.message,
            });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit, console.warn)}>
        <div className='flex flex-col gap-5'>
          <FormField
            name='otp'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-5' {...field}>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    inputMode='numeric'
                    pattern={REGEXP_ONLY_DIGITS}
                    containerClassName='flex justify-center w-full'
                    {...field}
                  >
                    <InputOTPGroup className='text-lg flex-1'>
                      <InputOTPSlot className='flex-1 h-12 text-xl' index={0} />
                      <InputOTPSlot className='flex-1 h-12 text-xl' index={1} />
                      <InputOTPSlot className='flex-1 h-12 text-xl' index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className='flex-1'>
                      <InputOTPSlot className='flex-1 h-12 text-xl' index={3} />
                      <InputOTPSlot className='flex-1 h-12 text-xl' index={4} />
                      <InputOTPSlot className='flex-1 h-12 text-xl' index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <div className='flex justify-between'>
                  <FormMessage />

                  <Button
                    variant='link'
                    type='button'
                    className='text-primary-500 small-semibold ms-auto self-end p-0 h-auto'
                    disabled={resendCounter.isActive}
                    onClick={() => {
                      resendCounter.start();

                      const authId = searchParams.get('authId');
                      if (!authId)
                        return form.setError('otp', {
                          type: 'custom',
                          message: 'Auth ID is missing in the URL',
                        });
                      resendOTPMutation.mutate(
                        { authId },
                        {
                          onError: err => {
                            if (err.response?.status === 400)
                              form.setError('otp', {
                                type: 'custom',
                                message: err.response?.data.message,
                              });
                            if (err.response?.status === 404)
                              form.setError('otp', {
                                type: 'custom',
                                message: err.response?.data.message,
                              });
                          },
                        },
                      );
                    }}
                  >
                    {resendCounter.isActive ? `Resend OTP (${resendCounter.count}s)` : 'Resend OTP'}
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          className='shad-button_primary w-full'
          disabled={!form.formState.isValid || verifyOTPMutation.isSuccess}
          isLoading={verifyOTPMutation.isPending}
        >
          Verify OTP
        </Button>
      </form>
    </Form>
  );
};
