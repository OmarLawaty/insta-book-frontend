import { Post } from '@/api';
import { GridPost } from './GridPost';

interface PostsProps {
  posts: Post[];
}

export const Posts = ({ posts }: PostsProps) => (
  <div className='flex flex-col gap-12 w-full max-w-5xl flex-1'>
    <ul className='grid-container h-min'>
      {posts.map(post => (
        <GridPost key={post.id} post={post} showUser showLike={false} showSave={false} />
      ))}
    </ul>

    {posts.length === 0 && <p className='text-light-4 text-center w-full m-auto'>No posts to show</p>}
  </div>
);
