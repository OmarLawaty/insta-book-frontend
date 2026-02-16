'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { postSchema, PostSchema } from '@/api';
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
import { useCreatePostMutation } from '@/hooks';
import { useRouter } from 'next/navigation';

type CreatePostFormProps =
  | {
      type: 'create';
    }
  | {
      type: 'update';
      post: PostSchema;
    };

const defaultValues: PostSchema = {
  caption: '',
  tags: '',
  imageId: '',
  location: '',
};

export const PostForm = (props: CreatePostFormProps) => {
  const router = useRouter();
  const form = useForm<PostSchema>({
    defaultValues: props.type === 'update' ? props.post : defaultValues,
    mode: 'onChange',
    resolver: zodResolver(postSchema),
  });
  const createPostMutation = useCreatePostMutation();

  const onSubmit: SubmitHandler<PostSchema> = async data => {
    if (!form.formState.isValid || createPostMutation.isPending) return;

    createPostMutation.mutate(data, {
      onSuccess: () => router.push('/'),
      onError: error => {
        if (error.response?.status === 404)
          form.setError('imageId', {
            type: 'custom',
            message: error.response?.data.message,
          });
      },
    });
  };

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
            name='imageId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Add Photos</FormLabel>
                <FormControl>
                  <FileUploader
                    onUploadStart={() => {
                      form.setValue('imageId', '', { shouldDirty: true, shouldValidate: false });
                      form.setError('imageId', { type: 'uploading' });
                    }}
                    onUpload={({ publicId }) => {
                      form.setValue('imageId', publicId, { shouldValidate: true });
                      form.clearErrors('imageId');
                    }}
                    mediaUrl={field.value}
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
          <Button
            type='button'
            className='shad-button_dark_4'
            onClick={() => router.back()}
            disabled={createPostMutation.isPending}
          >
            Cancel
          </Button>

          <Button
            type='submit'
            className='shad-button_primary capitalize h-12'
            disabled={!form.formState.isValid || createPostMutation.isSuccess}
            isLoading={createPostMutation.isPending}
          >
            {props.type} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};
