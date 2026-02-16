import { Metadata } from 'next';
import Image from 'next/image';

import { PostForm } from '@/components';

export const metadata: Metadata = {
  title: 'Instabook | Create Post',
  description: 'Create a new post on Instabook',
};

export default function Page() {
  return (
    <>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <Image src='/assets/icons/add-post.svg' width={36} height={36} alt='add' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>

        <PostForm type='create' />
      </div>
    </>
  );
}
