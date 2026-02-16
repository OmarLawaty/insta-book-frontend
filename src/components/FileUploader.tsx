'use client';

import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import Image from 'next/image';

import { Button, Spinner } from '@/components';
import { UploadFileResponse } from '@/api';
import { convertFileToUrl } from '@/helpers';
import { useUploadImageMutation } from '@/hooks';
import { cn } from '@/lib/utils';

type FileUploaderProps = {
  onUpload: (response: UploadFileResponse) => void;
  onUploadStart?: () => void;
  mediaUrl?: string;
};

export const FileUploader = ({ onUpload, onUploadStart, mediaUrl = '' }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const uploadImageMutation = useUploadImageMutation();
  const isUploading = uploadImageMutation.isPending;

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (isUploading) return;

      const file = acceptedFiles[0];
      if (!file) return;

      onUploadStart?.();
      uploadImageMutation.mutate(file, {
        onSuccess: response => {
          onUpload(response);
          setFileUrl(convertFileToUrl(file));
        },
      });
    },
    [isUploading, onUpload, onUploadStart, uploadImageMutation],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: isUploading,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative flex flex-center flex-col bg-dark-3 rounded-xl',
        isUploading ? 'cursor-wait' : 'cursor-pointer',
      )}
      aria-busy={isUploading}
    >
      <input {...getInputProps()} className='cursor-pointer' disabled={isUploading} />

      {uploadImageMutation.isPending && (
        <div className='absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/60'>
          <Spinner />
        </div>
      )}

      {fileUrl ? (
        <>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
            <Image src={fileUrl} alt='image' className='file_uploader-img' width={500} height={500} />
          </div>
          <p className='file_uploader-label'>Click or drag photo to replace</p>
        </>
      ) : (
        <div className='file_uploader-box '>
          <Image src='/assets/icons/file-upload.svg' width={96} height={77} alt='file upload' />

          <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
          <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>

          <Button type='button' className='shad-button_dark_4' isDisabled={isUploading}>
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};
