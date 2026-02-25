import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

import { ProfileHeader, ProfileNavigation } from '@/components';
import { useMeQuery } from '@/hooks';

export const metadata: Metadata = {
  title: 'InstaBook | Profile',
  description: `View your profile on Instabook`,
};

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  const [user] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: useMeQuery.queryKey(true),
      queryFn: useMeQuery.queryFn<true>,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='profile-container'>
        <ProfileHeader {...user} />

        <ProfileNavigation id={user.id} isMe />

        {children}
      </div>
    </HydrationBoundary>
  );
}
