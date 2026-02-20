import { Metadata } from 'next';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { PagePropsWithSearchParams } from '@/app/types';
import { SearchedPeople, SearchParamsInput } from '@/components';
import Image from 'next/image';
import { useUsersInfiniteQuery } from '@/hooks';

export const metadata: Metadata = {
  title: 'Instabook | People',
  description: 'Find people on Instabook',
};

type PageProps = PagePropsWithSearchParams<{ search?: string }>;

export default async function Page({ searchParams }: PageProps) {
  const search = (await searchParams).search;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery({ ...useUsersInfiniteQuery, queryKey: useUsersInfiniteQuery.queryKey(search) }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='explore-container'>
        <div className='explore-inner_container'>
          <h2 className='h3-bold md:h2-bold w-full'>Search People</h2>
          <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
            <Image src='/assets/icons/search.svg' width={24} height={24} alt='search' />

            <SearchParamsInput type='text' placeholder='Search' className='explore-search' paramKey='search' />
          </div>
        </div>

        <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
          <h3 className='body-bold md:h3-bold'>Popular People</h3>

          <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
            <p className='small-medium md:base-medium text-light-2'>All</p>
            <Image src='/assets/icons/filter.svg' width={20} height={20} alt='filter' />
          </div>
        </div>

        <SearchedPeople />
      </div>
    </HydrationBoundary>
  );
}
