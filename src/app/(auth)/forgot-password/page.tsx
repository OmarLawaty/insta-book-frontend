import { Metadata } from 'next';

import { AuthHeader, ForgotPasswordForm } from '@/components';

export const metadata: Metadata = {
  title: 'Instabook | Forgot Password',
  description: 'Forgot password for Instabook',
};

export default function Page() {
  return (
    <>
      <AuthHeader title='Forgot Password' description='Enter your email and new password.' />

      <ForgotPasswordForm />
    </>
  );
}
