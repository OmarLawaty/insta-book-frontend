import { cn } from '@/lib/utils';
import { Button as ShadCNButton } from './ui/button';
import { ButtonHTMLAttributes } from 'react';
import { Spinner } from './ui';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({ children, isLoading, isDisabled, className, icon, ...props }: ButtonProps) => {
  if (isLoading)
    return (
      <ShadCNButton className={cn('opacity-80 cursor-not-allowed', className)} disabled {...props}>
        <Spinner />
      </ShadCNButton>
    );

  return (
    <ShadCNButton disabled={isDisabled} className={cn('cursor-pointer', className)} {...props}>
      {icon}

      {children}
    </ShadCNButton>
  );
};
