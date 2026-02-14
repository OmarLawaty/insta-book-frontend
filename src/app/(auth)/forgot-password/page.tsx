import Image from 'next/image';
import { Metadata } from 'next';

import { ForgotPasswordForm } from '@/components';

export const metadata: Metadata = {
  title: 'Instabook | Forgot Password',
  description: 'Forgot password for Instabook',
};

export default function Page() {
  return (
    <>
      <header className='flex flex-col items-center text-center gap-5'>
        <Image src='/assets/images/logo.svg' width={173} height={36} alt='logo' />

        <div className='flex flex-col gap-2'>
          <h2 className='h3-bold md:h2-bold'>Forgot Password</h2>
          <p className='text-light-3 small-medium md:base-regular'>Enter your email and new password.</p>
        </div>
      </header>

      <ForgotPasswordForm />
    </>
  );
}
