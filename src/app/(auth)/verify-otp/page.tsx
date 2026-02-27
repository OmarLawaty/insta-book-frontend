import { Metadata } from 'next';

import { AuthHeader, VerifyOTPForm } from '@/components';

export const metadata: Metadata = {
  title: 'Instabook | Verify OTP',
  description: 'Verify OTP for Instabook',
};

export default function Page() {
  return (
    <>
      <AuthHeader title='Verify OTP' description='Please enter the OTP sent to your email.' />

      <VerifyOTPForm />
    </>
  );
}
