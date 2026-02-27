import { Metadata } from 'next';

import { LoginForm, Link, AuthHeader } from '@/components';

export const metadata: Metadata = {
  title: 'Instabook | Login',
  description: 'Login to Instabook',
};

export default function Page() {
  return (
    <>
      <AuthHeader title='Log in to your account' description='Welcome back! Please enter your details.' />

      <div className='flex flex-col gap-7'>
        <LoginForm />

        <footer className='small-regular text-light-2 text-center'>
          Don&apos;t have an account already?
          <Link href='/signup' className='text-primary-500 small-semibold ms-1' prefetch keepSearchParams>
            Signup here
          </Link>
        </footer>
      </div>
    </>
  );
}
