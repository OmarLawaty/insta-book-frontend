import { Metadata } from 'next';

import Image from 'next/image';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { useMeQuery } from '@/hooks';
import { ProfileForm } from '@/components/users/ProfileForm';

export const metadata: Metadata = {
  title: 'Instabook | Edit Profile',
  description: 'Edit your profile on Instabook',
};

export default async function Page() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useMeQuery.queryKey(true),
      queryFn: useMeQuery.queryFn,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='common-container'>
        <div className='flex-start gap-3 justify-start w-full max-w-5xl'>
          <Image src='/assets/icons/edit.svg' width={36} height={36} alt='edit' className='invert-white' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Profile</h2>
        </div>

        <ProfileForm />
      </div>
    </HydrationBoundary>
  );
}
