'use client';

import { ComponentProps, useEffect, useState } from 'react';

import { useDebounce, useSearchParams } from '@/hooks';
import { Input } from './ui';

interface SearchParamsInputProps extends Omit<ComponentProps<typeof Input>, 'value' | 'onChange'> {
  paramKey: string;
}

export const SearchParamsInput = ({ paramKey, className, ...props }: SearchParamsInputProps) => {
  const searchParams = useSearchParams();
  const param = searchParams.get(paramKey) ?? '';

  const [value, setValue] = useState(param);
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    if (debouncedValue === param) return;

    searchParams.set(paramKey, debouncedValue, 'replace');
  }, [debouncedValue, param, paramKey, searchParams]);

  return <Input {...props} className={className} value={value} onChange={e => setValue(e.target.value)} />;
};
