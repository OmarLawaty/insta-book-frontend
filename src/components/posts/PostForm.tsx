'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ErrorResponse, Post, postSchema, PostSchema } from '@/api';
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
  FileUploader,
} from '@/components';
import { useCreatePostMutation, useUpdatePostMutation, useUploadImageMutation } from '@/hooks';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

type CreatePostFormProps =
  | {
      type: 'create';
    }
  | {
      type: 'update';
      post: Post;
    };

const defaultValues: PostSchema = {
  caption: '',
  tags: '',
  file: new File([], ''), // Placeholder file, will be replaced when user uploads an image
  location: '',
};

export const PostForm = (props: CreatePostFormProps) => {
  const router = useRouter();
  const postData =
    props.type === 'update'
      ? {
          caption: props.post.caption,
          tags: props.post.tags.join(', '),
          file: new File([], ''),
          location: props.post.location,
        }
      : undefined;

  const form = useForm<PostSchema>({
    defaultValues: postData ?? defaultValues,
    mode: 'onChange',
    resolver: zodResolver(postSchema),
  });

  const uploadImageMutation = useUploadImageMutation();
  const createPostMutation = useCreatePostMutation();
  const updatePostMutation = useUpdatePostMutation();

  const onSubmit: SubmitHandler<PostSchema> = async data => {
    if (!form.formState.isValid || createPostMutation.isPending) return;

    const onError = (error: AxiosError<ErrorResponse>) => {
      if (error.response?.status === 404)
        form.setError('file', {
          type: 'custom',
          message: error.response?.data.message,
        });
    };
    const onSuccess = (id: number) => router.push(`/posts/${id}`);
    const tags = data.tags.split(',').map(tag => tag.trim());

    uploadImageMutation.mutate(data.file, {
      onSuccess: res => {
        if (props.type !== 'create') return;

        const params = { ...data, imageId: res.publicId, tags };

        createPostMutation.mutate(params, { onSuccess: ({ id }) => onSuccess(id), onError });
      },
      onSettled: res => {
        if (props.type !== 'update') return;

        const params = { ...data, imageId: res?.publicId ?? props.post.image.publicId, tags };

        updatePostMutation.mutate({ ...params, id: props.post.id }, { onSuccess: ({ id }) => onSuccess(id), onError });
      },
    });
  };

  const isPending = uploadImageMutation.isPending || createPostMutation.isPending || updatePostMutation.isPending;
  const isDisabled = !form.formState.isValid || isPending || (props.type === 'update' && !form.formState.isDirty);
  return (
    <Form {...form}>
      <form className='flex flex-col gap-9 w-full  max-w-5xl' onSubmit={form.handleSubmit(onSubmit, console.warn)}>
        <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='caption'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Caption</FormLabel>
                <FormControl>
                  <Textarea className='shad-textarea custom-scrollbar' {...field} />
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
                <FormLabel className='shad-form_label'>Add Photos</FormLabel>
                <FormControl>
                  <FileUploader
                    mediaUrl={props.type === 'update' ? props.post.image.url : undefined}
                    {...field}
                    disabled={
                      uploadImageMutation.isPending || createPostMutation.isPending || updatePostMutation.isPending
                    }
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Add Location</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Add Tags (separated by comma &quot; , &quot;)</FormLabel>
                <FormControl>
                  <Input placeholder='Art, Expression, Learn' type='text' className='shad-input' {...field} />
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
            {props.type} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};
