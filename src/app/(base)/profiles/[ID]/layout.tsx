import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';

import { ProfileHeader, ProfileNavigation } from '@/components';
import { useUserQuery } from '@/hooks';
import { PagePropsWithParams } from '@/app/types';
import { getCombinedUserName } from '@/helpers';

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const id = (await params).ID as unknown as number;
  if (typeof Number(id) !== 'number') return notFound();

  const queryClient = new QueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: useUserQuery.queryKey(id),
    queryFn: useUserQuery.queryFn,
  });

  const username = getCombinedUserName(user.firstName, user.lastName);
  return {
    title: `InstaBook | ${username.length > 10 ? username.substring(0, 10) + '...' : username}`,
    description: `View details of ${username}'s profile on Instabook`,
  };
}

type PostPageProps = PagePropsWithParams<{ ID: string }>;

export default async function Layout({ children, params }: Readonly<{ children: React.ReactNode } & PostPageProps>) {
  const id = (await params).ID as unknown as number;

  if (typeof Number(id) !== 'number') return notFound();

  const queryClient = new QueryClient();

  const [user] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: useUserQuery.queryKey(id),
      queryFn: useUserQuery.queryFn,
    }),
  ]);

  if (user.isMe) return redirect('/profile');
  if (!user) return notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='profile-container'>
        <ProfileHeader {...user} />

        <ProfileNavigation id={id} />

        {children}
      </div>
    </HydrationBoundary>
  );
}
