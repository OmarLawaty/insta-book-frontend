'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components';
import { Input } from '@/components';
import { cn } from '@/lib/utils';

export const PasswordInput = ({ className, ...props }: React.ComponentProps<'input'>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <Input
        id='password-toggle'
        {...props}
        type={showPassword ? 'text' : 'password'}
        className={cn('w-full', className)}
      />
      <Button
        className='absolute top-0 h-full px-3 hover:bg-transparent'
        style={{ position: 'absolute', insetInlineEnd: 0 }}
        onClick={() => setShowPassword(!showPassword)}
        size='icon'
        type='button'
        variant='ghost'
      >
        {showPassword ? (
          <EyeOff className='h-4 w-4 text-muted-foreground' />
        ) : (
          <Eye className='h-4 w-4 text-muted-foreground' />
        )}
      </Button>
    </div>
  );
};
