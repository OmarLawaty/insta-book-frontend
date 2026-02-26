'use client';

import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import Image from 'next/image';

import { Button } from '@/components';
import { convertFileToUrl } from '@/helpers';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onChange: (response: File) => void;
  mediaUrl?: string;
  disabled?: boolean;
  type?: 'profile' | 'post';
}

export const FileUploader = ({ onChange, mediaUrl = '', disabled = false, type = 'post' }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setFileUrl(convertFileToUrl(file));
      onChange(file);
    },
    [onChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: disabled,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        type === 'post' && 'relative flex flex-center flex-col bg-dark-3 rounded-xl',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
      aria-busy={disabled}
    >
      <input {...getInputProps()} className='cursor-pointer' disabled={disabled} />

      {type === 'post' && <FileUploaderPreview fileUrl={fileUrl} disabled={disabled} />}
      {type === 'profile' && (
        <div className='cursor-pointer flex-center gap-4'>
          <Image
            src={fileUrl || '/assets/icons/profile-placeholder.svg'}
            alt='image'
            className='h-24 w-24 rounded-full object-cover object-top'
            width={96}
            height={96}
            preload
            fetchPriority='high'
            loading='eager'
          />
          <p className='text-primary-500 small-regular md:bbase-semibold'>Change profile photo</p>
        </div>
      )}
    </div>
  );
};

interface FileUploaderPreviewProps {
  fileUrl: string;
  disabled?: boolean;
}

const FileUploaderPreview = ({ fileUrl, disabled }: FileUploaderPreviewProps) =>
  fileUrl ? (
    <>
      <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
        <Image
          src={fileUrl}
          alt='image'
          className='file_uploader-img object-cover object-center'
          width={500}
          height={500}
          preload
          fetchPriority='high'
          loading='eager'
        />
      </div>
      <p className='file_uploader-label'>Click or drag photo to replace</p>
    </>
  ) : (
    <div className='file_uploader-box '>
      <Image src='/assets/icons/file-upload.svg' width={96} height={77} alt='file upload' />

      <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
      <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>

      <Button type='button' className='shad-button_dark_4' disabled={disabled}>
        Select from computer
      </Button>
    </div>
  );
