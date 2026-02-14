import { LoginForm, Link } from '@/components';
import Image from 'next/image';

export default function Page() {
  return (
    <div className='flex flex-col gap-4'>
      <header className='flex flex-col items-center text-center gap-5'>
        <Image src='/assets/images/logo.svg' width={173} height={36} alt='logo' />

        <div className='flex flex-col gap-2'>
          <h2 className='h3-bold md:h2-bold'>Log in to your account</h2>
          <p className='text-light-3 small-medium md:base-regular'>Welcome back! Please enter your details.</p>
        </div>
      </header>

      <div className='flex flex-col gap-7'>
        <LoginForm />

        <footer className='small-regular text-light-2 text-center'>
          Don&apos;t have an account already?{' '}
          <Link href='/signup' className='text-primary-500 small-semibold ms-1' prefetch keepSearchParams>
            Signup here
          </Link>
        </footer>
      </div>
    </div>
  );
}
