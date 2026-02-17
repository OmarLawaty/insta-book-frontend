import { Metadata } from 'next';

import { PostForm } from '@/components';
import Image from 'next/image';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { useMeQuery, usePostQuery } from '@/hooks';
import { PagePropsWithParams } from '@/app/types';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Instabook | Edit Post',
  description: 'Edit your posts on Instabook',
};

type PostPageProps = PagePropsWithParams<{ ID: number }>;

export default async function Page({ params }: PostPageProps) {
  const id = (await params).ID;

  const queryClient = new QueryClient();

  const [post, me] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: usePostQuery.queryKey(id),
      queryFn: usePostQuery.queryFn,
    }),
    queryClient.fetchQuery(useMeQuery),
  ]);

  if (!post || me.id !== post.creator.id) return notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='common-container'>
        <div className='flex-start gap-3 justify-start w-full max-w-5xl'>
          <Image src='/assets/icons/edit.svg' width={36} height={36} alt='edit' className='invert-white' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>

        <PostForm type='update' post={post} />
      </div>
    </HydrationBoundary>
  );
}
