import Image from 'next/image';
import { Metadata } from 'next';

import { VerifyOTPForm } from '@/components';

export const metadata: Metadata = {
  title: 'Instabook | Verify OTP',
  description: 'Verify OTP for Instabook',
};

export default function Page() {
  return (
    <>
      <header className='flex flex-col items-center text-center gap-5'>
        <Image src='/assets/images/logo.svg' width={173} height={36} alt='logo' />

        <div className='flex flex-col gap-2'>
          <h2 className='h3-bold md:h2-bold'>Verify OTP</h2>
          <p className='text-light-3 small-medium md:base-regular'>Please enter the OTP sent to your email.</p>
        </div>
      </header>

      <VerifyOTPForm />
    </>
  );
}
