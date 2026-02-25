import { QueryClient } from '@tanstack/react-query';
import { useUserQuery } from '@/hooks';
import { PagePropsWithParams } from '@/app/types';
import { LikedPosts } from '@/components';

type PostPageProps = PagePropsWithParams<{ ID: number }>;

export default async function Page({ params }: PostPageProps) {
  const id = (await params).ID;

  const queryClient = new QueryClient();

  const [user] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: useUserQuery.queryKey(id),
      queryFn: useUserQuery.queryFn,
    }),
  ]);

  return <LikedPosts posts={user.liked} />;
}
