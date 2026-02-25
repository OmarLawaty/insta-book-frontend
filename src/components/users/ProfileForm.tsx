'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ErrorResponse, userSchema, UserSchema } from '@/api';
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FileUploader,
} from '@/components';
import { useInvalidateMeQuery, useMeQuery, useUpdateMeMutation, useUploadImageMutation } from '@/hooks';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

const defaultValues: UserSchema = {
  firstName: '',
  lastName: '',
  birthday: '',
  file: new File([], ''), // Placeholder file, will be replaced when user uploads an image
  bio: '',
};

export const ProfileForm = () => {
  const router = useRouter();

  const meQuery = useMeQuery(true);

  const form = useForm<UserSchema>({
    defaultValues: meQuery.data ?? defaultValues,
    mode: 'onChange',
    resolver: zodResolver(userSchema),
  });

  const invalidateMeQuery = useInvalidateMeQuery();
  const uploadImageMutation = useUploadImageMutation();
  const updateMeMutation = useUpdateMeMutation();

  const onSubmit: SubmitHandler<UserSchema> = async data => {
    if (!form.formState.isValid || updateMeMutation.isPending) return;

    let imageId = meQuery.data?.image?.publicId ?? undefined;

    if (data.file) {
      const image = await uploadImageMutation.mutateAsync(data.file);
      imageId = image.publicId;
    }

    updateMeMutation.mutate(
      { ...data, imageId },
      {
        onSuccess: async () => {
          await invalidateMeQuery(true);
          await invalidateMeQuery();
          router.push('/profile');
        },
        onError: (error: AxiosError<ErrorResponse>) => {
          if (error.response?.status === 404)
            form.setError('file', {
              type: 'custom',
              message: error.response?.data.message,
            });
        },
      },
    );
  };

  const isPending = uploadImageMutation.isPending || updateMeMutation.isPending;
  const isDisabled = !form.formState.isValid || isPending || !form.formState.isDirty;

  return (
    <Form {...form}>
      <form className='flex flex-col gap-9 w-full  max-w-5xl' onSubmit={form.handleSubmit(onSubmit, console.warn)}>
        <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>First Name</FormLabel>
                <FormControl>
                  <Input className='shad-input' {...field} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Last Name</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='birthday'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Birthday</FormLabel>
                <FormControl>
                  <Input type='date' className='shad-input' {...field} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='file'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Photo</FormLabel>
                <FormControl>
                  <FileUploader
                    mediaUrl={meQuery.data?.image?.url ?? undefined}
                    {...field}
                    disabled={uploadImageMutation.isPending || updateMeMutation.isPending}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Bio</FormLabel>
                <FormControl>
                  <Input placeholder='Tell us about yourself' type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />
        </div>

        <div className='flex gap-4 items-center justify-end'>
          <Button type='button' className='shad-button_dark_4' onClick={() => router.back()} disabled={isPending}>
            Cancel
          </Button>

          <Button
            type='submit'
            className='shad-button_primary capitalize h-12'
            disabled={isDisabled}
            isLoading={isPending}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
