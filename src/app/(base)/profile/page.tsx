import { QueryClient } from '@tanstack/react-query';
import { useMeQuery } from '@/hooks';
import { Posts } from '@/components';

export default async function Page() {
  const queryClient = new QueryClient();

  const [user] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: useMeQuery.queryKey(true),
      queryFn: useMeQuery.queryFn<true>,
    }),
  ]);

  return <Posts posts={user.posts} />;
}
