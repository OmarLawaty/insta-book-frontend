import { Metadata } from 'next';

import { PostDetails } from '@/components';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { useMeQuery, usePostQuery } from '@/hooks';
import { PagePropsWithParams } from '@/app/types';
import { notFound } from 'next/navigation';
import { getCombinedUserName } from '@/helpers';

type PostPageProps = PagePropsWithParams<{ ID: number }>;

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const id = (await params).ID;

  const queryClient = new QueryClient();

  const post = await queryClient.fetchQuery({
    queryKey: usePostQuery.queryKey(id),
    queryFn: usePostQuery.queryFn,
  });

  return {
    title: `InstaBook | ${post.caption.length > 10 ? post.caption.substring(0, 10) + '...' : post.caption}`,
    description: `View details of ${getCombinedUserName(post.creator.firstName, post.creator.lastName)}'s post on Instabook`,
  };
}

export default async function Page({ params }: PostPageProps) {
  const id = (await params).ID;

  const queryClient = new QueryClient();

  const [post] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: usePostQuery.queryKey(id),
      queryFn: usePostQuery.queryFn,
    }),
    queryClient.prefetchQuery(useMeQuery),
  ]);

  if (!post) return notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='post_details-container'>
        <PostDetails id={id} />
      </div>
    </HydrationBoundary>
  );
}
