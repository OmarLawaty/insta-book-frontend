import Image from 'next/image';

interface AuthHeaderProps {
  title: string;
  description: string;
}

export const AuthHeader = ({ title, description }: AuthHeaderProps) => (
  <header className='flex flex-col items-center text-center gap-5'>
    <Image src='/assets/images/logo.svg' width={173} height={36} alt='logo' />

    <div className='flex flex-col gap-2'>
      <h2 className='h3-bold md:h2-bold'>{title}</h2>
      <p className='text-light-3 small-medium md:base-regular'>{description}</p>
    </div>
  </header>
);
