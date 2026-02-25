import { QueryClient } from '@tanstack/react-query';
import { useMeQuery } from '@/hooks';
import { LikedPosts } from '@/components';

export default async function Page() {
  const queryClient = new QueryClient();

  const [user] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: useMeQuery.queryKey(true),
      queryFn: useMeQuery.queryFn<true>,
    }),
  ]);

  return <LikedPosts posts={user.liked} />;
}
