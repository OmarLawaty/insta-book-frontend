import { Metadata } from 'next';

import { AuthHeader, Link, SignupForm } from '@/components';

export const metadata: Metadata = {
  title: 'Instabook | Signup',
  description: 'Signup to Instabook',
};

export default function Page() {
  return (
    <>
      <AuthHeader title='Create a new account' description='Welcome! Please enter your details.' />

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
