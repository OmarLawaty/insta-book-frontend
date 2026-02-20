import Image from 'next/image';

import { getCombinedUserName } from '@/helpers';
import { Post } from '@/api';
import { Link } from '../Link';
import { LikePostButton } from '../LikePostButton';
import { SavePostButton } from '../SavePostButton';

type GridPostProps = {
  post: Post;
  showUser?: boolean;
  showLike?: boolean;
  showSave?: boolean;
  onStatusChange?: (post: Post) => void;
};

export const GridPost = ({
  post,
  showUser = true,
  showLike = true,
  showSave = true,
  onStatusChange,
}: GridPostProps) => (
  <li key={post.id} className='relative min-w-80 h-80'>
    <Link href={`/posts/${post.id}`} className='grid-post_link'>
      <Image
        src={post.image.url}
        alt='post'
        className='h-full w-full object-cover'
        width={500}
        height={500}
        preload
        loading='eager'
      />
    </Link>

    <div className='grid-post_user'>
      {showUser && (
        <div className='flex items-center justify-start gap-2 flex-1'>
          <Image
            src={post.creator.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='creator'
            className='w-8 h-8 rounded-full'
            width={32}
            height={32}
          />

          <p className='line-clamp-1'>{getCombinedUserName(post.creator.firstName, post.creator.lastName)}</p>
        </div>
      )}

      {(showLike || showSave) && (
        <div className='flex justify-between items-center gap-2 z-20'>
          {showLike && <LikePostButton onLikeStatusChange={() => onStatusChange?.(post)} {...post} />}

          {showSave && (
            <SavePostButton postId={post.id} saved={post.isSaved} onSaveStatusChange={() => onStatusChange?.(post)} />
          )}
        </div>
      )}
    </div>
  </li>
);
