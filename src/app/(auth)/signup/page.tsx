import Image from 'next/image';
import { Metadata } from 'next';

import { Link, SignupForm } from '@/components';

export const metadata: Metadata = {
  title: 'Instabook | Signup',
  description: 'Signup to Instabook',
};

export default function Page() {
  return (
    <>
      <header className='flex flex-col items-center text-center gap-5'>
        <Image src='/assets/images/logo.svg' width={173} height={36} alt='logo' />

        <div className='flex flex-col gap-2'>
          <h2 className='h3-bold md:h2-bold'>Create a new account</h2>
          <p className='text-light-3 small-medium md:base-regular'>Welcome! Please enter your details.</p>
        </div>
      </header>

      <div className='flex flex-col gap-7'>
        <SignupForm />

        <footer className='small-regular text-light-2 text-center'>
          Already have an account?
          <Link href='/login' className='text-primary-500 small-semibold ms-1' prefetch keepSearchParams>
            Login here
          </Link>
        </footer>
      </div>
    </>
  );
}
